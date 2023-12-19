import { assign, createMachine } from 'xstate';

export type MediaItem =
  | {
      player: 'YOUTUBE';
      videoId: string;
    }
  | {
      player: 'SPOTIFY';
    };

interface musicControlMachineContext {
  playingMedia?: MediaItem;
}
type musicControlMachineEvent =
  | {
      type: 'LOAD';
      meida: MediaItem;
    }
  | {
      type: 'PLAY';
    }
  | {
      type: 'PAUSE';
    }
  | {
      type: 'STOP';
    };

export const musicControlMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCusCWBjAwgewDsAXAJzwBsA6DCcsAYgAUAZAQQE0BtABgF1FQABzyYiGQgJAAPRACZuAFkrcAbAHYArAEZNald26yFAGhABPRAFotKgJyU1ADiO2NjtVsNvZAXx+m0TFxCUgpKQXIAQzMMAigmVgBVAGUAUR5+JBBhUXECSRkELVtHSltZFUdyjT0DI1MLBEsNbmVZV25tBUcAZjsNWwU-APRsfGIyKgjo2PjkgBUAeUYMyRyMMQkswtleyg0e7sM1HtlZDXrzOR7KYv1Hbh13J0dhkECxkMnwyPRIJjYXD4axEGzyBUQCh6pW4tk8AwUWgUKjs7gaVhabQ6XV6-UGbw+wQmYVgRDwgn+LA4qyy602+W2iBapQeakRfXKimhJiuCFkNzu3AeTzULz8-hABDwEDgkkJ41C5BBuS2oEKWkx5Uq1Vqhh5jUspxu5zcGgUXlOsjUBNGRMV1FoYGVYNV0jknn2nUeun0evRTX5GgcGlN5vOlutEvlXzC0xicWd9IhRVs9hsWnOBlcZ0Ujn91iFlGhQrNKh6GnUCiMNqCCu+gl+sEgifBjIQp1ah2cKkRuzUqhD+cxhmxmncsi0Ohrn2JVFJ5ObtNBSbb0PstjUE6cWiqQp6th6-v5t1s929z0cr3FQA */
    id: 'musicControl',
    tsTypes: {} as import('./music-control.machine.typegen').Typegen0,
    predictableActionArguments: true,
    schema: {
      context: {} as musicControlMachineContext,
      events: {} as musicControlMachineEvent,
    },
    context: {},
    initial: 'idle',
    states: {
      idle: {
        on: {
          LOAD: {
            actions: ['setPlayingMedia'],
          },
          PLAY: 'playing',
        },
      },

      playing: {
        on: {
          PAUSE: 'paused',
          STOP: 'stoped',
        },
      },

      paused: {
        on: {
          PLAY: 'playing',
        },
      },

      stoped: {
        on: {
          PLAY: 'playing',
        },
      },
    },
  },
  {
    actions: {
      setPlayingMedia: assign((context, event) => {
        if (event.type !== 'LOAD' || !event.meida) return context;

        return {
          playingMedia: event.meida,
        };
      }),
    },
  }
);
