import React from 'react';
import { SearchIcon, VideoIcon } from "lucide-react"
import '../global.css';
import Link from 'next/link';
import { Metadata } from "next/types"
import MusicQueue from '../../modules/music-queue';
import MusicPlayer from 'src/modules/music-player';

export const metadata: Metadata = {
  title: 'Welcome to party-fun-box',
  description: 'Generated by create-nx-workspace',
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <div className="flex flex-col h-full ">
      {/* MAIN LAYOUT */}
      <div className="flex flex-row gap-2 p-2 h-[calc(100dvh-theme(spacing.20))]">
        <div className="flex flex-col w-1/3 gap-2">
          {/* MAIN MENU */}
          <div className="flex flex-col gap-3 bg-slate-600/20 h-fit rounded-xl py-3 px-5">
            <Link href="/v1">
              <div className="flex flex-row w-full hover:text-white py-2 content-center cursor-pointer">
                <div className="flex w-full @md:w-1/5 justify-center">
                  <VideoIcon />
                </div>
                <div className="hidden @md:flex">
                  Video
                </div>
              </div>
            </Link>
            <Link href="/v1/music-search">
              <div className="flex flex-row w-full hover:text-white py-2 content-center cursor-pointer">
                <div className="flex w-full @md:w-1/5 justify-center">
                  <SearchIcon />
                </div>
                <div className="hidden @md:flex">
                  ค้นหา
                </div>
              </div>
            </Link>
          </div>
          <MusicQueue />
        </div>
        <div className="flex w-full rounded-xl">
          <div className="flex flex-col gap-3 bg-slate-600/20 h-full w-full rounded-xl py-3 px-5">
            {/* <BackgroundMusicColor> */}
            <div className="flex flex-col gap-3  h-full w-full  py-3 px-5">
              {children}
            </div>
            {/* </BackgroundMusicColor> */}
          </div>
        </div>
      </div>

      {/* MUSIC CONTROL */}
      <div className="flex h-[theme(spacing.20)] w-full">
        <div className="flex w-full h-full justify-center p-5">
          <MusicPlayer />
        </div>
      </div>
    </div>

  );
}
