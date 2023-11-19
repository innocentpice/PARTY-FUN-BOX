'use client'

import React from "react";
import { getPlayList } from "./actions";
import { Video } from "youtube-sr";
import Image from "next/image";

export default function MusicSearch() {

    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [searchResult, setSearchResult] = React.useState<Video[]>([]);

    const searchHandler = React.useCallback(() => {
        getPlayList(searchInputRef.current?.value || "").then(videos => setSearchResult(JSON.parse(videos)));
    }, []);


    return <div className="flex flex-col w-full gap-3 h-full">
        <div className="flex flex-row w-full h-full gap-3">
            <div className="flex w-4/5">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="search"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black"
                    onKeyDown={(event) => {
                        if (event.key === "Enter") searchHandler();
                    }}
                />
            </div>
            <div className="flex w-1/5">
                <button onClick={searchHandler}>SEARCH</button>
            </div>
        </div>

        <div className="flex flex-col h-fit max-h-[50vh] gap-4 overflow-y-auto">
            {searchResult.map((video) => <div key={video.id} className="flex flex-row gap-2">
                <div className="flex relative h-12 w-1/3">
                    {video.thumbnail?.url ? <Image src={video.thumbnail.url} alt="" fill /> : null}
                </div>
                <div className="flex w-full text-xs h-full">
                    <p className="line-clamp-3">
                        {video.title}
                    </p>
                </div>
            </div>
            )}
        </div>
    </div>
}