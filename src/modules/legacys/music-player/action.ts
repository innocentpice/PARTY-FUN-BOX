'use server';

import YoutubeDLCore from '@distube/ytdl-core';

export type YoutubeStreamInfo = {
  trackInfo: YoutubeDLCore.videoInfo;
  video: YoutubeDLCore.videoFormat;
  audio: YoutubeDLCore.videoFormat;
};

export async function getYoutubeStream(youtubeURL: string) {
  const trackInfo = await YoutubeDLCore.getInfo(youtubeURL);

  const formatInfo: YoutubeStreamInfo = {
    trackInfo,
    video: YoutubeDLCore.chooseFormat(
      trackInfo.formats.filter(
        (item) => item.quality === 'medium' || item.quality === 'large'
      ),
      {
        filter: 'videoonly',
      }
    ),
    audio: YoutubeDLCore.chooseFormat(
      trackInfo.formats.filter((item) => item.container === 'mp4'),
      {
        quality: 'highestaudio',
        filter: 'audioonly',
      }
    ),
  };

  if (formatInfo.audio.url)
    formatInfo.audio.url = formatInfo.audio.url.replace('https://', '/proxy/');
  if (formatInfo.video.url)
    formatInfo.video.url = formatInfo.video.url.replace('https://', '/proxy/');

  return JSON.stringify(formatInfo);
}
