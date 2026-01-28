// Advanced Animation variants for framer-motion
import { Variants } from 'framer-motion';

// Basic Fades
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

// Advanced Entries
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

export const scaleInRotate: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

export const blurIn: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        transition: { duration: 1, ease: "easeOut" }
    }
};

export const perspectiveIn: Variants = {
    hidden: { opacity: 0, rotateX: 45, y: 50, perspective: 1000 },
    visible: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
};

// Container Staggers
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};

export const staggerContainerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2
        }
    }
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

// Specialized
export const drawLine: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 1.5, ease: "easeInOut" }
    }
};

// Hover Interactions
export const hoverCard: Variants = {
    initial: { scale: 1, y: 0 },
    hover: {
        scale: 1.03,
        y: -10,
        transition: { type: "spring", stiffness: 300, damping: 20 }
    }
};

export const hoverGlow: Variants = {
    initial: { boxShadow: "0 0 0px rgba(251, 191, 36, 0)" },
    hover: {
        boxShadow: "0 0 40px rgba(251, 191, 36, 0.4)",
        transition: { duration: 0.3 }
    }
};

export const hoverButton: Variants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
};

// Scroll reveal settings
export const scrollRevealSettings = {
    once: true,
    amount: 0.15 as const,
    margin: "-50px" as const
};
