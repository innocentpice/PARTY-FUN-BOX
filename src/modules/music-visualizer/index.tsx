'use client';

import React from "react";
import Measure from 'react-measure';


type ButterchurnVisualizer = {
    render: () => void;
    setRendererSize: (x: number, y: number) => void;
    connectAudio: (audioNode: AudioNode) => void;
    loadPreset: (preset: Record<string, unknown>, blendTime: number) => void;
    launchSongTitleAnim: (title: string) => void;
}

export default function Visualizer() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const animationFrameRequest = React.useRef<number | null>(null);
    const butterchurnRef = React.useRef<{ createVisualizer: (audioContext: AudioContext, canvas: HTMLCanvasElement, options: { width: number, height: number }) => ButterchurnVisualizer }>();
    const butterchurnPresetsRef = React.useRef<{ getPresets(): Record<string, Record<string, unknown>> }>();
    const isButterchurnSupportedRef = React.useRef<() => boolean>();



    React.useEffect(() => {
        (async () => {
            try {
                if (butterchurnRef.current === null)
                    butterchurnRef.current = (await import("butterchurn")).default;
                if (butterchurnPresetsRef.current === null)
                    butterchurnPresetsRef.current = (await import("butterchurn-presets")).default;
                if (!isButterchurnSupportedRef.current)
                    isButterchurnSupportedRef.current = (await import("butterchurn/lib/isSupported.min")).default;

                const butterchurn = butterchurnRef.current
                const butterchurnPresets = butterchurnPresetsRef.current
                const isButterchurnSupported = isButterchurnSupportedRef.current

                if (!isButterchurnSupported?.() || !canvasRef.current) return console.log("NOT SUPPORTED");

                const audioCtx = new AudioContext();
                const analyserNode = audioCtx.createAnalyser()
                const visualizer = butterchurn?.createVisualizer(audioCtx, canvasRef.current, {
                    width: 800,
                    height: 600
                });

                visualizer?.connectAudio(analyserNode);

                const presets = butterchurnPresets?.getPresets();
                const preset = presets?.[Object.keys(presets)[0]];

                if (preset)
                    visualizer?.loadPreset(preset, 30);


                if (animationFrameRequest.current !== null) {
                    cancelAnimationFrame(animationFrameRequest.current);
                }
                const renderingLoop = () => {
                    visualizer?.render();
                    animationFrameRequest.current = requestAnimationFrame(renderingLoop)
                };
                renderingLoop();



            } catch (err) {
                console.log(err);
            }
        })()

        return () => {
            if (animationFrameRequest.current !== null) {
                cancelAnimationFrame(animationFrameRequest.current);
            }
        };
    }, []);

    return React.useMemo(() => <Measure bounds>
        {
            ({ measureRef }) => (
                <div ref={measureRef}>
                    <canvas ref={canvasRef} className="w-screen h-screen" />
                </div>
            )
        }
    </Measure>, []);
}
