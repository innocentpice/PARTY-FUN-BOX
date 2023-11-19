'use server';

import YTSearch from 'youtube-sr';

export async function getPlayList(search: string) {
  const result = YTSearch.search(search);
  return result.then(JSON.stringify);
}
