'use client';

import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { format } from 'react-string-format';
import { SteamPlayerAtom } from '../../app/context/control';
import { Palette } from 'color-thief-react';

export default function BackgroundMusicColor({
  children,
}: React.PropsWithChildren) {
  const steamControl = useAtomValue(SteamPlayerAtom);
  const link = format(
    'https://img.youtube.com/vi/{0}/maxresdefault.jpg',
    steamControl?.currentPlay ?? ''
  );

  return (
    <>
    {console.log(link)}
      <Palette src={link} crossOrigin="anonymous" format="hex" colorCount={4}>
        {({ data }) => (
          <div
            style={{
              background: `linear-gradient(${data?.[1]}, ${data?.[0]})`,
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
