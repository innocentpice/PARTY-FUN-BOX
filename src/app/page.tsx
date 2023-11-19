import React from "react";
import MusicPlaylist from "src/modules/music-playlist";
import MusicControl from "src/modules/music-control";
import MusicPlayer from "src/modules/music-player";
import BackgroundMusicColor from "./../modules/background-color-music";
import LogoPartyBox from "../components/logo";
import AppList from "../modules/app-list";

export default function IndexPage() {
    return (
        <BackgroundMusicColor>
            <div className="min-h-screen min-w-full">
                <div className="p-[8px] h-[52px] flex gap-[24px] bg-[#121212] px-[12px] justify-between">
                    <LogoPartyBox width="80" />
                    <input type="text" placeholder="search" className="rounded-full px-[24px] bg-[#242424]" />
                </div>
                <div className="flex flex-row gap-10 w-full p-12">
                    <div className="flex flex-col w-2/3 h-[50vh]">
                        <MusicPlayer />
                    </div>
                    <div className="flex flex-col w-1/3 h-[80vh]">
                        <MusicPlaylist />
                    </div>
                </div>
                <MusicControl />
            </div>
        </BackgroundMusicColor>
    )
}