// Advanced Animation variants for framer-motion
// Optimized for GPU-accelerated properties (transform, opacity only)
import { Variants } from 'framer-motion';

// Optimized easing - cubic bezier for smooth feel
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Basic Fades
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: smoothEase }
    }
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: smoothEase }
    }
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: smoothEase }
    }
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: smoothEase }
    }
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: smoothEase }
    }
};

// Advanced Entries - GPU optimized (no filter properties)
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: smoothEase }
    }
};

export const scaleInRotate: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.6, ease: smoothEase }
    }
};

// OPTIMIZED: Removed filter: blur() - very expensive, forces repaint
// Using scale + opacity combination for similar visual effect
export const blurIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" }
    }
};

export const perspectiveIn: Variants = {
    hidden: { opacity: 0, rotateX: 30, y: 30 },
    visible: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        transition: { duration: 0.7, ease: smoothEase }
    }
};

// Container Staggers - slightly faster for snappier feel
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
};

export const staggerContainerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: smoothEase }
    }
};

// Specialized
export const drawLine: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 1.2, ease: "easeInOut" }
    }
};

// Hover Interactions - optimized spring config
export const hoverCard: Variants = {
    initial: { scale: 1, y: 0 },
    hover: {
        scale: 1.02, // Reduced from 1.03
        y: -8, // Reduced from -10
        transition: { type: "spring", stiffness: 400, damping: 25 }
    }
};

export const hoverGlow: Variants = {
    initial: { boxShadow: "0 0 0px rgba(251, 191, 36, 0)" },
    hover: {
        boxShadow: "0 0 30px rgba(251, 191, 36, 0.35)",
        transition: { duration: 0.25 }
    }
};

export const hoverButton: Variants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.04, // Reduced from 1.05
        transition: { type: "spring", stiffness: 500, damping: 15 }
    },
    tap: { scale: 0.96 }
};

// Scroll reveal settings
export const scrollRevealSettings = {
    once: true,
    amount: 0.15 as const,
    margin: "-50px" as const
};
