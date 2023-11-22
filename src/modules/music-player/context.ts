import { atom } from 'jotai';

export const youtubeVideoPlayerAtom = atom<HTMLVideoElement | null>(null);
export const youtubeVideoPlayerSteamURLAtom = atom<string | null>(null);

export const youtubeAudioPlayerAtom = atom<HTMLAudioElement | null>(null);
export const youtubeAudioPlayerSteamURLAtom = atom<string | null>(null);

export const youtubePlayerAtom = atom((get) => {
  const youtubeVideo = get(youtubeVideoPlayerAtom);
  const youtubeAudio = get(youtubeAudioPlayerAtom);

  if (youtubeVideo && youtubeAudio) {
    const playingListener = () => {
      youtubeVideo.currentTime = youtubeAudio.currentTime;
      youtubeVideo.play();
    };

    youtubeAudio.addEventListener('playing', playingListener);
    youtubeVideo.addEventListener('playing', playingListener);

    const pauseListener = () => {
      youtubeAudio.pause();
      youtubeVideo.pause();
    };
    youtubeAudio.addEventListener('pause', pauseListener);
    youtubeVideo.addEventListener('pause', pauseListener);
  }

  return { youtubeAudio, youtubeVideo };
});
