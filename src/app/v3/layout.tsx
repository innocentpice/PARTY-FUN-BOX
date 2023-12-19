'use client'

import React from 'react';
import { SearchIcon, VideoIcon } from "lucide-react"
import '../global.css';
import Link from 'next/link';
import MusicQueue from 'src/modules/legacys/music-queue';

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
            <Link href="/v2">
              <div className="flex flex-row w-full hover:text-white py-2 content-center cursor-pointer">
                <div className="flex w-full @md:w-1/5 justify-center">
                  <VideoIcon />
                </div>
                <div className="hidden @md:flex">
                  Video
                </div>
              </div>
            </Link>
            <Link href="/v2/music-search">
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
            <div className="flex flex-col gap-3  h-full w-full  py-3 px-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
