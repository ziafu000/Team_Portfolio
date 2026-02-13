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
        <section className="hero-section-wrapper relative min-h-screen flex items-start lg:items-center overflow-hidden">
            {/* Background Effects */}
            <div className="hero-gradient-bg" />
            <div className="bg-grid absolute inset-0 opacity-30" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-8 items-center">
                    {/* Content Section */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={perspectiveIn}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 mx-auto lg:mx-0 border-[var(--glass-border)]"
                        >
                            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                            <span className="text-sm text-[var(--text-secondary)] font-medium tracking-wide">
                                Studio Sáng Tạo Số
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={blurIn}
                            className="font-display font-bold tracking-tight mb-6"
                            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
                        >
                            Chúng Tôi Kiến Tạo{' '}
                            <span className="gradient-text">Trải Nghiệm Số</span>{' '}
                            Đầy Ý Nghĩa
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8"
                        >
                            Kết hợp công nghệ 3D tiên tiến, thiết kế web ấn tượng và chiến lược sáng tạo để nâng tầm thương hiệu của bạn.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <motion.div whileHover="hover" whileTap="tap" variants={hoverButton}>
                                <Link href="#work" className="btn-primary group">
                                    Xem Dự Án
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </motion.div>

                            <motion.div whileHover="hover" whileTap="tap" variants={hoverButton}>
                                <Link href="#contact" className="btn-secondary">
                                    Bắt Đầu Dự Án
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* 3D Scene Section - Positioned Right on Desktop, Below on Mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full"
                    >
                        <Scene modelPath="/models/team-icon.glb" />

                        {/* Decorative elements around model */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-[-1]">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle,var(--accent-primary)_0%,transparent_70%)] opacity-10 blur-3xl animate-pulse-glow" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
                    Cuộn xuống
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
