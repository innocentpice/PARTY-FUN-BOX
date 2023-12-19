'use client';

import React from "react";
import { YoutubePlayerIframe, YoutubePlayerIframeControl } from "src/modules/youtube-player";


export default function IndexPage() {
    return React.useMemo(() => <div className="flex flex-col">
        <div className="flex w-full aspect-w-16 aspect-h-9">
            <YoutubePlayerIframe />
        </div>
        <YoutubePlayerIframeControl />
    </div>, []);
}