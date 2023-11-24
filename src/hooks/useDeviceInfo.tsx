import React from "react";

export default function useDeviceInfo() {
    const [deviceInfo, setDeviceInfo] = React.useState<
        {
            isMobile?: boolean,
            isDesktop?: boolean,
            isAndroid?: boolean,
            isIos?: boolean,
        }>({});

    React.useEffect(() => {
        const userAgentString = navigator.userAgent;
        const isAndroid = Boolean(userAgentString.match(/Android/i));
        const isIos = Boolean(userAgentString.match(/iPhone|iPad|iPod/i));
        const isOpera = Boolean(userAgentString.match(/Opera Mini/i));
        const isWindows = Boolean(userAgentString.match(/IEMobile/i));

        const isMobile = isAndroid || isIos || isOpera || isWindows;
        const isDesktop = !isMobile;

        setDeviceInfo({
            isMobile,
            isDesktop,
            isAndroid,
            isIos,
        });
    }, []);

    return deviceInfo;
}





