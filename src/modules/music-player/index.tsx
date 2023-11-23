'use client'

import React, { useState } from "react";
import { musicQueueAtom } from "../music-queue/state";
import { useAtom, useAtomValue } from "jotai";
import { YoutubeStreamInfo, getYoutubeStream } from "./action";
import { YoutubePlayer } from "./youtube.player";
import { youtubePlayerAtom } from "./context";

export default function MusicPlayer() {
    const [musicQueue, setMusicQueue] = useAtom(musicQueueAtom);
    const fistTrack = musicQueue[0];

    const { youtubeVideo, youtubeAudio } = useAtomValue(youtubePlayerAtom);
    const [trackInfo, setTrackInfo] = useState<YoutubeStreamInfo | undefined>(undefined);

    React.useEffect(() => {
        if (fistTrack) {
            if (document.getElementsByTagName("title")?.[0])
                document.getElementsByTagName("title")[0].innerHTML = `PARTY FUN BOX - ${fistTrack.title}`;
            getYoutubeStream(`https://www.youtube.com/watch?v=${fistTrack.id}`).then(JSON.parse).then(setTrackInfo).catch(console.log);
        }
    }, [fistTrack]);

    React.useEffect(() => {
        const streamVideoUrl = trackInfo?.video.url.replace("https://", "/proxy/");
        const streamAudioUrl = trackInfo?.audio.url.replace("https://", "/proxy/");

        if (youtubeVideo && streamVideoUrl && youtubeVideo.src !== streamVideoUrl) {
            youtubeVideo.src = streamVideoUrl;
            youtubeVideo.load();
        }

        if (youtubeAudio && streamAudioUrl && youtubeAudio.src !== streamAudioUrl) {
            youtubeAudio.src = streamAudioUrl;
            youtubeAudio.load();
            youtubeAudio.play().catch(console.log);
        }
    }, [trackInfo?.audio.url, trackInfo?.video.url, youtubeAudio, youtubeVideo]);

    React.useEffect(() => {
        const goNextTrack = () => {
            setMusicQueue((prev) => prev.slice(1));
        }
        youtubeAudio?.addEventListener('ended', goNextTrack)
        return () => {
            youtubeAudio?.removeEventListener('ended', goNextTrack)
        }
    }, [setMusicQueue, youtubeAudio]);

    return React.useMemo(() => <YoutubePlayer />, [])
}