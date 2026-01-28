'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    fadeInUp,
    staggerContainer,
    blurIn,
    perspectiveIn,
    hoverButton
} from '@/lib/motion';

// Dynamic import for 3D scene - only loads on client
const Scene = dynamic(() => import('@/components/three/Scene'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 rounded-full gradient-primary opacity-50 animate-pulse-glow" />
        </div>
    ),
});

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="hero-gradient-bg" />
            <div className="bg-grid absolute inset-0 opacity-30" />

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0">
                <Scene modelPath="/models/team-icon.glb" />
            </div>

            {/* Content Overlay */}
            <div className="container relative z-10 h-full flex items-center pointer-events-none">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left pt-20 lg:pt-0 pointer-events-auto"
                >
                    {/* Badge */}
                    <motion.div
                        variants={perspectiveIn}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 mx-auto lg:mx-0 border-[var(--glass-border)]"
                    >
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                        <span className="text-sm text-[var(--text-secondary)] font-medium tracking-wide">
                            Creative Digital Studio
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={blurIn}
                        className="font-display font-bold tracking-tight"
                        style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.1 }}
                    >
                        We Build{' '}
                        <span className="gradient-text">Digital Experiences</span>{' '}
                        That Matter
                    </motion.h1>
                    <br></br>
                    {/* Tagline */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-[var(--text-secondary)] max-w-4xl mx-auto lg:mx-0 leading-relaxed"
                    >
                        Combining cutting-edge 3D, stunning web development, and creative strategy
                        to elevate your brand to the next level.
                    </motion.p>
                    <br></br>
                    {/* CTAs */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                    >
                        <motion.div whileHover="hover" whileTap="tap" variants={hoverButton}>
                            <Link href="#work" className="btn-primary group">
                                View Our Work
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>

                        <motion.div whileHover="hover" whileTap="tap" variants={hoverButton}>
                            <Link href="#contact" className="btn-secondary">
                                Start a Project
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border border-[var(--glass-border)] flex items-start justify-center p-2"
                >
                    <div className="w-1 h-2 rounded-full bg-[var(--accent-primary)]" />
                </motion.div>
            </motion.div>
        </section>
    );
}
