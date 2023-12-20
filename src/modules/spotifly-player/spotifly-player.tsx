'use client';

import React, { useState } from "react";

import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk"



export function SpotifyPlayer() {

    const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);

    React.useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = async () => {
            // const spotifyApi = SpotifyApi.withClientCredentials("2198e2ab4de94511851246906f27cf05", "e9e531494e2d48708c84bd02fdd67037", Scopes.all);

            const spotifyApi = SpotifyApi.withImplicitGrant("2198e2ab4de94511851246906f27cf05", "http://localhost:4200/v3", Scopes.all);

            spotifyApi.getAccessToken();

            const access_token = window.location.hash.replace("#", "").split("&").reduce((prev, curr) => {
                const [key, value] = curr.split("=");

                if (key == "access_token") sessionStorage.setItem("access_token", value);

                return { ...prev, [key]: value }
            }, {})["access_token"] || sessionStorage.getItem("access_token");

            console.log(access_token);

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(access_token); },
                volume: 0.5
            });




            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });


            player.connect();
            // player.activateElement();
            // player.togglePlay();

            spotifyApi.search("The Beatles", ["artist"]).then(console.log);
        };
    }, []);



    return <></>
}