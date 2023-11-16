'use client';

import React from "react";

export default function YoutubePlayer() {

    const playerElmRef = React.useRef<HTMLDivElement>(null);
    const playerRef = React.useRef<YT.Player>(null);

    React.useImperativeHandle(playerRef, () => {
        return new YT.Player(playerElmRef.current as HTMLDivElement, {
            width: "100%",
            height: "100%",
            videoId: "PCc06UVcflA",
            playerVars: {
                autoplay: 1,
                playsinline: 1,
            },
            events: {
                onApiChange: (...param) => console.log(`onApiChange`, param),
                onError: (...param) => console.log(`onError`, param),
                onPlaybackQualityChange: (...param) => console.log(`onPlaybackQualityChange`, param),
                onPlaybackRateChange: (...param) => console.log(`onPlaybackRateChange`, param),
                onReady: (...param) => console.log(`onReady`, param),
                onStateChange: (...param) => console.log(`onStateChange`, param),
            }
        });
    })

    React.useEffect(() => {
        playerRef.current?.playVideo?.();

        setTimeout(() => {
            playerRef.current?.loadVideoById?.("1wq47tabJh0");

        }, 5000);
    });

    return <>
        <div id="yt-player" className="aspect-video" ref={playerElmRef}></div>
        <button onClick={() => playerRef.current?.playVideo?.()}>Play</button>
        <br />
        <button onClick={() => playerRef.current?.pauseVideo?.()}>Pause</button>
    </>
}