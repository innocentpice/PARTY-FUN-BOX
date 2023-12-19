export interface TPlayerInfo {
  apiInterface: string[];
  videoBytesLoaded: number;
  videoBytesTotal: number;
  videoLoadedFraction: number;
  videoStartBytes: number;
  playlistIndex: number;
  options: string[];
  muted: boolean;
  volume: number;
  playerMode: PlayerMode;
  playerState: number;
  availablePlaybackRates: number[];
  playbackQuality: string;
  availableQualityLevels: string[];
  currentTime: number;
  duration: number;
  debugText: string;
  videoEmbedCode: string;
  videoUrl: string;
  mediaReferenceTime: number;
  size: Size;
  videoInfoVisible: boolean;
  playbackRate: number;
  sphericalProperties: SphericalProperties;
  videoData: VideoData;
  currentTimeLastUpdated_: number;
  progressState: ProgressState;
}

export interface PlayerMode {}

export interface Size {
  width: number;
  height: number;
}

export interface SphericalProperties {}

export interface VideoData {
  video_id: string;
  author: string;
  title: string;
  isPlayable: boolean;

  video_quality: string;
  backgroundable: boolean;
  eventId: string;
  cpn: string;
  isLive: boolean;
  isWindowedLive: boolean;
  isManifestless: boolean;
  allowLiveDvr: boolean;
  isListed: boolean;
  isMultiChannelAudio: boolean;
  hasProgressBarBoundaries: boolean;
  isPremiere: boolean;
  itct: string;

  paidContentOverlayDurationMs: number;
}

export interface ProgressState {
  airingStart: number;
  airingEnd: number;
  allowSeeking: boolean;

  clipStart: number;
  current: number;
  displayedStart: number;
  duration: number;

  isAtLiveHead: boolean;
  loaded: number;
  seekableStart: number;
  seekableEnd: number;
  offset: number;
  viewerLivestreamJoinMediaTime: number;
}
