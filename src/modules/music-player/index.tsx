'use client'

import React from "react";
import { musicQueueAtom } from "../music-queue/state";
import { useAtomValue } from "jotai";
import { getYoutubeStream } from "./action";
import { YoutubePlayer } from "./youtube.player";

export default function MusicPlayer() {
    const musicQueue = useAtomValue(musicQueueAtom);
    const fistTrack = musicQueue[0];

    return React.useMemo(() => <React.Suspense fallback="LOADING...">
        <YoutubePlayer
            trackStreamInfo={
                fistTrack?.id ?
                    getYoutubeStream(`https://www.youtube.com/watch?v=${fistTrack.id}`)
                    : new Promise(resolve => resolve(""))
            }
        />
    </React.Suspense>, [fistTrack.id]);
}