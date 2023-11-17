import { atom } from 'jotai';
import { SoundControl } from './context.type';

export const SteamPlayerAtom = atom<SoundControl | undefined>(undefined);
