'use client'

import { useAtomValue } from "jotai";
import { musicQueueAtom } from "../music-queue/state";
import React from "react";
import { YoutubeStreamInfo, getYoutubeStream } from "./action";
import Sound, { Volume, Stereo } from 'react-hifi';
import Normalizer from "./Normalizer";


export default function AudioPlayer() {
    const musicQueue = useAtomValue(musicQueueAtom);
    const fistTrack = musicQueue[0];

    return null;

    return <React.Suspense fallback="LOADING...">
        {fistTrack?.id && <AudioInfo trackStreamInfo={getYoutubeStream(`https://www.youtube.com/watch?v=${fistTrack.id}`)} />}
    </React.Suspense>


}

function AudioInfo({ trackStreamInfo }: { trackStreamInfo: Promise<string> }) {
    const trackInfo: YoutubeStreamInfo = React.use(trackStreamInfo.then(JSON.parse));
    const streamUrl = trackInfo.url.replace("https://", "/proxy/");
    const playerRef = React.useRef<Sound>(null);

    window.soundTest = playerRef;


    return React.useMemo(() => <Sound
        url={streamUrl}
        ref={playerRef}
    >
        <Normalizer
            url={streamUrl}
            normalize
        />
        <Volume value={50} />
        <Stereo value={0.5} />
    </Sound>, [streamUrl])
}