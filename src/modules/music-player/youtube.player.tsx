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
    MediaLoadingIndicator
} from 'media-chrome/react';


export function YoutubePlayer({ trackStreamInfo }: { trackStreamInfo: Promise<string>; }) {
    const trackInfo: YoutubeStreamInfo | undefined = React.use(trackStreamInfo.then(JSON.parse).catch(() => { }));
    const streamVideoUrl = trackInfo?.video.url.replace("https://", "/proxy/");
    const streamAudioUrl = trackInfo?.audio.url.replace("https://", "/proxy/");

    const videoRef = React.useRef<HTMLElement & { media: HTMLVideoElement; }>(null);
    const audioRef = React.useRef<HTMLElement & { media: HTMLAudioElement; }>(null);

    React.useEffect(() => {
        audioRef.current?.media.addEventListener('playing', () => {
            if (!videoRef.current || !audioRef.current) return;
            videoRef.current.media.currentTime = audioRef.current.media.currentTime;
            videoRef.current.media.play();
        });

        audioRef.current?.media.addEventListener('pause', () => {
            if (!videoRef.current || !audioRef.current) return;
            videoRef.current.media.pause();
        });
    }, []);

    return (
        <div className="flex flex-row">
            <MediaController ref={videoRef} >
                <video
                    className="flex w-full h-full"
                    slot="media"
                    src={streamVideoUrl || ""}
                    preload="auto" />
            </MediaController>
            <MediaController audio ref={audioRef}>
                <audio
                    className="flex w-full h-full"
                    slot="media"
                    src={streamAudioUrl || ""}
                    preload="auto" />
                <MediaLoadingIndicator />
                <MediaControlBar>
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
