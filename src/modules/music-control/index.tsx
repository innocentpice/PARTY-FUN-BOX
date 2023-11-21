'use client';
import React from "react";
import { YoutubePlayerControlAtom } from "../music-player/youtube-iframe.player.control";
import { useAtom, useAtomValue } from "jotai";
import { musicControlMachineAtom } from "./music-control.state";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, PlayCircleIcon } from "lucide-react";
import { musicQueueAtom } from "../music-queue/state";


export default function MusicControl() {
    const [musicControlState, musicControlDispatch] = useAtom(musicControlMachineAtom);
    const [musicQueue] = useAtom(musicQueueAtom);
    const youtubePlayerControl = useAtomValue(YoutubePlayerControlAtom);

    const youtubePlayerPlayingMediaId = youtubePlayerControl?.getVideoUrl?.();

    React.useEffect(() => {
        const firstQueue = musicQueue[0]


        if (firstQueue?.id && (musicControlState.context.playingMedia?.player !== "YOUTUBE" || musicControlState.context.playingMedia?.videoId !== firstQueue.id)) {
            musicControlDispatch({
                type: "LOAD", "meida": {
                    player: "YOUTUBE",
                    videoId: firstQueue.id
                }
            })
        }
    }, [musicControlDispatch, musicControlState, musicQueue])

    React.useEffect(() => {
        // Sync Playing Media Youtube Player
        if (!musicControlState.context.playingMedia || musicControlState.context.playingMedia.player !== "YOUTUBE" || !youtubePlayerControl) return;

        if (musicControlState.context.playingMedia.videoId != youtubePlayerPlayingMediaId) {
            youtubePlayerControl.loadVideoById?.(musicControlState.context.playingMedia.videoId)
        }

    }, [musicControlState.context.playingMedia, youtubePlayerControl, youtubePlayerPlayingMediaId]);

    return <div className="flex w-full flex-row">
        <div className="flex w-full justify-center items-center"></div>
        <div className="flex w-2/4 gap-2 justify-center items-center">
            <ArrowLeftCircleIcon />
            <button
                onClick={() => {
                    youtubePlayerControl?.playVideo?.();
                }}
            >
                <PlayCircleIcon fill='white' className='w-8 h-8' />
            </button>
            <ArrowRightCircleIcon />
        </div>
        <div className="flex w-full justify-center items-center"></div>
    </div>
}
