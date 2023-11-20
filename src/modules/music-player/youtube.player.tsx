'use client';

import React from "react";
import { YoutubePlayerControlAtom } from "./youtube.player.control"
import { useSetAtom } from "jotai";

export default function YoutubePlayer() {
    const playerElmRef = React.useRef<HTMLDivElement>(null);
    const setYoutubePlayerControlAtom = useSetAtom(YoutubePlayerControlAtom);

    React.useEffect(() => {

        const youtubePlayer = new YT.Player(playerElmRef.current as HTMLDivElement, {
            width: "100%",
            height: "100%",
            videoId: "1wq47tabJh0",
            playerVars: {
                autoplay: 1,
                playsinline: 1,
                modestbranding: 1
            },
            events: {
                onApiChange: (...param) => console.log(`onApiChange`, param),
                onError: (...param) => console.log(`onError`, param),
                onPlaybackQualityChange: (...param) => console.log(`onPlaybackQualityChange`, param),
                onPlaybackRateChange: (...param) => console.log(`onPlaybackRateChange`, param),
                onReady: (...param) => () => {
                    console.log(`onReady`, param)
                },
                onStateChange: ({ data }) => {
                    if (data === YT.PlayerState.UNSTARTED) {
                        setYoutubePlayerControlAtom(youtubePlayer);
                    }
                },
            },
        });

        return () => {
            youtubePlayer.destroy?.();
            setYoutubePlayerControlAtom(undefined);
        }

    }, [setYoutubePlayerControlAtom]);

    return <div className="flex h-full">
        <div id="yt-player" className="rounded-2xl" ref={playerElmRef} />
    </div>
}
