'use client'

import React from 'react';
import { ListMusicIcon, YoutubeIcon } from "lucide-react";
import { useAtom } from 'jotai';
import { musicQueueAtom } from './state';
import Image from 'next/image';

export default function MusicQueue() {
  const [musicQueue, setMusicQueue] = useAtom(musicQueueAtom);

  return <div className="flex flex-col gap-3 bg-slate-600/20 h-full rounded-xl p-3 pb-20">
    <div className="flex p-2">
      <div className="flex w-full @md:w-1/5 justify-center">
        <ListMusicIcon />
      </div>
      <div className="hidden @md:flex">
        คิวเพลง
      </div>
    </div>
    <hr />
    <div className="flex flex-col">
      {musicQueue.map((video) => <div key={video.id} className="flex gap-2 hover:bg-slate-700/10 rounded-md p-2 cursor-pointer" onClick={() => {
        video.id && setMusicQueue((prev) => {
          const result = prev.filter(({ id }) => id != video.id);
          const targetTrack = prev.find(({ id }) => id == video.id);
          if (targetTrack) result.unshift(targetTrack);

          return result;
        })
      }}>
        <div className="flex w-full @md:w-1/5">
          <div className="flex w-full aspect-w-1 aspect-h-1 relative">
            <Image src={video.thumbnail?.url as string} fill alt="" className="rounded-md" />
            <YoutubeIcon className="absolute z-auto top-2 left-2 w-4 h-4" fill="red" color="white" />
          </div>
        </div>
        <div className="hidden @md:flex w-full h-[theme(spacing.6)] self-center">
          <p className='line-clamp-1'>
            {video.title}
          </p>
        </div>
      </div>)}
    </div>
  </div>;
}
