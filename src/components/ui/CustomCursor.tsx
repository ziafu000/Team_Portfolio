'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const rafIdRef = useRef<number | null>(null);

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Optimized spring physics - faster response
    const springConfig = { damping: 30, stiffness: 500, mass: 0.3 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Throttled mouse move handler using RAF
    const pendingMousePos = useRef({ x: 0, y: 0 });
    const isUpdating = useRef(false);

    const updateCursorPosition = useCallback(() => {
        mouseX.set(pendingMousePos.current.x - 16);
        mouseY.set(pendingMousePos.current.y - 16);
        isUpdating.current = false;
    }, [mouseX, mouseY]);

    useEffect(() => {
        // Check for touch device or reduced motion preference
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isLowEndDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

        if (isTouchDevice || prefersReducedMotion || isLowEndDevice) {
            setIsVisible(false);
            document.body.classList.remove('custom-cursor-none');
            return;
        }

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            pendingMousePos.current = { x: e.clientX, y: e.clientY };

            // Throttle using RAF - only update once per frame
            if (!isUpdating.current) {
                isUpdating.current = true;
                rafIdRef.current = requestAnimationFrame(updateCursorPosition);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = Boolean(
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.hasAttribute('data-hover')
            );
            setIsHovered(isInteractive);
        };

        // Use passive listeners for better scroll performance
        window.addEventListener('mousemove', moveCursor, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [updateCursorPosition]);

    // Don't render if not visible
    if (!isVisible) {
        return null;
    }

    return (
        <>
            {/* Main large circle */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    willChange: 'transform',
                }}
                animate={{
                    scale: isHovered ? 2 : 1,
                }}
                transition={{ duration: 0.15 }}
            />
            {/* Small center dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: 12,
                    translateY: 12,
                    willChange: 'transform',
                }}
            />
        </>
    );
}
