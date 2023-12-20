'use client';

import { useAtom } from "jotai";
import React from "react";
import { musicQueueAtom } from "src/modules/legacys/music-queue/state";
import { SpotifyPlayer } from "src/modules/spotifly-player";
import { YoutubePlayerIframe, YoutubePlayerIframeControl } from "src/modules/youtube-player";
import { MediaItem } from "./music-search/actions";


export default function IndexPage() {

    const [musicQueue] = useAtom(musicQueueAtom);
    const currentPlayerType: MediaItem["source"] = musicQueue[0].source || "SPOTIFY";

    return React.useMemo(() => <div className="flex flex-col">
        {currentPlayerType === "YOUTUBE" ?
            <>
                <div className="flex w-full aspect-w-16 aspect-h-9">
                    <YoutubePlayerIframe />
                </div>
                <YoutubePlayerIframeControl />
            </>
            :
            <SpotifyPlayer />
        }
    </div>, [currentPlayerType]);
}