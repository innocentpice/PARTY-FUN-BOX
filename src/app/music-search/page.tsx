'use client'

import { PlusCircleIcon, SearchIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { searchMedias, MediaItem } from "./actions";
import { useSetAtom } from "jotai";
import { musicQueueAtom } from "src/modules/music-queue/state";


declare global {
    interface Window {
        searchDebounce?: NodeJS.Timeout
    }
}

export default function MusicSearchPage() {
    const setMusicQueue = useSetAtom(musicQueueAtom);
    const [searchResult, setSearchResult] = React.useState<MediaItem[]>([]);

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
            {searchResult.map((video) => <div key={video.id} className="flex flex-col w-1/2 @2xl:w-1/3 @5xl:w-1/4 gap-2 p-5 hover:bg-slate-700/50 rounded-lg group relative">
                <div className="flex w-full aspect-w-1 aspect-h-1 relative group-hover:blur-[1px]">
                    <Image src={video.thumbnail?.url as string} fill alt="" className="rounded-xl" />
                    {video.source === "YOUTUBE" && <YoutubeIcon className="absolute z-auto top-2 left-2 w-4 h-4 opacity-80" fill="red" color="white" />}
                </div>
                <div className="flex flex-col gap-1 text-sm h-10 group-hover:blur-[1px]">
                    <p className="line-clamp-2">
                        {video.title}
                    </p>
                </div>
                <div className="hidden group-hover:flex absolute text-xs items-center w-full h-full top-0 left-0">
                    <button
                        className="flex flex-col m-auto text-white font-semibold hover:underline hover:text-white hover:opacity-90 cursor-pointer items-center gap-2"
                        onClick={() => {
                            setMusicQueue(prev => [...prev, video]);
                        }}
                    >
                        <div className="flex w-10 h-10">
                            <PlusCircleIcon width="100%" height="100%" />
                        </div>
                        <div className="flex">
                            ADD TO QUEUE
                        </div>
                    </button>
                </div>
            </div>)}
        </div>

    </div>
}