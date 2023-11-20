'use server';

import YoutubeSearch from 'youtube-sr';

export async function searchMedias(searchQuery: string) {
  return YoutubeSearch.search(searchQuery, {
    type: 'video',
  }).then((response) => JSON.stringify(response));
}
