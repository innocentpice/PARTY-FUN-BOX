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
      {musicQueue.map((track, idx) => (
        <div
          key={`${idx}_${track.id}`}
          className="flex gap-2 hover:bg-slate-700/10 rounded-md p-2 cursor-pointer group relative w-full"
        >
          <div className="flex w-full @md:w-1/5 group-hover:blur-sm">
            <div className="flex w-full aspect-w-1 aspect-h-1 relative">
              <Image src={(track.source === "YOUTUBE" ? track.thumbnail?.url : track.album.images[0].url) as string} fill alt="" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-md" />
              {track.source === "YOUTUBE" ?
                <YoutubeIcon className="absolute z-auto top-2 left-2 w-4 h-4" fill="red" color="white" />
                :
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
              }
            </div>
          </div>
          <div className="hidden @md:flex w-full h-[theme(spacing.6)] self-center group-hover:blur-sm">
            <p className='line-clamp-1'>
              {track.source === "YOUTUBE" ? track.title : `${track.name} - ${track.artists[0].name}`}
            </p>
          </div>
          <div className="hidden group-hover:flex flex-col @md:flex-row absolute top-0 left-0 w-full h-full text-white font-semibold justify-center gap-2">
            <button
              className="flex items-center justify-center hover:underline hover:opacity-90 cursor-pointer"
              onClick={() => {
                setForcePlay(track.id)
              }}
            >
              PLAY
            </button>
            <button
              className="flex items-center justify-center hover:underline hover:opacity-90 cursor-pointer"
              onClick={() => {
                setMusicQueue((prev) => {
                  const result = prev.filter(({ id }) => id != track.id);
                  return result;
                })

                realmCollections.playlist?.deleteOne({
                  source: track.source,
                  id: track.id
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
