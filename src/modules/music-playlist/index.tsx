"use client"

import Image from "next/image";
import React from "react";
import MusicSearch from "../music-search";

export function MusicPlaylist() {
    return <>
        <div className="flex">
            <Image className="mr-6" src="https://placekitten.com/g/200/200" height="200" width="200" alt="" />
            <div className="flex flex-col justify-center">

                <h4 className="mt-0 mb-2 uppercase text-gray-500 tracking-widest text-xs">Playlist</h4>
                <h1 className="mt-0 mb-2 text-white text-4xl">Spotify Album Page with Tailwind CSS</h1>

                <p className="text-gray-600 mb-2 text-sm">With J. Cole, Quavo, Ty Dollar $ign</p>
                <p className="text-gray-600 text-sm">Created by <a>Spotify</a> - 50 songs, 3 hr 2 min</p>
            </div>
        </div>

        <div className="mt-10">
            <div className="flex text-gray-600">
                <div className="p-2 w-8 flex-shrink-0"></div>
                <div className="p-2 w-8 flex-shrink-0"></div>
                <div className="p-2 w-full">Title</div>
                <div className="p-2 w-full">Artist</div>
                <div className="p-2 w-full">Album</div>
                <div className="p-2 w-12 flex-shrink-0 text-right">#</div>
            </div>
            <div className="flex border-b border-gray-800 hover:bg-gray-800">
                <div className="p-3 w-8 flex-shrink-0">▶️</div>
                <div className="p-3 w-8 flex-shrink-0">❤️</div>
                <div className="p-3 w-full">My Song Here</div>
                <div className="p-3 w-full">Eminem</div>
                <div className="p-3 w-full">Spotify</div>
                <div className="p-3 w-12 flex-shrink-0 text-right">5:35</div>
            </div>
            <div className="flex border-b border-gray-800 hover:bg-gray-800">
                <div className="p-3 w-8 flex-shrink-0">▶️</div>
                <div className="p-3 w-8 flex-shrink-0">❤️</div>
                <div className="p-3 w-full">My Song Here</div>
                <div className="p-3 w-full">Eminem</div>
                <div className="p-3 w-full">Spotify</div>
                <div className="p-3 w-12 flex-shrink-0 text-right">5:35</div>
            </div>
            <div className="flex border-b border-gray-800 hover:bg-gray-800">
                <div className="p-3 w-8 flex-shrink-0">▶️</div>
                <div className="p-3 w-8 flex-shrink-0">❤️</div>
                <div className="p-3 w-full">My Song Here</div>
                <div className="p-3 w-full">Eminem</div>
                <div className="p-3 w-full">Spotify</div>
                <div className="p-3 w-12 flex-shrink-0 text-right">5:35</div>
            </div>
            <div className="flex border-b border-gray-800 hover:bg-gray-800">
                <div className="p-3 w-8 flex-shrink-0">▶️</div>
                <div className="p-3 w-8 flex-shrink-0">❤️</div>
                <div className="p-3 w-full">My Song Here</div>
                <div className="p-3 w-full">Eminem</div>
                <div className="p-3 w-full">Spotify</div>
                <div className="p-3 w-12 flex-shrink-0 text-right">5:35</div>
            </div>
            <div className="flex border-b border-gray-800 hover:bg-gray-800">
                <div className="p-3 w-8 flex-shrink-0">▶️</div>
                <div className="p-3 w-8 flex-shrink-0">❤️</div>
                <div className="p-3 w-full">My Song Here</div>
                <div className="p-3 w-full">Eminem</div>
                <div className="p-3 w-full">Spotify</div>
                <div className="p-3 w-12 flex-shrink-0 text-right">5:35</div>
            </div>
        </div>
    </>
}


export default function MusicPlaylistWarpper() {
    const [viewMode, setViewMode] = React.useState<"PLAYLIST" | "SEARCH">("SEARCH");

    return <div className="flex flex-col bg-black text-gray-300 p-10 rounded-3xl border-red-100 border h-full">
        <div className="flex mb-10 border-b-2 pb-2">
            <button onClick={() => {
                setViewMode(prev => prev === "PLAYLIST" ? "SEARCH" : "PLAYLIST")
            }}>TOGGLE SEARCH</button>
        </div>
        <div className="flex h-full">
            {
                viewMode === "PLAYLIST" ?
                    <MusicPlaylist />
                    :
                    <MusicSearch />
            }
        </div>
    </div>
}