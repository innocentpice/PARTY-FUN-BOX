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
