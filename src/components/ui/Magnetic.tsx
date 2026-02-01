'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
    children: React.ReactNode;
    disabled?: boolean;
}

export default function Magnetic({ children, disabled = false }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        // Disable on touch devices or if user prefers reduced motion
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        setIsEnabled(!isTouchDevice && !prefersReducedMotion && !disabled);
    }, [disabled]);

    const handleMouse = (e: React.MouseEvent) => {
        if (!isEnabled) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    // If disabled, render children without motion wrapper overhead
    if (!isEnabled) {
        return <>{children}</>;
    }

    return (
        <motion.div
            style={{ position: 'relative' }}
            ref={ref}
            animate={{ x, y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
}
