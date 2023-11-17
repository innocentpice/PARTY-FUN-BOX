'use client';

import React from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { format } from 'react-string-format';
import { SteamPlayerAtom } from '../../app/context/control';
import { Palette } from 'color-thief-react';
import { musicControlMachineAtom } from "../music-control/music-control.state";

export default function BackgroundMusicColor({
  children,
}: React.PropsWithChildren) {
  const steamControl = useAtomValue(SteamPlayerAtom);
  const [musicControlState, musicControlDispatch] = useAtom(musicControlMachineAtom);

  if (musicControlState?.context?.playingMedia?.player !== "YOUTUBE") return <div>{children}</div>;
  
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
            style={{
              background: `linear-gradient(${data?.[0]}, ${data?.[1]})`,
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
