'use client';
import React from "react";
import { YoutubePlayerControlAtom } from "../music-player/youtube.player.control";
import { useAtomValue } from "jotai";


export default function MusicControl() {
    const youtubePlayerControl = useAtomValue(YoutubePlayerControlAtom);

    if (!youtubePlayerControl) return null;

    return <div className="fixed bottom-0 w-full flex h-fit min-h-[4rem] bg-red-300 justify-center gap-4">
        <button onClick={() => {
            youtubePlayerControl.loadVideoById("QoqCfb4-ANo");
            youtubePlayerControl.playVideo();
        }}>PLAY</button>
        <button onClick={() => {
            youtubePlayerControl.pauseVideo();
        }}>PAUSE</button>
    </div>;
}
