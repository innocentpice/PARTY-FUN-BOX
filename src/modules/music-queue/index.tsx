'use client'

import React from 'react';
import { ListMusicIcon, YoutubeIcon } from "lucide-react";
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { forcePlayAtom, musicQueueAtom } from './state';
import Image from 'next/image';
import { useWatch } from 'src/hooks/useWatchRealmCollection';
import { realmCollectionsAtom } from 'src/app/context/realm.context';

export default function MusicQueue() {
  const setForcePlay = useSetAtom(forcePlayAtom);
  const [musicQueue, setMusicQueue] = useAtom(musicQueueAtom);

  const realmCollections = useAtomValue(realmCollectionsAtom);
  useWatch(realmCollections.playlist, {
    onUpdate(change) {
      realmCollections.playlist?.find().then(setMusicQueue);
    },
    onInsert(change) {
      realmCollections.playlist?.find().then(setMusicQueue);
    },
    onReplace(change) {
      realmCollections.playlist?.find().then(setMusicQueue);
    },
    onDelete(change) {
      realmCollections.playlist?.find().then(setMusicQueue);
    },
  })

  React.useEffect(() => {
    realmCollections.playlist?.find().then(setMusicQueue);
  }, [realmCollections.playlist, setMusicQueue]);


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
    <div className="flex flex-col w-full">
      {musicQueue.map((video, idx) => (
        <div
          key={`${idx}_${video.id}`}
          className="flex gap-2 hover:bg-slate-700/10 rounded-md p-2 cursor-pointer group relative w-full"
        >
          <div className="flex w-full @md:w-1/5 group-hover:blur-sm">
            <div className="flex w-full aspect-w-1 aspect-h-1 relative">
              <Image src={video.thumbnail?.url as string} fill alt="" className="rounded-md" />
              <YoutubeIcon className="absolute z-auto top-2 left-2 w-4 h-4" fill="red" color="white" />
            </div>
          </div>
          <div className="hidden @md:flex w-full h-[theme(spacing.6)] self-center group-hover:blur-sm">
            <p className='line-clamp-1'>
              {video.title}
            </p>
          </div>
          <div className="hidden group-hover:flex flex-col @md:flex-row absolute top-0 left-0 w-full h-full text-white font-semibold justify-center gap-2">
            <button
              className="flex items-center justify-center hover:underline hover:opacity-90 cursor-pointer"
              onClick={() => {
                setForcePlay(video.id)
              }}
            >
              PLAY
            </button>
            <button
              className="flex items-center justify-center hover:underline hover:opacity-90 cursor-pointer"
              onClick={() => {
                setMusicQueue((prev) => {
                  const result = prev.filter(({ id }) => id != video.id);
                  return result;
                })

                realmCollections.playlist?.deleteOne({
                  source: video.source,
                  id: video.id
                })
              }}
            >
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>;
}
