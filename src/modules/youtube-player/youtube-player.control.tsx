'use client';

import React from "react"
import { YoutubePlayerIframeContext } from "./youtube-player.iframe.context"
import { musicQueueAtom } from "../legacys/music-queue/state";
import { useAtom } from "jotai";

export function YoutubePlayerIframeControl() {

    const { YoutubeIframePlayerRef } = React.useContext(YoutubePlayerIframeContext);
    const intervalRef = React.useRef<NodeJS.Timeout>();
    const [musicQueue] = useAtom(musicQueueAtom);

    const firstQueue = React.useMemo(() => ({
        id: musicQueue[0]?.id,
        source: musicQueue[0]?.source,
        title: musicQueue[0]?.title
    }), [musicQueue]);


    const LoadVideoById = React.useCallback(() => {
        if (!YoutubeIframePlayerRef?.current?.loadVideoById) {
            intervalRef.current = setTimeout(() => {
                LoadVideoById();
            })
            return false;
        }

        YoutubeIframePlayerRef.current.loadVideoById(firstQueue.id);
        return true;
    }, [YoutubeIframePlayerRef, firstQueue.id]);

    React.useEffect(() => {
        LoadVideoById();
        return () => {
            clearTimeout(intervalRef.current)
        }
    }, [LoadVideoById]);

    return <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-center">
            {firstQueue.title}
        </div>
        <div className="flex flex-row gap-5 justify-center">
            <button className="flex" > {"<"}-- PREV</button>
            <button className="flex">PAUSE</button>
            <button className="flex">PLAY</button>
            <button className="flex">NEXT --{">"}</button>
        </div >
    </div>
}