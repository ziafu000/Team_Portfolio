'use client';

import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
    path: string;
    onLoaded?: () => void;
}

export default function Model({ path, onLoaded }: ModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(path);
    const { viewport } = useThree();

    // Responsive positioning matches layout
    const isDesktop = viewport.width > 10; // Approx threshold for desktop view

    useEffect(() => {
        if (scene) {
            // Center and normalize content first
            const box = new THREE.Box3().setFromObject(scene);
            const center = box.getCenter(new THREE.Vector3());
            scene.position.sub(center);

            // Scale to fit
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            scene.scale.setScalar(scale);

            // Notify parent that model is loaded
            onLoaded?.();
        }
    }, [scene, onLoaded]);

    // Subtle auto-rotation animation + Responsive Position
    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating motion
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

            // Position logic:
            // If desktop: Center (x: 0)
            // If mobile: Move right (x: 2.5)
            const targetX = isDesktop ? 0 : 2.6;

            // Interpolate position for smooth resize transitions
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);

            // Even more subtle auto-rotation to let manual controls shine
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
}

// Preload utility - call this if you want to preload specific models
export function preloadModel(path: string) {
    useGLTF.preload(path);
}
