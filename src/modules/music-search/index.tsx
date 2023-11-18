'use client'

import React from "react";
import { getPlayList } from "./actions";
import { Video } from "youtube-sr";

export default function MusicSearch() {

    const [searchResult, setSearchResult] = React.useState<Video[]>([]);

    React.useEffect(() => {
        getPlayList().then(videos => setSearchResult(JSON.parse(videos)));
    }, []);


    return <div>
        {JSON.stringify(searchResult, null, 2)}
    </div>
}