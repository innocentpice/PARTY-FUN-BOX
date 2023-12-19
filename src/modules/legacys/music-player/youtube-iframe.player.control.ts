'use client';

import { atom } from 'jotai';
import { TPlayerInfo } from './youtube-iframe.player.type';

export const YoutubePlayerRefAtom = atom<HTMLDivElement | null>(null);

export const YoutubePlayerControlAtom = atom<
  Promise<(YT.Player & { playerInfo: TPlayerInfo }) | undefined>
>(async (get) => {
  'use client';

  if (typeof window == 'undefined' || !('YT' in window)) return;

  const YoutubePlayerElm = await new Promise<HTMLDivElement>((resolve) => {
    const checkElmInterval = setInterval(() => {
      if (get(YoutubePlayerRefAtom)) {
        resolve(get(YoutubePlayerRefAtom) as HTMLDivElement);
        clearInterval(checkElmInterval);
      }
    }, 1);
  });

  const youtubePlayer = new YT.Player(YoutubePlayerElm, {
    width: '100%',
    height: '100%',
    videoId: '1wq47tabJh0',
    playerVars: {
      autoplay: 1,
      playsinline: 1,
      modestbranding: 1,
      origin: '*',
    },
    events: {
      onApiChange: (...param) => console.log(`onApiChange`, param),
      onError: (...param) => console.log(`onError`, param),
      onPlaybackQualityChange: (...param) =>
        console.log(`onPlaybackQualityChange`, param),
      onPlaybackRateChange: (...param) =>
        console.log(`onPlaybackRateChange`, param),
      onReady: (...param) => console.log(`onReady`, param),
      onStateChange: (...param) => console.log(`onStateChange`, param),
    },
  });

  return youtubePlayer as YT.Player & { playerInfo: TPlayerInfo };
});
