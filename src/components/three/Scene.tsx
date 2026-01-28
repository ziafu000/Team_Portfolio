'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, PresentationControls } from '@react-three/drei';
import { getOptimalDpr, getPerformanceTier } from '@/lib/device';
import Model from './Model';
import Lighting from './Lighting';
import CameraRig from './CameraRig';
import LoadingScreen from './LoadingScreen';

interface SceneProps {
    modelPath?: string;
}

export default function Scene({ modelPath = '/models/team-icon.glb' }: SceneProps) {
    const [isClient, setIsClient] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
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
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{
                    antialias: tier === 'desktop',
                    powerPreference: 'high-performance',
                    alpha: true
                }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <PresentationControls
                        global
                        snap={true}
                        rotation={[0, 0.3, 0]}
                        polar={[-Math.PI / 3, Math.PI / 3]}
                        azimuth={[-Infinity, Infinity]}
                    >
                        <CameraRig>
                            <Model
                                path={modelPath}
                                onLoaded={() => setIsLoaded(true)}
                            />
                        </CameraRig>
                    </PresentationControls>

                    <Lighting tier={tier} />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
