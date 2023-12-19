import React, { PropsWithChildren } from 'react';
import { TPlayerInfo } from '../legacys/music-player/youtube-iframe.player.type';

export const YoutubePlayerIframeContext = React.createContext<{
    YoutubeIframePlayerRef?: React.MutableRefObject<(YT.Player & {
        playerInfo: TPlayerInfo;
    }) | undefined>
}>({});


export const YoutubePlayerIframeProvider = ({ children }: PropsWithChildren) => {
    const YoutubeIframePlayerRef = React.useRef<YT.Player & { playerInfo: TPlayerInfo }>();

    return <YoutubePlayerIframeContext.Provider value={{ YoutubeIframePlayerRef }}>
        {children}
    </YoutubePlayerIframeContext.Provider>
}