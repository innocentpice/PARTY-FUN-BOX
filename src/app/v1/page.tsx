import React from "react";
import { YoutubeVideoPlayer } from "src/modules/legacys/music-player/youtube.player";


export default function IndexPage() {
    return <div className="flex w-full aspect-w-16 aspect-h-9">
        <YoutubeVideoPlayer />
    </div>
}