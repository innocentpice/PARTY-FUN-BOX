import { atomWithMachine } from 'jotai-xstate';
import { musicControlMachine } from './music-control.machine';

export const musicControlMachineAtom = atomWithMachine(musicControlMachine);
