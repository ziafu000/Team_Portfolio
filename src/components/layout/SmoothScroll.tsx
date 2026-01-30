'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        const lenis = lenisRef.current?.lenis;
        if (!lenis) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // If reduced motion is requested, we don't sync GSAP ticker for smooth scroll
            // and we set Lenis to behave like native scroll (or close to it)
            lenis.options.duration = 0;
            lenis.options.smoothWheel = false;
            return;
        }

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        // Use GSAP ticker to drive Lenis for perfect synchronization
        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);

        // Disable lag smoothing to prevent jumps
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.off('scroll', ScrollTrigger.update);
        };
    }, []);

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                lerp: 0.1,
                duration: 2.0,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1.5,
                infinite: false,
                autoRaf: false, // Critical: Let GSAP drive the raf
            }}
        >
            {children}
        </ReactLenis>
    );
}
