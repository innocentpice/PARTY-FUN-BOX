'use client';

import React from "react";
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
    MediaFullscreenButton,
    MediaPipButton
} from 'media-chrome/react';

import { useSetAtom } from "jotai";
import { youtubeAudioPlayerAtom, youtubeVideoPlayerAtom } from "./context";
import useDeviceInfo from "src/hooks/useDeviceInfo";

export function YoutubeAudioPlayer() {
    const audioRef = React.useRef<HTMLElement & { media: HTMLAudioElement; }>(null);
    const setYoutubeAudioPlayer = useSetAtom(youtubeAudioPlayerAtom);
    const { isMobile } = useDeviceInfo();

    React.useEffect(() => {
        setYoutubeAudioPlayer(audioRef.current?.media || null);
        return () => setYoutubeAudioPlayer(null);
    }, [setYoutubeAudioPlayer]);

    return <MediaController audio ref={audioRef}>
        <audio
            slot="media"
            preload="auto"
        />
        <MediaControlBar className="flex w-full h-full">
            <MediaPlayButton />
            <MediaSeekBackwardButton />
            <MediaSeekForwardButton />
            <MediaTimeRange />
            <MediaTimeDisplay showDuration />
            <MediaMuteButton />
            {!isMobile && <MediaVolumeRange />}
        </MediaControlBar>
    </MediaController>
}

export function YoutubeVideoPlayer() {
    const videoRef = React.useRef<HTMLElement & { media: HTMLVideoElement; }>(null);
    const setYoutubeVideoPlayer = useSetAtom(youtubeVideoPlayerAtom);

    React.useEffect(() => {
        setYoutubeVideoPlayer(videoRef.current?.media || null);
        return () => setYoutubeVideoPlayer(null);
    }, [setYoutubeVideoPlayer]);

    return <MediaController ref={videoRef}>
        <div className="absolute top-0 left-0 w-full h-full opacity-0"></div>
        <video
            className="flex w-full h-full rounded-lg"
            slot="media"
            preload="auto"
            playsInline
            muted
        />
    </MediaController>

}
