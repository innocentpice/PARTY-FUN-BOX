import React from "react";
import MusicPlaylist from "src/modules/music-playlist";
import YoutubePlayer, { YoutubePlayerControl } from "src/modules/youtube-player";

export default function IndexPage() {
    return <div className="min-h-screen min-w-full bg-slate-300">
        <div className="flex flex-row gap-2">
            <div className="flex flex-col w-2/3">
                <YoutubePlayer />
                <YoutubePlayerControl />
            </div>
            <div className="flex flex-col w-1/3">
                <MusicPlaylist />
            </div>
        </div>
    </div>
}