'use client'

import { PlusCircleIcon, SearchIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Video } from "youtube-sr";
import { searchMedias } from "./actions";
import { useSetAtom } from "jotai";
import { musicControlMachineAtom } from "src/modules/music-control/music-control.state";


declare global {
    interface Window {
        searchDebounce?: NodeJS.Timeout
    }
}

export default function MusicSearchPage() {

    const musicControlDispatch = useSetAtom(musicControlMachineAtom);
    const [searchResult, setSearchResult] = React.useState<Video[]>([]);

    return <div className="flex flex-col h-full gap-3">
        <div className="flex relative w-full content-center text-center items-center gap-4">
            <SearchIcon className="absolute ml-3 p-1" />
            <input type="text" placeholder="ค้นหาเพลง" className="bg-slate-600/20 rounded-full placeholder:text-gray-400/50 text-sm px-10 w-full" onChange={(event) => {
                try {
                    clearTimeout(window.searchDebounce)
                } catch (err) {
                    console.log(err)
                }

                window.searchDebounce = setTimeout(() => {
                    if (!event.target.value || event.target.value === "") return;
                    searchMedias(event.target.value).then(res => setSearchResult(JSON.parse(res)))
                }, 500);
            }} />
        </div>

        <div className="flex flex-wrap overflow-y-scroll">
            {searchResult.map((video) => <div key={video.id} className="flex flex-col w-1/2 @2xl:w-1/3 @5xl:w-1/4 gap-2 p-5 hover:bg-slate-700/50 rounded-lg">
                <div className="flex w-full aspect-w-1 aspect-h-1 relative">
                    <Image src={video.thumbnail?.url as string} fill alt="" className="rounded-xl" />
                    <YoutubeIcon className="absolute z-auto top-2 left-2 w-4 h-4" fill="red" color="white" />
                </div>
                <div className="flex flex-col gap-1 text-sm h-10">
                    <p className="line-clamp-2">
                        {video.title}
                    </p>
                </div>
                <div className="flex text-xs items-center hover:underline hover:text-white cursor-pointer">
                    <button
                        onClick={() => {
                            console.log(video);
                            if (video.id) musicControlDispatch({
                                type: "LOAD", "meida": {
                                    player: "YOUTUBE",
                                    videoId: video.id
                                }
                            })
                        }}
                    >
                        <PlusCircleIcon className="p-1" /> Add Queue
                    </button>
                </div>
            </div>)}
        </div>

    </div>
}