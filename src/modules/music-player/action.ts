'use server';

import YoutubeDLCore from '@distube/ytdl-core';

export type YoutubeStreamInfo = YoutubeDLCore.videoFormat;

export async function getYoutubeStream(youtubeURL: string) {
  const trackInfo = await YoutubeDLCore.getInfo(youtubeURL);
  const formatInfo = YoutubeDLCore.chooseFormat(trackInfo.formats, {
    quality: 'highestaudio',
  });

  return JSON.stringify(formatInfo);
}
