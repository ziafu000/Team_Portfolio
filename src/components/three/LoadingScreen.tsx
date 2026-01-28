'use client';

import { motion } from 'framer-motion';

interface LoadingScreenProps {
    progress?: number;
}

export default function LoadingScreen({ progress = 0 }: LoadingScreenProps) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-primary)] z-50">
            {/* Animated logo placeholder */}
            <motion.div
                className="w-16 h-16 mb-6 rounded-full gradient-primary"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Loading text */}
            <motion.p
                className="text-[var(--text-secondary)] font-display text-sm uppercase tracking-widest mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Loading Experience
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                <motion.div
                    className="h-full gradient-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(progress, 10)}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
}
