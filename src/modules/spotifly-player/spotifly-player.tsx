'use client';

import React from "react";

import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk"
import { useAtom } from "jotai";
import { SpotifyPlayerAtom } from "./spotifly-player.context";
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import { musicQueueAtom } from "../legacys/music-queue/state";


const spotifyApi = SpotifyApi.withImplicitGrant("2198e2ab4de94511851246906f27cf05", "http://localhost:4200/v3", Scopes.all);

export function SpotifyPlayer() {

    const [musicQueue] = useAtom(musicQueueAtom);
    const [spotifyPlayer, SetSpotifyPlayerAtom] = useAtom(SpotifyPlayerAtom);

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
                volume: 1,
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
                SetSpotifyPlayerAtom(prev => !prev ? prev : ({ ...prev, playerState: state }))
            })

            player.connect();

        };
    }, [SetSpotifyPlayerAtom]);


    React.useEffect(() => {
        if (!spotifyPlayer) return;
        if (!musicQueue[0]?.source || musicQueue[0].source !== "SPOTIFLY") return;

        const track = musicQueue[0];
        spotifyApi.player.startResumePlayback(spotifyPlayer.device_id, undefined, [track.uri]);
    }, [musicQueue, spotifyPlayer]);

    if (!spotifyPlayer) return;

    return <div className="flex flex-col gap-5">
        <p className="flex w-full justify-center">
            {`${spotifyPlayer.playerState?.track_window.current_track.name} - ${spotifyPlayer.playerState?.track_window.current_track.artists[0].name}`}
        </p>
        <div className="w-full text-center">
            {spotifyPlayer.playerState && spotifyPlayer.playerState.paused ?
                <button
                    onClick={() => {
                        spotifyApi.player.pausePlayback(spotifyPlayer.device_id);
                    }}
                >
                    <PauseCircleIcon fill='white' className='w-8 h-8' />
                </button>
                :
                <button
                    onClick={() => {
                        spotifyApi.player.startResumePlayback(spotifyPlayer.device_id);
                    }}
                >
                    <PlayCircleIcon fill='white' className='w-8 h-8' />
                </button>
            }
        </div>
    </div>
}