'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/data/testimonials';
import { fadeInUp, staggerContainer, blurIn, scaleIn, staggerItem } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
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
                    y: 80,
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

            // Secondary glow parallax
            if (glowRef2.current) {
                gsap.to(glowRef2.current, {
                    y: -60,
                    x: 30,
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

            // Enhanced staggered card reveal - REPEATING
            if (cardsRef.current) {
                const cards = cardsRef.current.querySelectorAll('.testimonial-card');

                gsap.set(cards, {
                    y: 70,
                    opacity: 0,
                    scale: 0.92,
                    rotateX: 15,
                    transformPerspective: 1000,
                });

                gsap.to(cards, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    duration: 0.9,
                    stagger: 0.12,
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
        <section ref={sectionRef} className="section relative overflow-hidden bg-[var(--bg-secondary)]">
            {/* Multiple Background Glows like CTA */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/30 via-transparent to-[var(--bg-primary)]/30" />
                <div ref={glowRef} className="absolute top-0 left-1/4 w-[60%] h-[400px] bg-[radial-gradient(ellipse_at_center,var(--accent-glow)_0%,transparent_70%)] opacity-25" />
                <div ref={glowRef2} className="absolute bottom-0 right-1/4 w-[50%] h-[350px] bg-[radial-gradient(ellipse_at_center,var(--accent-purple-glow)_0%,transparent_70%)] opacity-30" />
            </div>

            <div className="container relative z-10">
                {/* Section Header - REPEATING animations */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-center mb-16 flex flex-col items-center"
                >
                    <motion.span
                        variants={scaleIn}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-[var(--glass-border)]"
                    >
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                        <span className="text-[var(--accent-primary)] font-display font-medium uppercase tracking-widest text-sm">
                            Testimonials
                        </span>
                    </motion.span>

                    <motion.h2
                        variants={blurIn}
                        className="font-display font-bold tracking-tight"
                        style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.1 }}
                    >
                        What Clients <span className="gradient-text">Say</span>
                    </motion.h2>

                    <motion.p variants={fadeInUp} className="section-subtitle mx-auto mt-6">
                        Don&apos;t just take our word for it. Hear from the clients we&apos;ve helped succeed.
                    </motion.p>
                </motion.div>

                {/* Testimonials Grid - GSAP handles animation */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className="testimonial-card group"
                        >
                            <div className="glass-card p-6 md:p-8 h-full relative bg-[var(--bg-elevated)]/50 border-[var(--glass-border)] group-hover:border-[var(--accent-primary)]/50 transition-all duration-500">
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,var(--accent-glow)_0%,transparent_70%)] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

                                {/* Quote with enhanced styling */}
                                <div className="relative mb-6">
                                    <span className="absolute -top-4 -left-2 text-7xl text-[var(--accent-primary)] opacity-20 font-serif group-hover:opacity-40 transition-opacity duration-500">
                                        &ldquo;
                                    </span>
                                    <p className="text-[var(--text-secondary)] leading-relaxed relative z-10 group-hover:text-[var(--text-primary)] transition-colors duration-500">
                                        {testimonial.quote}
                                    </p>
                                </div>

                                {/* Rating stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-4 h-4 text-[var(--accent-primary)] opacity-60 group-hover:opacity-100 transition-all duration-300"
                                            style={{ transitionDelay: `${i * 50}ms` }}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Author with enhanced avatar */}
                                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[var(--glass-border)]">
                                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center font-display font-bold text-lg shadow-lg shadow-[var(--accent-primary)]/20 group-hover:scale-110 transition-transform duration-500">
                                        {testimonial.name.charAt(0)}
                                    </div>

                                    <div>
                                        <h4 className="font-display font-semibold group-hover:text-[var(--accent-light)] transition-colors duration-300">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-[var(--text-muted)]">
                                            {testimonial.role}, {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
