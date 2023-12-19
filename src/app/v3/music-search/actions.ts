'use server';

import YoutubeSearch, { Video } from 'youtube-sr';

export type MediaItem = {
  source: 'YOUTUBE';
} & ReturnType<Video['toJSON']>;

export async function searchMedias(searchTerms: string) {
  const searchResult = await YoutubeSearch.search(searchTerms, {
    type: 'video',
    safeSearch: true,
  });
  return JSON.stringify(
    searchResult.map((item) => ({ ...item, source: 'YOUTUBE' }))
  );
}

export async function getSuggestions(searchTerms: string) {
  const searchResult = await YoutubeSearch.getSuggestions(searchTerms);

  return JSON.stringify(searchResult);
}
