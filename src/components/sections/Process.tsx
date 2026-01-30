'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '@/data/process';
import { fadeInUp, staggerContainerSlow, blurIn, scaleIn, hoverCard, hoverGlow } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const glowRef2 = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Parallax for main glow
            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    y: 100,
                    x: 30,
                    scale: 1.25,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                });
            }

            // Secondary glow parallax
            if (glowRef2.current) {
                gsap.to(glowRef2.current, {
                    y: -60,
                    x: -40,
                    scale: 1.15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                });
            }

            // Animated connection line (desktop only) - REPEATING
            if (lineRef.current && window.innerWidth >= 1024) {
                gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });

                gsap.to(lineRef.current, {
                    scaleX: 1,
                    opacity: 0.3,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 70%',
                        end: 'top 30%',
                        toggleActions: 'play reverse play reverse', // Repeat
                    },
                });
            }

            // Enhanced staggered card reveal - REPEATING
            if (cardsRef.current) {
                const cards = cardsRef.current.querySelectorAll('.process-card');

                gsap.set(cards, {
                    y: 80,
                    opacity: 0,
                    scale: 0.88,
                    rotateX: 25,
                    transformPerspective: 1000,
                });

                gsap.to(cards, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.18,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play reverse play reverse', // Repeat
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="process" ref={sectionRef} className="section relative overflow-hidden">
            {/* Multiple Background Glows like CTA */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-secondary)]/5 to-transparent" />
                <div ref={glowRef} className="bg-glow-purple" />
                <div ref={glowRef2} className="absolute top-1/4 left-0 w-[50%] h-[350px] bg-[radial-gradient(ellipse_at_center,var(--accent-glow)_0%,transparent_70%)] opacity-25" />
            </div>

            <div className="container relative z-10">
                {/* Section Header - REPEATING animations */}
                <motion.div
                    variants={staggerContainerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-center mb-16 align-center flex flex-col items-center"
                >
                    <motion.span
                        variants={scaleIn}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-[var(--glass-border)]"
                    >
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                        <span className="text-[var(--accent-primary)] font-display font-medium uppercase tracking-widest text-sm">
                            How We Work
                        </span>
                    </motion.span>

                    <motion.h2
                        variants={blurIn}
                        className="font-display font-bold tracking-tight"
                        style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.1 }}
                    >
                        Our <span className="gradient-text">Process</span>
                    </motion.h2>

                    <motion.p variants={fadeInUp} className="section-subtitle mx-auto mt-6">
                        A proven methodology that ensures exceptional results every time.
                    </motion.p>
                </motion.div>

                {/* Connection Line (Desktop) */}
                <div
                    ref={lineRef}
                    className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 origin-left pointer-events-none"
                    style={{ transform: 'translateY(-50%)' }}
                />

                {/* Process Grid */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3 relative"
                >
                    {processSteps.map((step, index) => (
                        <div
                            key={step.id}
                            className="process-card relative group"
                        >
                            {/* Connection Line - Mobile */}
                            {index < processSteps.length - 1 && (
                                <div className="lg:hidden absolute left-7 top-20 w-0.5 h-[calc(100%-2rem)] bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-20" />
                            )}

                            <motion.div
                                whileHover="hover"
                                initial="initial"
                                variants={hoverCard}
                                className="glass-card p-6 md:p-8 h-full flex flex-col cursor-pointer relative z-10 bg-[var(--bg-elevated)]/50 border-[var(--glass-border)] group-hover:border-[var(--accent-primary)]/50 transition-all duration-500"
                            >
                                <motion.div variants={hoverGlow} className="absolute inset-0 rounded-2xl pointer-events-none" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-display font-bold group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 flex-shrink-0 shadow-lg shadow-[var(--accent-primary)]/20 relative">
                                        {step.id}
                                        {/* Pulse ring on hover */}
                                        <div className="absolute inset-0 rounded-2xl border-2 border-[var(--accent-primary)] opacity-0 group-hover:opacity-50 group-hover:scale-125 transition-all duration-500" />
                                    </div>
                                    <h3 className="font-display font-semibold text-2xl group-hover:text-[var(--accent-light)] transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                </div>
                                <p className="text-[var(--text-secondary)] text-md leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Arrow indicator */}
                                <div className="mt-auto pt-6 flex justify-end">
                                    <svg
                                        className="w-5 h-5 text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
