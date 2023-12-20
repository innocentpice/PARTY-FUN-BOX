'use server';

import { Scopes, SpotifyApi } from '@spotify/web-api-ts-sdk';

import YoutubeSearch, { Video } from 'youtube-sr';

export type MediaItem =
  | ({
      source: 'YOUTUBE';
    } & ReturnType<Video['toJSON']>)
  | ({
      source: 'SPOTIFLY';
    } & Spotify.Track);

export async function searchMedias(searchTerms: string) {
  const spotifyApi = SpotifyApi.withClientCredentials(
    '2198e2ab4de94511851246906f27cf05',
    'e9e531494e2d48708c84bd02fdd67037',
    Scopes.all
  );

  const ytSearchResult = await YoutubeSearch.search(searchTerms, {
    type: 'video',
    safeSearch: true,
  });

  await spotifyApi.authenticate();
  const spSearchResult = await spotifyApi
    .search(searchTerms, ['track'])
    .catch((err) => console.log(err));

  return JSON.stringify([
    ...ytSearchResult.map((item) => ({ ...item, source: 'YOUTUBE' })),
    ...(spSearchResult?.tracks.items.map((item) => ({
      ...item,
      source: 'SPOTIFLY',
    })) || []),
  ]);
}

export async function getSuggestions(searchTerms: string) {
  const searchResult = await YoutubeSearch.getSuggestions(searchTerms);

  return JSON.stringify(searchResult);
}
