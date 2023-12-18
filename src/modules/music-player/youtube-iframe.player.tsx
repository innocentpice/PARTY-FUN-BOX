'use client';

import React from "react";
import { YoutubePlayerControlAtom, YoutubePlayerRefAtom } from "./youtube-iframe.player.control"
import { useAtomValue, useSetAtom } from "jotai";
import { loadable } from "jotai/utils";

export default function YoutubePlayerIframe() {
    const ytPlayerRef = React.useRef<HTMLDivElement>(null);
    const setYoutubePlayerRef = useSetAtom(YoutubePlayerRefAtom);
    const youtubePlayerControlAtom = useAtomValue(loadable(YoutubePlayerControlAtom))

    React.useEffect(() => {
        if (ytPlayerRef.current)
            setYoutubePlayerRef((prev) => prev === ytPlayerRef.current ? prev : ytPlayerRef.current);

        return () => {
            if (youtubePlayerControlAtom.state === "hasData" && youtubePlayerControlAtom.data !== null) {
                youtubePlayerControlAtom.data?.destroy();
            }
        }
    }, [setYoutubePlayerRef, youtubePlayerControlAtom])

    return <div className="flex aspect-w-16 aspect-h-9 w-full">
        <div id="yt-player" className="rounded-2xl" ref={ytPlayerRef} />
    </div>
}
