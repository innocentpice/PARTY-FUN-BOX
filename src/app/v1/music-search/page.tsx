'use client'

import { PlusCircleIcon, SearchIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Combobox } from '@headlessui/react'
import { searchMedias, MediaItem, getSuggestions } from "./actions";
import { useAtomValue, useSetAtom } from "jotai";
import { musicQueueAtom } from "src/modules/music-queue/state";
import { realmCollectionsAtom } from "../../context/realm.context";

export default function MusicSearchPage() {
    const setMusicQueue = useSetAtom(musicQueueAtom);
    const [searchResult, setSearchResult] = React.useState<MediaItem[]>([]);
    const [searchSuggestions, setSearchSuggestions] = React.useState<string[]>([]);
    const [searchTerms, setSearchTerms] = React.useState<string>("");
    const searchDebounceRef = React.useRef<ReturnType<typeof setTimeout>>();
    const realmCollections = useAtomValue(realmCollectionsAtom);
    const isOfflineMode = false;

    const searchHandler = React.useCallback((searchTermsString: string) => {
        try {
            clearTimeout(searchDebounceRef.current);
        } catch (err) {
            console.log(err)
        }

        if (searchTermsString === "") return;

        searchDebounceRef.current = setTimeout(() => {
            searchMedias(searchTermsString.trim()).then(res => setSearchResult(JSON.parse(res)));
        }, 500);

    }, []);

    return <div className="flex flex-col h-full gap-3">
        <Combobox onChange={(value: string | null) => {
            if (!value) return;
            setSearchTerms(value);
            searchHandler(value);
        }}>
            <div className="flex relative w-full content-center text-center items-center gap-4">
                <SearchIcon className="absolute ml-3 p-1" />
                <Combobox.Input
                    placeholder="ค้นหาเพลง"
                    className="bg-slate-600/20 rounded-full placeholder:text-gray-400/50 text-sm px-10 w-full"
                    value={searchTerms}
                    onChange={(event) => {
                        setSearchTerms(event.target.value);
                        if (event.target.value === "") return;
                        getSuggestions(event.target.value).then(res => JSON.parse(res)).then(setSearchSuggestions).catch(console.error);
                    }}
                    onKeyDown={event => {
                        if (event.key == "Enter") {
                            searchHandler(event.currentTarget.value);
                        }
                    }}
                />
            </div>
            {
                searchSuggestions.length > 0 &&
                <Combobox.Options className="w-full bg-slate-900 py-4 rounded-xl text-sm">
                    <Combobox.Option value={null}></Combobox.Option>
                    {searchSuggestions.map((text) =>
                        <Combobox.Option
                            key={`search_suggestion_${text}`}
                            value={text}
                            className="data-[headlessui-state='active']:bg-slate-800 data-[headlessui-state='active_selected']:bg-slate-800 relative flex flex-row py-2 text-center items-center"
                        >
                            <SearchIcon className="absolute ml-3 p-1" />
                            <div className="flex px-10">
                                {text}
                            </div>
                        </Combobox.Option>)}
                </Combobox.Options>
            }

        </Combobox>

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
                        className="flex flex-col m-auto text-white font-semibold hover:underline hover:opacity-90 cursor-pointer items-center gap-2"
                        onClick={() => {
                            isOfflineMode ?
                                setMusicQueue(prev => [...prev, video])
                                : realmCollections?.playlist?.updateOne({ source: video.source, id: video.id }, { $set: video }, { upsert: true })
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

    </div >
}