'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { format } from 'react-string-format';
import { Palette } from 'color-thief-react';
import { musicControlMachineAtom } from "../music-control/music-control.state";

export default function BackgroundMusicColor({
  children,
}: React.PropsWithChildren) {
  const [musicControlState] = useAtom(musicControlMachineAtom);

  if (musicControlState?.context?.playingMedia?.player !== "YOUTUBE") return (
    <div className='h-full'>
      {children}
    </div>);
  
  const link = format(
    'https://img.youtube.com/vi/{0}/maxresdefault.jpg',
    musicControlState?.context?.playingMedia?.videoId ?? ''
  );

  return (
    <>
    {console.log(link)}
      <Palette src={link} crossOrigin="anonymous" format="hex" colorCount={4}>
        {({ data }) => (
          <div
            className='h-full rounded-xl'
            style={{
              // background: `linear-gradient(${data?.[1]}, ${data?.[0]})`,
              background: `linear-gradient(${data?.join(", ")}, #0f1115cc 70%, #0f1115 90%)`,
              width: '100%',
              height: '100%',
            }}
          >
            {children}
          </div>
        )}
      </Palette>
    </>
  );
}