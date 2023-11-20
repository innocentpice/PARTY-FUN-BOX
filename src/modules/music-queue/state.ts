import { atom } from 'jotai';
import { Video } from 'youtube-sr';

export const musicQueueAtom = atom<Video[]>([]);
