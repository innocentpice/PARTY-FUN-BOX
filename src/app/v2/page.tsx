'use client';

import React from "react";
import MusicControl from "src/modules/legacys/music-control";
import YoutubePlayerIframe from "src/modules/legacys/music-player/youtube-iframe.player";



export default function IndexPage() {
    return <div className="flex flex-col">
        <div className="flex w-full aspect-w-16 aspect-h-9">
            <YoutubePlayerIframe />
        </div>
        <div className="flex relative">
            <React.Suspense fallback=".. LOADING ..">
                <MusicControl />
            </React.Suspense>
        </div>
    </div>

}