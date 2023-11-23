'use client'

import React, { useState } from "react";
import { musicQueueAtom } from "../music-queue/state";
import { useAtom, useAtomValue } from "jotai";
import { YoutubeStreamInfo, getYoutubeStream } from "./action";
import { YoutubePlayer } from "./youtube.player";
import { youtubePlayerAtom } from "./context";

export default function MusicPlayer() {
    const [musicQueue, setMusicQueue] = useAtom(musicQueueAtom);
    const fistTrack = musicQueue?.[0] ? musicQueue[0] : undefined;

    const { youtubeVideo, youtubeAudio } = useAtomValue(youtubePlayerAtom);
    const [trackInfo, setTrackInfo] = useState<YoutubeStreamInfo | undefined>(undefined);

    const streamVideoUrl = trackInfo?.video.url;
    const streamAudioUrl = trackInfo?.audio.url;
    const audioDuration = trackInfo?.audio.approxDurationMs ? Number.parseFloat(trackInfo?.audio.approxDurationMs) / 1000 + 2 : null;

    React.useEffect(() => {
        if (!("MediaMetadata" in window) || !('mediaSession' in navigator)) return;

        navigator.mediaSession.metadata = new MediaMetadata({
            title: fistTrack?.title || "",
            album: "",
            artist: fistTrack?.channel?.name || "",
            artwork: [{
                src: fistTrack?.thumbnail?.url || "",
            }]
        });
    }, [fistTrack?.channel?.name, fistTrack?.thumbnail?.url, fistTrack?.title]);

    React.useEffect(() => {
        if (fistTrack) {
            if (document.getElementsByTagName("title")?.[0])
                document.getElementsByTagName("title")[0].innerHTML = `PARTY FUN BOX - ${fistTrack.title}`;
            getYoutubeStream(`https://www.youtube.com/watch?v=${fistTrack.id}`).then(JSON.parse).then(setTrackInfo).catch(console.log);
        }
    }, [fistTrack]);

    React.useEffect(() => {
        if (youtubeVideo && streamVideoUrl && youtubeVideo.src !== streamVideoUrl) {
            youtubeVideo.src = streamVideoUrl;
            youtubeVideo.load();
        }

        if (youtubeAudio && streamAudioUrl && youtubeAudio.src !== streamAudioUrl) {
            youtubeAudio.src = streamAudioUrl;
            youtubeAudio.load();
            youtubeAudio.play().catch(console.log);
        }
    }, [streamAudioUrl, streamVideoUrl, youtubeAudio, youtubeVideo]);

    React.useEffect(() => {
        const goNextTrack = () => {
            if (!youtubeAudio || !audioDuration) return;
            if (youtubeAudio.currentTime > audioDuration && streamAudioUrl && youtubeAudio.src.endsWith(streamAudioUrl)) youtubeAudio.currentTime = youtubeAudio.duration;
        }
        youtubeAudio?.addEventListener('timeupdate', goNextTrack)
        return () => {
            youtubeAudio?.removeEventListener('timeupdate', goNextTrack)
        }
    }, [audioDuration, setMusicQueue, streamAudioUrl, youtubeAudio]);

    React.useEffect(() => {
        const goNextTrack = () => {
            if (youtubeAudio)
                youtubeAudio.currentTime = 0;
            setMusicQueue((prev) => prev.filter(track => track.id !== fistTrack?.id));
        }
        youtubeAudio?.addEventListener('ended', goNextTrack)
        return () => {
            youtubeAudio?.removeEventListener('ended', goNextTrack)
        }
    }, [fistTrack?.id, setMusicQueue, youtubeAudio]);

    return React.useMemo(() => <YoutubePlayer />, [])
}