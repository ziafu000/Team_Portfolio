'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Preload, PresentationControls } from '@react-three/drei';
import { getOptimalDpr, getPerformanceTier } from '@/lib/device';
import Model from './Model';
import Lighting from './Lighting';
import LoadingScreen from './LoadingScreen';

interface SceneProps {
    modelPath?: string;
}

// Invalidate on hover for demand rendering
function HoverInvalidator() {
    const { invalidate } = useThree();

    useEffect(() => {
        const handleMouseMove = () => invalidate();
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [invalidate]);

    return null;
}

export default function Scene({ modelPath = '/models/team-icon.glb' }: SceneProps) {
    const [isClient, setIsClient] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Visibility detection - pause rendering when off-screen
    useEffect(() => {
        if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0, rootMargin: '100px' }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const tier = isClient ? getPerformanceTier() : 'desktop';
    const dpr = isClient ? getOptimalDpr() : 2;

    // Show fallback for lite tier devices
    if (tier === 'lite') {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-64 h-64 gradient-primary rounded-full opacity-50 animate-pulse-glow" />
            </div>
        );
    }

    if (!isClient) {
        return <LoadingScreen progress={0} />;
    }

    return (
        <div ref={containerRef} className="w-full h-full relative">
            {!isLoaded && <LoadingScreen progress={50} />}

            <Canvas
                className="w-full h-full"
                dpr={dpr}
                frameloop={isVisible ? 'demand' : 'never'}
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{
                    antialias: tier === 'desktop',
                    powerPreference: 'high-performance',
                    alpha: true,
                    stencil: false,
                    depth: true,
                }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <HoverInvalidator />

                    {/* Only hover/drag to rotate - model stays still otherwise */}
                    <PresentationControls
                        global
                        snap={true}
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                        config={{ mass: 1, tension: 170, friction: 26 }}
                    >
                        <Model
                            path={modelPath}
                            onLoaded={() => setIsLoaded(true)}
                        />
                    </PresentationControls>

                    <Lighting tier={tier} />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
