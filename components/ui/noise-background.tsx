"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";

export const NoiseBackground = ({
    children,
    containerClassName,
    gradientColors,
}: {
    children?: React.ReactNode;
    containerClassName?: string;
    gradientColors?: string[];
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;

            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.5) buffer32[i] = 0xff000000;
            }

            ctx.putImageData(idata, 0, 0);
            animationFrameId = requestAnimationFrame(draw);
        };

        // Simple noise only once or animated?
        // Let's do a static noise overlay with opacity for performance, or animated.
        // Animated noise in JS is heavy. Let's use SVG filter for noise actually, it's better.
        // But since the user asked for a component, let's just make a nice gradient with noise texture.

        // Actually, let's implement the canvas animation but keep it simple
        // draw(); 

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Alternative: CSS based noise
    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center bg-white dark:bg-black overflow-hidden",
                containerClassName
            )}
        >
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>
            <div className={cn("relative z-20", containerClassName)}>
                {children}
            </div>
        </div>
    );
};
