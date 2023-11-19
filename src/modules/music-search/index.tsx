'use client'

import React from "react";
import { getPlayList } from "./actions";
import { Video } from "youtube-sr";
import Image from "next/image";

export default function MusicSearch() {

    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const [searchResult, setSearchResult] = React.useState<Video[]>([]);

    React.useEffect(() => {

    }, []);

    const searchHandler = React.useCallback(() => {
        getPlayList(searchInputRef.current?.value || "").then(videos => setSearchResult(JSON.parse(videos)));
    }, []);


    return <div className="flex flex-col w-full gap-3 h-full">
        <div className="flex flex-row w-full gap-3">
            <div className="flex w-4/5">
                <input ref={searchInputRef} type="text" placeholder="search" onKeyDown={(event) => {
                    if (event.key === "Enter") searchHandler();
                }} className="rounded-full px-4 py-3 w-full" />
            </div>
            <div className="flex w-1/5">
                <button onClick={searchHandler}>SEARCH</button>
            </div>
        </div>

        <div className="flex flex-col h-full overflow-y-auto gap-3">
            {searchResult.map((video) => <div key={video.id} className="flex flex-row h-12 gap-2">
                <div className="flex relative h-full aspect-16 w-1/3">
                    {video.thumbnail?.url ? <Image src={video.thumbnail.url} alt="" fill /> : null}
                </div>
                <div className="flex w-full text-xs">
                    <p className="">
                        {video.title}
                    </p>
                </div>
            </div>
            )}
        </div>
    </div>
}