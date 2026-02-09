'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getPerformanceTier } from '@/lib/device';

interface FloatingShapeProps {
    position: [number, number, number];
    scale: number;
    speed: number;
    geometry: THREE.BufferGeometry;
    isWireframe: boolean;
}

function FloatingShape({ position, scale, speed, geometry, isWireframe }: FloatingShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { invalidate } = useThree();
    const frameCount = useRef(0);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Throttle updates - only update every 3 frames
        frameCount.current++;
        if (frameCount.current % 3 !== 0) return;

        meshRef.current.rotation.x += 0.01 * speed;
        meshRef.current.rotation.y += 0.005 * speed;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.3;

        invalidate();
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <primitive object={geometry} attach="geometry" />
            <meshStandardMaterial
                color="#fbbf24"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.25}
                wireframe={isWireframe}
            />
        </mesh>
    );
}

interface FloatingElementsProps {
    count?: number;
}

export default function FloatingElements({ count }: FloatingElementsProps) {
    // Adjust count based on performance tier
    const tier = typeof window !== 'undefined' ? getPerformanceTier() : 'desktop';
    const actualCount = count ?? (tier === 'desktop' ? 8 : tier === 'mobile' ? 4 : 2);

    // Pre-create shared geometries (reusable across all shapes)
    const geometries = useMemo(() => [
        new THREE.BoxGeometry(1, 1, 1, 1, 1, 1), // Reduced segments
        new THREE.OctahedronGeometry(1, 0), // Low detail
        new THREE.TorusGeometry(0.7, 0.2, 8, 16), // Reduced segments
        new THREE.TetrahedronGeometry(1, 0) // Low detail
    ], []);

    const shapes = useMemo(() => {
        return Array.from({ length: actualCount }).map((_, i) => ({
            id: i,
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 10 - 5,
            ] as [number, number, number],
            scale: Math.random() * 0.5 + 0.1,
            speed: Math.random() * 0.5 + 0.3, // Reduced speed range
            geometry: geometries[i % geometries.length],
            isWireframe: Math.random() > 0.6,
        }));
    }, [actualCount, geometries]);

    // Don't render on lite tier
    if (tier === 'lite') return null;

    return (
        <group>
            {shapes.map((shape) => (
                <FloatingShape key={shape.id} {...shape} />
            ))}
        </group>
    );
}
