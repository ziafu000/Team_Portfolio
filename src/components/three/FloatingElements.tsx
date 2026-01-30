'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
    position: [number, number, number];
    scale: number;
    speed: number;
}

function FloatingShape({ position, scale, speed }: ShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Random geometry type
    const geometry = useMemo(() => {
        const types = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.OctahedronGeometry(1),
            new THREE.TorusGeometry(0.7, 0.2, 16, 32),
            new THREE.TetrahedronGeometry(1)
        ];
        return types[Math.floor(Math.random() * types.length)];
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += 0.01 * speed;
        meshRef.current.rotation.y += 0.005 * speed;
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.002;
    });

    return (
        <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
                <primitive object={geometry} attach="geometry" />
                <meshStandardMaterial
                    color="#fbbf24"
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.3}
                    wireframe={Math.random() > 0.5}
                />
            </mesh>
        </Float>
    );
}

export default function FloatingElements({ count = 15 }) {
    const shapes = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 40, // Increased Y spread for scroll coverage
                (Math.random() - 0.5) * 10 - 5, // Keep some behind the main model
            ] as [number, number, number],
            scale: Math.random() * 0.5 + 0.1,
            speed: Math.random() + 0.5,
        }));
    }, [count]);

    return (
        <group>
            {shapes.map((shape) => (
                <FloatingShape key={shape.id} {...shape} />
            ))}
        </group>
    );
}
