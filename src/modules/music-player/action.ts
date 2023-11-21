'use server';

import YoutubeDLCore from '@distube/ytdl-core';

export type YoutubeStreamInfo = {
  video: YoutubeDLCore.videoFormat;
  audio: YoutubeDLCore.videoFormat;
};

export async function getYoutubeStream(youtubeURL: string) {
  const trackInfo = await YoutubeDLCore.getInfo(youtubeURL);

  const formatInfo: YoutubeStreamInfo = {
    video: YoutubeDLCore.chooseFormat(trackInfo.formats, {
      quality: 'lowestvideo',
      filter: 'videoonly',
    }),
    audio: YoutubeDLCore.chooseFormat(trackInfo.formats, {
      quality: '',
      filter: 'audioonly',
    }),
  };

  return JSON.stringify(formatInfo);
}
