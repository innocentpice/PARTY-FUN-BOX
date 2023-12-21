'use client';

import React from "react";

import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk"
import { useAtom, useAtomValue } from "jotai";
import { SpotifyPlayerAtom } from "./spotifly-player.context";
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import { musicQueueAtom } from "../legacys/music-queue/state";
import { MediaItem } from "src/app/v3/music-search/actions";
import { realmCollectionsAtom } from "src/app/context/realm.context";

export const spotifyApi = SpotifyApi.withImplicitGrant("2198e2ab4de94511851246906f27cf05", "http://localhost:4200/v3/player", Scopes.all);

export function SpotifyPlayer() {
    const [musicQueue, setMusicQueue] = useAtom(musicQueueAtom);
    const [spotifyPlayer, SetSpotifyPlayerAtom] = useAtom(SpotifyPlayerAtom);
    const realmCollections = useAtomValue(realmCollectionsAtom);

    const track = musicQueue[0]?.source === "SPOTIFLY" ? musicQueue[0] : null;

    React.useEffect(() => {
        if (document.getElementById("spotify-player-script")) return;
        const script = document.createElement("script");
        script.id = "spotify-player-script";
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = async () => {
            await spotifyApi.authenticate();

            const access_token = window.location.hash.replace("#", "").split("&").reduce((prev, curr) => {
                const [key, value] = curr.split("=");

                if (key == "access_token") sessionStorage.setItem("access_token", value);

                return { ...prev, [key]: value }
            }, {})["access_token"] || sessionStorage.getItem("access_token") || (await spotifyApi.getAccessToken())?.access_token;

            const player = new window.Spotify.Player({
                name: 'CX-PARTY-FUNBOX',
                getOAuthToken: cb => { cb(access_token); },
                volume: 0.8,
                enableMediaSession: false
            });

            player.addListener('initialization_error', console.log);
            player.addListener('account_error', console.log);
            player.addListener('authentication_error', () => {
                sessionStorage.removeItem("access_token");
                window.location.replace("/v3");
            });

            player.addListener('ready', async ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                SetSpotifyPlayerAtom({ player, device_id });
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.on('player_state_changed', state => {
                SetSpotifyPlayerAtom(prev => {

                    if (
                        prev?.playerState
                        && state.track_window.previous_tracks.find(x => x.id === state.track_window.current_track.id)
                        && !prev.playerState.paused
                        && state.paused
                    ) {
                        realmCollections.playlist?.deleteOne({
                            source: "SPOTIFLY",
                            id: state.track_window.current_track.id
                        })
                    }

                    return prev === null ? prev : ({ ...prev, playerState: state });
                });
                console.log("player_state_changed", state);
            })

            player.connect();

        };
    }, [SetSpotifyPlayerAtom, realmCollections.playlist]);


    React.useEffect(() => {
        if (!spotifyPlayer) return;
        if (!track) {
            spotifyApi.recommendations.get({
                seed_tracks: ['57NV6TzzYS473R7OgmDepf'],
                limit: 2
            }).then(res => {
                const tracks = res.tracks.map(track => ({
                    ...track,
                    source: 'SPOTIFLY'
                })) as unknown as MediaItem[]
                tracks.map(track => {
                    realmCollections?.playlist?.updateOne({ source: track.source, id: track.id }, { $set: track }, { upsert: true })
                });
            })
            return;
        };

        if (spotifyPlayer.playerState?.track_window?.current_track?.uri !== track.uri)
            spotifyApi.player.startResumePlayback(spotifyPlayer.device_id, undefined, [track.uri]);
    }, [realmCollections?.playlist, setMusicQueue, spotifyPlayer, track]);

    if (!spotifyPlayer) return;

    return <div className="flex flex-col gap-5">
        <p className="flex w-full justify-center">
            {`${spotifyPlayer.playerState?.track_window.current_track.name} - ${spotifyPlayer.playerState?.track_window.current_track.artists[0].name}`}
        </p>
        <div className="w-full text-center">
            {spotifyPlayer.playerState?.paused ?
                <button
                    onClick={() => {
                        spotifyApi.player.startResumePlayback(spotifyPlayer.device_id);
                    }}
                >
                    <PlayCircleIcon fill='white' className='w-8 h-8' />
                </button> :
                <button
                    onClick={() => {
                        spotifyApi.player.pausePlayback(spotifyPlayer.device_id);
                    }}
                >
                    <PauseCircleIcon fill='white' className='w-8 h-8' />
                </button>
            }
        </div>
    </div>
}