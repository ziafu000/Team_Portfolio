'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { fadeInUp, staggerContainer, blurIn, scaleIn, hoverButton } from '@/lib/motion';
import Magnetic from '@/components/ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const glowRef2 = useRef<HTMLDivElement>(null);
    const gradientRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Parallax for top glow
            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    y: 100,
                    scale: 1.4,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                });
            }

            // Parallax for purple glow
            if (glowRef2.current) {
                gsap.to(glowRef2.current, {
                    y: -80,
                    x: -40,
                    scale: 1.3,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                });
            }

            // Subtle gradient pulse
            if (gradientRef.current) {
                gsap.to(gradientRef.current, {
                    opacity: 0.08,
                    ease: 'sine.inOut',
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" ref={sectionRef} className="section relative overflow-hidden">
            {/* Background Effects - Enhanced with GSAP */}
            <div className="absolute inset-0">
                <div ref={gradientRef} className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-primary)]/5 to-transparent" />
                <div ref={glowRef} className="bg-glow-top" />
                <div ref={glowRef2} className="bg-glow-purple" />
            </div>

            <div className="container relative z-10">
                {/* REPEATING animations */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-center mb-16 align-center flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.span
                        variants={scaleIn}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-[var(--glass-border)]"
                    >
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                        <span className="text-[var(--accent-primary)] font-display font-medium uppercase tracking-widest text-sm">
                            Get Started
                        </span>
                    </motion.span>

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
                        <Magnetic>
                            <motion.div whileHover="hover" whileTap="tap" variants={hoverButton}>
                                <Link href="mailto:hello@team.agency" className="btn-primary text-lg px-8 py-4 group shadow-lg shadow-[var(--accent-primary)]/20">
                                    Start a Project
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </motion.div>
                        </Magnetic>

                        <Magnetic>
                            <motion.div whileHover="hover" whileTap="tap" variants={hoverButton}>
                                <Link href="mailto:hello@team.agency" className="btn-secondary text-lg px-8 py-4">
                                    hello@team.agency
                                </Link>
                            </motion.div>
                        </Magnetic>
                    </motion.div>
                    <br></br>
                    {/* Trust indicators - Enhanced with repeating */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[var(--text-muted)] border-t border-[var(--glass-border)] pt-8"
                    >
                        {[
                            { icon: '⚡', label: 'Quick Response' },
                            { icon: '💬', label: 'Free Consultation' },
                            { icon: '🤝', label: 'Flexible Engagement' },
                        ].map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                viewport={{ once: false }}
                                className="flex items-center gap-2 group cursor-default"
                            >
                                <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)]/20 group-hover:scale-110 transition-all duration-300 text-lg">
                                    {item.icon}
                                </div>
                                <span className="text-sm font-medium group-hover:text-[var(--text-primary)] transition-colors duration-300">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
