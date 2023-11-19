import React from "react";
import MusicPlaylist from "src/modules/music-playlist";
import MusicPlayer from "src/modules/music-player";

export default function IndexPage() {
    return (
        <div className="flex flex-row gap-10 w-full p-12">
            <div className="flex flex-col w-2/3 h-[50vh]">
                <MusicPlayer />
            </div>
            <div className="flex flex-col w-1/3 max-h-[80vh] h-fit relative">
                <MusicPlaylist />
            </div>
        </div>
    )
}