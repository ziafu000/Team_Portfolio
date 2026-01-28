'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp, staggerContainer, blurIn, hoverButton } from '@/lib/motion';

export default function CTA() {
    return (
        <section id="contact" className="section relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-primary)]/5 to-transparent" />
                <div className="bg-glow-top" />
                <div className="bg-glow-purple" />
            </div>

            <div className="container relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-16 align-center flex flex-col items-center"
                >
                    {/* Headline */}
                    <motion.h2
                        variants={blurIn}
                        className="font-display font-bold tracking-tight mb-6"
                        style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', lineHeight: 1.1 }}
                    >
                        Ready to Create Something{' '}
                        <span className="gradient-text">Extraordinary</span>?
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={fadeInUp}
                        className="section-subtitle"
                    >
                        Let&apos;s discuss your vision and bring it to life.
                        We&apos;re ready to make your next project unforgettable.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.div whileHover="hover" whileTap="tap" variants={hoverButton}>
                            <Link href="mailto:hello@team.agency" className="btn-primary text-lg px-8 py-4 group">
                                Start a Project
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>

                        <motion.div whileHover="hover" whileTap="tap" variants={hoverButton}>
                            <Link href="mailto:hello@team.agency" className="btn-secondary text-lg px-8 py-4">
                                hello@team.agency
                            </Link>
                        </motion.div>
                    </motion.div>
                    <br></br>
                    {/* Trust indicators */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[var(--text-muted)] border-t border-[var(--glass-border)] pt-8"
                    >
                        <div className="flex items-center gap-2 group cursor-default">
                            <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                                <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium">Quick Response</span>
                        </div>
                        <div className="flex items-center gap-2 group cursor-default">
                            <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                                <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium">Free Consultation</span>
                        </div>
                        <div className="flex items-center gap-2 group cursor-default">
                            <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                                <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium">Flexible Engagement</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
