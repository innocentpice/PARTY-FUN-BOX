'use server';

import YoutubeSearch from 'youtube-sr';

export async function searchMedias(searchQuery: string) {
  return YoutubeSearch.search(searchQuery, {
    type: 'video',
    safeSearch: true,
  }).then((videos) => {
    return JSON.stringify(videos);
  });
}
