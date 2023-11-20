'use server';

import YoutubeSearch, { Video } from 'youtube-sr';

export type MediaItem = {
  source: 'YOUTUBE';
} & Video;

export async function searchMedias(searchTerms: string) {
  const searchResult = await YoutubeSearch.search(searchTerms, {
    type: 'video',
    safeSearch: true,
  });
  return JSON.stringify(
    searchResult.map((item) => ({ ...item, source: 'YOUTUBE' }))
  );
}
