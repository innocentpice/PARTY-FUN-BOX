'use client';
import React from "react";
import { YoutubeStreamInfo } from "./action";
import {
    MediaController,
    MediaControlBar,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaVolumeRange,
    MediaPlayButton,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
} from 'media-chrome/react';
import { musicQueueAtom } from "../music-queue/state";
import { useSetAtom } from "jotai";


export function YoutubePlayer({ trackStreamInfo }: { trackStreamInfo: Promise<string>; }) {
    const trackInfo: YoutubeStreamInfo | undefined = React.use(trackStreamInfo.then(JSON.parse).catch(() => { }));
    const streamVideoUrl = trackInfo?.video.url.replace("https://", "/proxy/");
    const streamAudioUrl = trackInfo?.audio.url.replace("https://", "/proxy/");

    const videoRef = React.useRef<HTMLElement & { media: HTMLVideoElement; }>(null);
    const audioRef = React.useRef<HTMLElement & { media: HTMLAudioElement; }>(null);

    const setMusicQueue = useSetAtom(musicQueueAtom);


    React.useEffect(() => {

        const videoMedia = videoRef.current?.media;
        const audioMedia = audioRef.current?.media;

        if (!videoMedia || !audioMedia) return;

        const playingListener = () => {
            videoMedia.currentTime = audioMedia.currentTime;
            videoMedia.play();
        }
        audioMedia.addEventListener('playing', playingListener);

        const endedListener = () => {
            setMusicQueue(prev => prev.filter((_, idx) => idx != 0));
        }
        audioMedia.addEventListener('ended', endedListener);


        const pauseListener = () => {
            videoMedia.pause();
        }
        audioMedia.addEventListener('pause', pauseListener);

        return () => {
            audioMedia.addEventListener('playing', playingListener);
            audioMedia.addEventListener('ended', endedListener);
            audioMedia.addEventListener('pause', pauseListener);
        }


    }, [setMusicQueue]);

    React.useEffect(() => {
        const audioMedia = audioRef.current?.media;
        if (!audioMedia) return;

        audioMedia.play();
    }, [streamAudioUrl]);

    return (
        <div className="flex flex-row items-center gap-5 relative">
            {/* <MediaController ref={videoRef} className="h-20 absolute top-[calc(theme(spacing.20)*-1)]"> */}
            <MediaController ref={videoRef}>
                <div className="absolute top-0 left-0 w-full h-full opacity-0"></div>
                <video
                    className="flex w-full h-full max-h-20 rounded-lg"
                    slot="media"
                    src={streamVideoUrl || ""}
                    preload="auto"
                    playsInline
                    muted
                />
            </MediaController>
            <MediaController audio ref={audioRef}>
                <audio
                    slot="media"
                    src={streamAudioUrl || ""}
                    preload="auto"
                />
                <MediaControlBar className="flex w-full h-full">
                    <MediaPlayButton></MediaPlayButton>
                    <MediaSeekBackwardButton></MediaSeekBackwardButton>
                    <MediaSeekForwardButton></MediaSeekForwardButton>
                    <MediaTimeRange></MediaTimeRange>
                    <MediaTimeDisplay showDuration></MediaTimeDisplay>
                    <MediaMuteButton></MediaMuteButton>
                    <MediaVolumeRange></MediaVolumeRange>
                </MediaControlBar>
            </MediaController>

        </div>
    );
}
