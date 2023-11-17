'use client';
import React from "react";
import { YoutubePlayerControlAtom } from "../music-player/youtube.player.control";
import { useAtom, useAtomValue } from "jotai";
import { musicControlMachineAtom } from "./music-control.state";


export default function MusicControl() {
    const [musicControlState, musicControlDispatch] = useAtom(musicControlMachineAtom);
    const youtubePlayerControl = useAtomValue(YoutubePlayerControlAtom);

    const youtubePlayerPlayingMediaId = youtubePlayerControl?.getVideoUrl?.();


    React.useEffect(() => {
        musicControlDispatch({
            type: "LOAD", "meida": {
                player: "YOUTUBE",
                videoId: "QoqCfb4-ANo"
            }
        })
    }, [musicControlDispatch])

    React.useEffect(() => {
        // Sync Playing Media Youtube Player

        if (!musicControlState.context.playingMedia || musicControlState.context.playingMedia.player !== "YOUTUBE" || !youtubePlayerControl) return;

        if (musicControlState.context.playingMedia.videoId != youtubePlayerPlayingMediaId) {
            youtubePlayerControl.loadVideoById?.(musicControlState.context.playingMedia.videoId)
        }

    }, [musicControlState.context.playingMedia, youtubePlayerControl, youtubePlayerPlayingMediaId]);

    return <div className="fixed bottom-0 w-full flex h-fit min-h-[4rem] bg-red-300 justify-center gap-4">
        <button onClick={() => {
            youtubePlayerControl?.playVideo?.();
        }}>PLAY</button>
        <button onClick={() => {
            youtubePlayerControl?.pauseVideo?.();
        }}>PAUSE</button>
    </div>;
}
