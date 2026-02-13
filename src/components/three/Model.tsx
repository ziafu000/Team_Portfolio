'use client';

import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
    path: string;
    onLoaded?: () => void;
}

export default function Model({ path, onLoaded }: ModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(path);
    const { viewport } = useThree();

    // Responsive positioning
    const isDesktop = viewport.width > 10;

    useEffect(() => {
        if (scene) {
            // Center and normalize content
            const box = new THREE.Box3().setFromObject(scene);
            const center = box.getCenter(new THREE.Vector3());
            scene.position.sub(center);

            // Scale to fit
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.4 / maxDim; // Increased slightly from 2
            scene.scale.setScalar(scale);

            onLoaded?.();
        }
    }, [scene, onLoaded]);

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
}

// Preload utility
export function preloadModel(path: string) {
    useGLTF.preload(path);
}
