"use client";

import React from "react";
import LogoPartyBox from "../../components/logo";
import Image from "next/image";

export default function AppList() {
    const [ selectApp, setSelectApp] = React.useState<appList>({ id: "music", name: "Music", icons: "/AppMusic.png"})

    const applist: appList[] = [
        { id: "music", name: "Music", icons: "/AppMusic.png"},
        { id: "game", name: "Game", icons: "/AppMusic.png"},
    ]

    return (
        <div className="p-[4px] w-[74px] bg-[#121212b3] pt-[12px] flex flex-col items-center gap-[8px]">
            {applist.map(( {id, name, icons }) => 
             <div 
             className="rounded-xl text-center cursor-pointer hover:bg-[#ffffff1a] pt-[14px] pb-[12px] w-full flex flex-col items-center"
             onClick={() => {
                setSelectApp({ id: id, name: name, icons: icons })
             }}>
                <Image src={icons} alt="logo" width={100} height={100}
                    style={{ width: "28px",height: "auto"}}/>
                <p className="text-xs font-medium text-[#f1f1f1] pt-[4px]">
                    {name}
                </p>
             </div>
            )}
           
        </div>
    )
}

interface appList {
    id: string
    name: string
    icons: string
}