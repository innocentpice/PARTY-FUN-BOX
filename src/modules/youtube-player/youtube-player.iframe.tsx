'use client';

import React from "react";
// import { YoutubePlayerControlAtom, YoutubePlayerRefAtom } from "./youtube-iframe.player.control"
import { YoutubePlayerIframeContext } from "./youtube-player.iframe.context";
import { TPlayerInfo } from "../legacys/music-player/youtube-iframe.player.type";
import { realmCollectionsAtom } from "src/app/context/realm.context";
import { useAtomValue } from "jotai";

export function YoutubePlayerIframe() {

    const { YoutubeIframePlayerRef } = React.useContext(YoutubePlayerIframeContext);
    const realmCollections = useAtomValue(realmCollectionsAtom);

    React.useEffect(() => {
        if (!YoutubeIframePlayerRef) return;
        const youtubePlayer = new YT.Player("yt-player", {
            width: '100%',
            height: '100%',
            // videoId: '1wq47tabJh0',
            playerVars: {
                autoplay: 1,
                playsinline: 1,
                modestbranding: 1,
                origin: '*',
            },
            events: {
                onApiChange: (...param) => console.log(`onApiChange`, param),
                onError: (...param) => console.log(`onError`, param),
                onPlaybackQualityChange: (...param) =>
                    console.log(`onPlaybackQualityChange`, param),
                onPlaybackRateChange: (...param) =>
                    console.log(`onPlaybackRateChange`, param),
                onReady: (...param) => console.log(`onReady`, param),
                onStateChange: (...param) => {
                    const videoId = (param[0].target as YT.Player & { playerInfo: TPlayerInfo })?.playerInfo?.videoData?.video_id;
                    if (param[0].data === YT.PlayerState.ENDED && videoId)
                        realmCollections.playlist?.deleteOne({
                            source: "YOUTUBE",
                            id: videoId
                        })
                    console.log(`onStateChange`, param);
                },
            },
        });
        YoutubeIframePlayerRef.current = youtubePlayer as YT.Player & { playerInfo: TPlayerInfo };
    }, [YoutubeIframePlayerRef, realmCollections.playlist])


    return <div className="flex aspect-w-16 aspect-h-9 w-full">
        <div id="yt-player" className="rounded-2xl" />
    </div>
}
