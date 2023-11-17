import React from "react";
import MusicPlaylist from "src/modules/music-playlist";
import MusicControl from "src/modules/music-control";
import MusicPlayer from "src/modules/music-player";

export default function IndexPage() {
    return <div className="min-h-screen min-w-full bg-slate-300">
        <div className="flex flex-row gap-2 w-full">
            <div className="flex flex-col w-2/3">
                <MusicPlayer />
            </div>
            <div className="flex flex-col w-1/3">
                <MusicPlaylist />
            </div>
        </div>
        <MusicControl />
    </div>
}