import React from 'react';
import Providers from './provider';
import { HomeIcon, SearchIcon, ListMusicIcon, PlayCircleIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react"
import './global.css';
import Link from 'next/link';

import BackgroundMusicColor from 'src/modules/background-color-music';
import MusicControl from 'src/modules/music-control'; 

export const metadata = {
  title: 'Welcome to party-fun-box',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://www.youtube.com/iframe_api" defer />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className='bg-black h-full @container text-gray-400 relative'>
        <Providers>
       
          <div className="flex flex-col h-full ">
            
            {/* MAIN LAYOUT */}
            <div className="flex flex-row gap-2 p-2 h-[calc(100dvh-theme(spacing.20))]">
              <div className="flex flex-col w-1/3 gap-2">
                {/* MAIN MENU */}
                <div className="flex flex-col gap-3 bg-slate-600/20 h-fit rounded-xl py-3 px-5">
                  <Link href="/">
                    <div className="flex flex-row w-full hover:text-white py-2 content-center cursor-pointer">
                      <div className="flex w-full @md:w-1/5 justify-center">
                        <HomeIcon />
                      </div>
                      <div className="hidden @md:flex">
                        หน้าหลัก
                      </div>
                    </div>
                    </Link>
                    <Link href="/music-search">
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
                  {/* MEDIA PLAYLIST */}
                  <div className="flex flex-col gap-3 bg-slate-600/20 h-full rounded-xl p-3 pb-20">
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
                      <div className="flex gap-2 hover:bg-slate-700/10 rounded-md p-2 cursor-pointer">
                        <div className="flex w-full @md:w-1/5">
                          <div className="aspect-w-1 aspect-h-1 bg-white w-full rounded-md"></div>
                        </div>
                        <div className="hidden @md:flex">
                          HELLO
                        </div>
                      </div>
                    </div>
                  </div>
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
              <div className="flex w-full h-full justify-center">
                <div className="flex gap-2 items-center">
                  <ArrowLeftCircleIcon />
                  <PlayCircleIcon fill='white' className='w-8 h-8' />
                  <ArrowRightCircleIcon />
                </div>
              </div>
            </div>

            {/* <MusicControl/> */}

          </div>
        </Providers>
      </body>
    </html>
  );
}
