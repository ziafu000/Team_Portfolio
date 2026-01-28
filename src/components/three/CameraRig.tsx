'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
    children: React.ReactNode;
}

export default function CameraRig({ children }: CameraRigProps) {
    const groupRef = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Smooth mouse parallax effect - Lowered power for interactivity
            const targetX = (mouse.x * viewport.width) / 40;
            const targetY = (mouse.y * viewport.height) / 40;

            // Lerp for smooth movement
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                targetY * 0.05,
                delta * 1.5
            );
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                targetX * 0.05,
                delta * 1.5
            );
        }
    });

    return <group ref={groupRef}>{children}</group>;
}
