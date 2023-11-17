export interface SoundControl {
    currentPlay: string;
    playList?: SoundPlayList;
}

export interface SoundPlayList {
    list: string[],
    name: string
}