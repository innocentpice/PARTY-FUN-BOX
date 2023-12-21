'use client'

import { PlusCircleIcon, SearchIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Combobox } from '@headlessui/react'
import { searchMedias, MediaItem, getSuggestions } from "./actions";
import { useAtomValue, useSetAtom } from "jotai";
import { realmCollectionsAtom } from "../../context/realm.context";
import { musicQueueAtom } from "src/modules/legacys/music-queue/state";

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
            {searchResult.map((track) =>
                track.source === "YOUTUBE" ?
                    <div key={track.id} className="flex flex-col w-full @2xl:w-1/3 @5xl:w-1/4 gap-2 p-5 hover:bg-slate-700/50 rounded-lg group relative">
                        <div className="flex w-full aspect-w-1 aspect-h-1 relative group-hover:blur-[1px]">
                            <Image src={track.thumbnail?.url as string} fill alt="" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-xl" />
                            <YoutubeIcon className="absolute z-auto top-2 left-2 w-4 h-4 opacity-80" fill="red" color="white" />
                        </div>
                        <div className="flex flex-col gap-1 text-sm h-10 group-hover:blur-[1px]">
                            <p className="line-clamp-2">
                                {track.title}
                            </p>
                        </div>
                        <div className="hidden group-hover:flex absolute text-xs items-center w-full h-full top-0 left-0">
                            <button
                                className="flex flex-col m-auto text-white font-semibold hover:underline hover:opacity-90 cursor-pointer items-center gap-2"
                                onClick={() => {
                                    isOfflineMode ?
                                        setMusicQueue(prev => [...prev, track])
                                        : realmCollections?.playlist?.updateOne({ source: track.source, id: track.id }, { $set: track }, { upsert: true })
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
                    </div>
                    :
                    <div key={track.id} className="flex flex-col w-full @2xl:w-1/3 @5xl:w-1/4 gap-2 p-5 hover:bg-slate-700/50 rounded-lg group relative">
                        <div className="flex w-full aspect-w-1 aspect-h-1 relative group-hover:blur-[1px]">
                            <Image src={track.album.images[0].url as string} fill alt="" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-xl" />
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" className="absolute z-auto top-2 left-2 w-4 h-4 opacity-80">
                                <path fill="#8bc34a"
                                    d="M24.001,4c-11.077,0-20,8.923-20,20s8.923,20,20,20c11.076,0,20-8.923,20-20S35.077,4,24.001,4z"></path>
                                <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
                                    strokeMiterlimit="10" strokeWidth="3.7" d="M12.628,18.819c0,0,12.319-3.511,23.489,2.362"></path>
                                <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
                                    strokeMiterlimit="10" strokeWidth="3.3" d="M13.745,24.947c0,0,10.372-3.16,19.915,2.298"></path>
                                <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
                                    strokeMiterlimit="10" strokeWidth="2.5" d="M14.319,30.755c0,0,9.351-2.904,17.562,1.976"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col gap-1 text-sm h-10 group-hover:blur-[1px]">
                            <p className="line-clamp-2">
                                {`${track.name} - ${track.artists[0].name}`}
                            </p>
                        </div>
                        <div className="hidden group-hover:flex absolute text-xs items-center w-full h-full top-0 left-0">
                            <button
                                className="flex flex-col m-auto text-white font-semibold hover:underline hover:opacity-90 cursor-pointer items-center gap-2"
                                onClick={() => {
                                    isOfflineMode ?
                                        setMusicQueue(prev => [...prev, track])
                                        : realmCollections?.playlist?.updateOne({ source: track.source, id: track.id }, { $set: track }, { upsert: true })
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
                    </div>
            )}
        </div>

    </div >
}
