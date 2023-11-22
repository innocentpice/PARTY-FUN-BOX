'use client'

import React, { useState } from "react";
import { musicQueueAtom } from "../music-queue/state";
import { useAtomValue } from "jotai";
import { YoutubeStreamInfo, getYoutubeStream } from "./action";
import { YoutubePlayer } from "./youtube.player";
import { youtubePlayerAtom } from "./context";

export default function MusicPlayer() {
    const musicQueue = useAtomValue(musicQueueAtom);
    const fistTrack = musicQueue[0];
    const { youtubeVideo, youtubeAudio } = useAtomValue(youtubePlayerAtom);
    const [streamVideoUrl, setStreamVideoUrl] = useState<string | undefined>(undefined);
    const [streamAudioUrl, setStreamAudioUrl] = useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (fistTrack)
            getYoutubeStream(`https://www.youtube.com/watch?v=${fistTrack.id}`).then(JSON.parse).then((trackInfo: YoutubeStreamInfo) => {
                setStreamVideoUrl(trackInfo?.video.url.replace("https://", "/proxy/"));
                setStreamAudioUrl(trackInfo?.audio.url.replace("https://", "/proxy/"));
            }).catch(console.log);
    }, [fistTrack]);

    React.useEffect(() => {
        if (youtubeVideo && streamVideoUrl && youtubeVideo.src !== streamVideoUrl) {
            youtubeVideo.src = streamVideoUrl;
            youtubeVideo.load();
        }
    }, [streamVideoUrl, youtubeVideo]);

    React.useEffect(() => {
        if (youtubeAudio && streamAudioUrl && youtubeAudio.src !== streamAudioUrl) {
            youtubeAudio.src = streamAudioUrl;
            youtubeAudio.load();
            youtubeAudio.play();
        }
    }, [streamAudioUrl, youtubeAudio]);

    return React.useMemo(() => <React.Suspense fallback="LOADING...">
        <YoutubePlayer />
    </React.Suspense>, []);
}