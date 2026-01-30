'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data/services';
import { fadeInUp, staggerContainer, blurIn, scaleIn, hoverCard, hoverGlow } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const glowRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Parallax for main glow
            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    y: 120,
                    x: -50,
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

            // Second glow parallax (opposite direction)
            if (glowRef2.current) {
                gsap.to(glowRef2.current, {
                    y: -80,
                    x: 60,
                    scale: 1.2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                });
            }

            // Staggered card reveal - REPEATING animation
            if (cardsRef.current) {
                const cards = cardsRef.current.querySelectorAll('.service-card');

                gsap.set(cards, {
                    y: 80,
                    opacity: 0,
                    scale: 0.9,
                    rotateX: 20,
                    transformPerspective: 1000,
                });

                gsap.to(cards, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play reverse play reverse', // Repeat on scroll
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={sectionRef} className="section relative overflow-hidden">
            {/* Multiple Background Glows like CTA */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-primary)]/3 to-transparent" />
                <div ref={glowRef} className="bg-glow-purple" />
                <div ref={glowRef2} className="absolute top-0 left-0 w-[60%] h-[400px] bg-[radial-gradient(ellipse_at_center,var(--accent-glow)_0%,transparent_70%)] opacity-30" />
            </div>

            <div className="container relative z-10">
                {/* Section Header - REPEATING animations */}
                <motion.div
                    variants={staggerContainer}
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
                            What We Do
                        </span>
                    </motion.span>

                    <motion.h2
                        variants={blurIn}
                        className="font-display font-bold tracking-tight"
                        style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.1 }}
                    >
                        Services & <span className="gradient-text">Capabilities</span>
                    </motion.h2>

                    <motion.p variants={fadeInUp} className="section-subtitle mx-auto mt-6">
                        We combine technical excellence with creative vision to deliver exceptional digital solutions.
                    </motion.p>
                </motion.div>

                {/* Services Grid - GSAP handles animation */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3"
                >
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="service-card relative group"
                        >
                            <motion.div
                                whileHover="hover"
                                initial="initial"
                                variants={hoverCard}
                                className="glass-card p-6 md:p-8 h-full flex flex-col cursor-pointer bg-[var(--bg-elevated)]/50 border-[var(--glass-border)] group-hover:border-[var(--accent-primary)]/50 transition-all duration-500"
                            >
                                <motion.div variants={hoverGlow} className="absolute inset-0 rounded-2xl pointer-events-none" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 flex-shrink-0 shadow-lg shadow-[var(--accent-primary)]/20">
                                        {service.icon}
                                    </div>
                                    <h3 className="font-display font-semibold text-2xl group-hover:text-[var(--accent-light)] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-[var(--text-secondary)] text-md leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Decorative line */}
                                <div className="mt-auto pt-6">
                                    <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-500" />
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
