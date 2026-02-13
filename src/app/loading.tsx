'use client';

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[var(--bg-primary)] overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-glow)] rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Animated Orb */}
                <div className="relative w-24 h-24 mb-10">
                    <motion.div
                        className="absolute inset-0 rounded-full gradient-primary opacity-50 blur-xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="relative w-full h-full rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md flex items-center justify-center shadow-2xl"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="w-10 h-10 rounded-full gradient-primary animate-pulse shadow-[0_0_20px_var(--accent-glow)]" />
                    </motion.div>
                </div>

                {/* Loading Text */}
                <div className="overflow-hidden">
                    <motion.h2
                        className="text-2xl font-display font-medium tracking-[0.3em] uppercase gradient-text"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Loading
                    </motion.h2>
                </div>

                {/* Animated Progress Line */}
                <div className="mt-6 w-48 h-[1px] bg-[var(--glass-border)] relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full w-24 gradient-primary"
                        animate={{
                            x: [-100, 200],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </div>

            {/* Noise Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-50 opacity-[0.02] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
}
