'use client'

import { usePathname } from "next/navigation"
import React from "react"
import MusicPlayer from "src/modules/music-player"
import { cn } from "src/utils/tw-merge"

export default function PlayerWrapper({ children }: React.PropsWithChildren) {

    const pathName = usePathname();

    return <>
        <div className={cn("flex", pathName !== "/" && "hidden")}>
            <MusicPlayer />
        </div>
        {pathName !== "/" && children}
    </>
}