'use server';

import YTSearch from 'youtube-sr';

export async function getPlayList() {
  const result = YTSearch.search('mood lofi');
  return result.then(JSON.stringify);
}
