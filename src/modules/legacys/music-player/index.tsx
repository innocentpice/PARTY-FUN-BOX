'use client'

import React, { useState } from "react";
import { forcePlayAtom, musicQueueAtom } from "../music-queue/state";
import { useAtom, useAtomValue } from "jotai";
import { YoutubeStreamInfo, getYoutubeStream } from "./action";
import { YoutubeAudioPlayer } from "./youtube.player";
import { youtubePlayerAtom } from "./context";
import { realmCollectionsAtom } from "src/app/context/realm.context";
import useDeviceInfo from "src/hooks/useDeviceInfo";


export default function MusicPlayer() {
    const [forcePlay, setForcePlay] = useAtom(forcePlayAtom);
    const [musicQueue, setMusicQueue] = useAtom(musicQueueAtom);

    const playingTrack = musicQueue.find(({ id }) => id == forcePlay) || (musicQueue?.[0] ? musicQueue[0] : undefined);
    const realmCollections = useAtomValue(realmCollectionsAtom);
    const { isMobile } = useDeviceInfo();

    const { youtubeVideo, youtubeAudio } = useAtomValue(youtubePlayerAtom);
    const [trackInfo, setTrackInfo] = useState<YoutubeStreamInfo & { id: string } | undefined>(undefined);

    const mobileOnlyTrackUrl = (trackInfo?.trackInfo?.player_response?.streamingData?.formats?.[0] as { url: string } | undefined)?.url;
    const streamVideoUrl = isMobile ? mobileOnlyTrackUrl : trackInfo?.video.url;
    const streamAudioUrl = isMobile ? mobileOnlyTrackUrl : trackInfo?.audio.url;
    const audioDuration = trackInfo?.audio.approxDurationMs ? Number.parseFloat(trackInfo?.audio.approxDurationMs) / 1000 + 2 : null;

    React.useEffect(() => {
        if (!("MediaMetadata" in window) || !('mediaSession' in navigator) || playingTrack?.source !== "YOUTUBE") return;

        navigator.mediaSession.metadata = new MediaMetadata({
            title: playingTrack?.title || "",
            album: "",
            artist: playingTrack?.channel?.name || "",
            artwork: [{
                src: playingTrack?.thumbnail?.url || "",
            }]
        });
    }, [playingTrack]);

    React.useEffect(() => {
        if (playingTrack && playingTrack.source === "YOUTUBE") {
            if (document.getElementsByTagName("title")?.[0])
                document.getElementsByTagName("title")[0].innerHTML = `PARTY FUN BOX - ${playingTrack.title}`;
            getYoutubeStream(`https://www.youtube.com/watch?v=${playingTrack.id}`).then(JSON.parse).then(track => setTrackInfo({ ...track, id: playingTrack.id })).catch(console.log);
        }
    }, [playingTrack]);

    React.useEffect(() => {
        if (youtubeVideo && streamVideoUrl && trackInfo?.id && youtubeVideo.dataset['trackId'] !== trackInfo.id) {
            youtubeVideo.src = streamVideoUrl;
            youtubeVideo.dataset['trackId'] = trackInfo.id;
            youtubeVideo.load();
            youtubeVideo.play().catch(console.log);
        }

        if (youtubeAudio && streamAudioUrl && trackInfo?.id && youtubeAudio.dataset['trackId'] !== trackInfo.id) {
            youtubeAudio.src = streamAudioUrl;
            youtubeAudio.dataset['trackId'] = trackInfo.id;
            youtubeAudio.load();
            youtubeAudio.play().catch(console.log);
        }
    }, [streamAudioUrl, streamVideoUrl, trackInfo?.id, youtubeAudio, youtubeVideo]);

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
            setMusicQueue((prev) => prev.filter(track => track.id !== playingTrack?.id));
            if (playingTrack) realmCollections.playlist?.deleteOne({
                source: playingTrack.source,
                id: playingTrack.id
            })

            if (playingTrack?.id === forcePlay) setForcePlay(null);
        }
        youtubeAudio?.addEventListener('ended', goNextTrack)
        return () => {
            youtubeAudio?.removeEventListener('ended', goNextTrack)
        }
    }, [forcePlay, playingTrack, realmCollections.playlist, setForcePlay, setMusicQueue, youtubeAudio]);

    return React.useMemo(() => <YoutubeAudioPlayer />, [])
}