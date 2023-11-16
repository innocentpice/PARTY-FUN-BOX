import React from "react";
import YoutubePlayer, { YoutubePlayerControl } from "src/modules/youtube-player";

export default function IndexPage() {
    return <div className="min-h-screen min-w-full">
        <YoutubePlayer />
        <YoutubePlayerControl />
    </div>
}