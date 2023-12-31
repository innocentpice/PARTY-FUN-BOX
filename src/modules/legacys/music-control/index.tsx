'use client';

import React from "react";
import { YoutubePlayerControlAtom } from "../music-player/youtube-iframe.player.control";
import { useAtom, useAtomValue } from "jotai";
import { musicControlMachineAtom } from "./music-control.state";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import { musicQueueAtom } from "../music-queue/state";


export default function MusicControl() {
    const [musicControlState, musicControlDispatch] = useAtom(musicControlMachineAtom);
    const [musicQueue] = useAtom(musicQueueAtom);
    const youtubePlayerControl = useAtomValue(YoutubePlayerControlAtom);
    const intervalPlayingIDRef = React.useRef<ReturnType<typeof setInterval>>();
    const isPlaying = musicControlState.matches("playing");

    const [youtubePlayerPlayingMediaId, setYoutubePlayerPlayingMediaId] = React.useState("1wq47tabJh0");

    React.useEffect(() => {
        clearInterval(intervalPlayingIDRef.current);

        intervalPlayingIDRef.current = setInterval(() => {
            const currentPlayingMediaId = youtubePlayerControl?.playerInfo?.videoData?.video_id || "";

            if (!currentPlayingMediaId) return;

            setYoutubePlayerPlayingMediaId(prev => {
                if (prev === currentPlayingMediaId || currentPlayingMediaId === "") return prev;
                return currentPlayingMediaId;
            });

            if (!musicControlState.context.playingMedia || musicControlState.context.playingMedia.player !== "YOUTUBE" || !youtubePlayerControl) return;

            if (musicControlState.context.playingMedia.videoId !== youtubePlayerPlayingMediaId) {
                console.log("Sync Playing", musicControlState.context.playingMedia.videoId, youtubePlayerPlayingMediaId);
                youtubePlayerControl.loadVideoById?.(musicControlState.context.playingMedia.videoId)
            }

        }, 1)

        return () => {
            clearInterval(intervalPlayingIDRef.current)
        }
    }, [musicControlState.context.playingMedia, youtubePlayerControl, youtubePlayerPlayingMediaId]);

    React.useEffect(() => {
        const firstQueue = musicQueue[0];
        if (firstQueue?.id && (musicControlState.context.playingMedia?.player !== "YOUTUBE" || musicControlState.context.playingMedia?.videoId !== firstQueue.id)) {
            musicControlDispatch({
                type: "LOAD", "meida": {
                    player: "YOUTUBE",
                    videoId: firstQueue.id
                }
            })
        }
    }, [musicControlDispatch, musicControlState, musicQueue, youtubePlayerControl])

    return <div className="flex w-full flex-row">
        <div className="flex w-full justify-center items-center">
            {musicQueue[0]?.source === "YOUTUBE" && musicQueue[0]?.title || null}
        </div>
        <div className="flex w-2/4 gap-2 justify-center items-center">
            <ArrowLeftCircleIcon />
            {isPlaying ?
                <button
                    onClick={() => {
                        youtubePlayerControl?.pauseVideo?.();
                        musicControlDispatch("PAUSE");
                    }}
                >
                    <PauseCircleIcon fill='white' className='w-8 h-8' />
                </button> :
                <button
                    onClick={() => {
                        youtubePlayerControl?.playVideo?.();
                        musicControlDispatch("PLAY");
                    }}
                >
                    <PlayCircleIcon fill='white' className='w-8 h-8' />
                </button>
            }
            <ArrowRightCircleIcon />
        </div>
        <div className="flex w-full justify-center items-center"></div>
    </div>
}
