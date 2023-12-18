import { atom } from 'jotai';
import { MediaItem } from 'src/app/v1/music-search/actions';

export const forcePlayAtom = atom<MediaItem['id'] | null>(null);
export const musicQueueAtom = atom<MediaItem[]>([]);
