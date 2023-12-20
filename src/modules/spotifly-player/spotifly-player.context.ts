import { atom } from 'jotai';

export const SpotifyPlayerAtom = atom<{
  player: Spotify.Player;
  playerState?: Spotify.PlaybackState;
  device_id: string;
} | null>(null);
