import React from "react";
import Image from "next/image";

export default function LogoPartyBox({ width } : { width: string}) {
  return (
    <div>
      <Image src="/logoPartyNav.png" alt="logo"   width={120} height={120}
        style={{
          width: `${width}px`,
          height: "auto"
        }}/>
    </div>
  );
}
