'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 100 }) {
    const points = useRef<THREE.Points>(null!);

    // Create randomized positions for particles
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 25;     // X spread
            positions[i * 3 + 1] = (Math.random() - 0.5) * 60; // Huge Y spread for scrolling
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (points.current) {
            // Subtle drift movement
            points.current.rotation.x += 0.0001;
            points.current.rotation.y += 0.0002;

            // Follow camera/scroll roughly
            points.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
        }
    });

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
                color="#fbbf24" // Amber/Gold particles
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
