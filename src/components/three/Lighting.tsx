'use client';

import { Environment } from '@react-three/drei';
import { PerformanceTier } from '@/lib/device';

interface LightingProps {
    tier: PerformanceTier;
}

export default function Lighting({ tier }: LightingProps) {
    const isDesktop = tier === 'desktop';

    return (
        <>
            {/* Ambient fill light */}
            <ambientLight intensity={0.3} color="#ffffff" />

            {/* Key light - Warm Main illumination */}
            <directionalLight
                position={[5, 5, 5]}
                intensity={1.5}
                color="#fff7ed" // Very warm white
                castShadow={isDesktop}
            />

            {/* Rim light - Golden highlight */}
            <directionalLight
                position={[-5, 2, -3]}
                intensity={1.0}
                color="#fbbf24" // Amber/Gold
            />

            {/* Deep Orange accent light from bottom (replacing purple) */}
            <pointLight
                position={[0, -3, 2]}
                intensity={0.6}
                color="#ea580c" // Deep Orange
                distance={10}
            />

            {/* Soft Fill warm light */}
            <pointLight
                position={[4, 0, 0]}
                intensity={0.4}
                color="#fdba74" // Soft Orange
                distance={8}
            />

            {/* Environment for reflections - only on desktop */}
            {isDesktop && (
                <Environment preset="sunset" background={false} />
            )}
        </>
    );
}
