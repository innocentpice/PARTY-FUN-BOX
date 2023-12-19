'use client';

import { Provider } from "jotai";
import { YoutubePlayerIframeProvider } from "src/modules/youtube-player/youtube-player.iframe.context";

export default function Providers({ children }: React.PropsWithChildren) {
    return <Provider>
        <YoutubePlayerIframeProvider>
            {children}
        </YoutubePlayerIframeProvider>
    </Provider>
}