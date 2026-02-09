'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getPerformanceTier } from '@/lib/device';

interface ParticlesProps {
    count?: number;
}

export default function Particles({ count }: ParticlesProps) {
    const points = useRef<THREE.Points>(null!);
    const { invalidate } = useThree();
    const frameCount = useRef(0);

    // Adjust count based on performance tier
    const tier = typeof window !== 'undefined' ? getPerformanceTier() : 'desktop';
    const actualCount = count ?? (tier === 'desktop' ? 80 : tier === 'mobile' ? 40 : 20);

    // Create randomized positions for particles
    const particles = useMemo(() => {
        const positions = new Float32Array(actualCount * 3);
        for (let i = 0; i < actualCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 25;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return positions;
    }, [actualCount]);

    useFrame((state) => {
        if (!points.current) return;

        // Throttle updates - only update every 2 frames
        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;

        // Subtle drift movement
        points.current.rotation.x += 0.0001;
        points.current.rotation.y += 0.0002;
        points.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;

        invalidate();
    });

    // Don't render on lite tier
    if (tier === 'lite') return null;

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#fbbf24"
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
