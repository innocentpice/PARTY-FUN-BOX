import { atom } from 'jotai';
import { MediaItem } from 'src/app/music-search/actions';

export const musicQueueAtom = atom<MediaItem[]>([]);
