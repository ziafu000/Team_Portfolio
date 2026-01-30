'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioItems, PortfolioItem } from '@/data/portfolio';
import { fadeInUp, staggerContainer, blurIn, scaleIn, hoverCard, hoverGlow } from '@/lib/motion';
import { PortfolioModal } from '@/components/ui';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const glowRef2 = useRef<HTMLDivElement>(null);

    const openModal = (project: PortfolioItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Parallax for top glow
            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    y: 150,
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

            // Parallax for secondary glow
            if (glowRef2.current) {
                gsap.to(glowRef2.current, {
                    y: -100,
                    x: -40,
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

            // Enhanced staggered portfolio card reveal - REPEATING
            if (cardsRef.current) {
                const cards = cardsRef.current.querySelectorAll('.portfolio-card');

                gsap.set(cards, {
                    y: 100,
                    opacity: 0,
                    scale: 0.85,
                    rotateY: 15,
                    transformPerspective: 1200,
                });

                gsap.to(cards, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    duration: 1.1,
                    stagger: 0.12,
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
        <section id="work" ref={sectionRef} className="section relative overflow-hidden bg-[var(--bg-secondary)]">
            {/* Multiple Background Glows like CTA */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/50 via-transparent to-[var(--bg-primary)]/50" />
                <div ref={glowRef} className="bg-glow-top" />
                <div ref={glowRef2} className="absolute bottom-0 right-0 w-[50%] h-[400px] bg-[radial-gradient(ellipse_at_center,var(--accent-purple-glow)_0%,transparent_70%)] opacity-40" />
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
                            Our Work
                        </span>
                    </motion.span>

                    <motion.h2
                        variants={blurIn}
                        className="font-display font-bold tracking-tight"
                        style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.1 }}
                    >
                        Selected <span className="gradient-text">Projects</span>
                    </motion.h2>

                    <motion.p variants={fadeInUp} className="section-subtitle mx-auto mt-6">
                        A showcase of our most impactful work across web, 3D, and creative campaigns.
                    </motion.p>
                </motion.div>

                {/* Portfolio Grid - GSAP handles animation */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {portfolioItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => openModal(item)}
                            className="portfolio-card relative group cursor-pointer"
                        >
                            <motion.div
                                whileHover="hover"
                                initial="initial"
                                variants={hoverCard}
                                className="glass-card relative overflow-hidden rounded-2xl h-full flex flex-col bg-[var(--bg-elevated)]/50 border-[var(--glass-border)] group-hover:border-[var(--accent-primary)]/50 transition-all duration-500"
                            >
                                <motion.div variants={hoverGlow} className="absolute inset-0 rounded-2xl pointer-events-none" />

                                {/* Image Placeholder with enhanced effects */}
                                <div className="relative bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-primary)] aspect-[4/3] overflow-hidden">
                                    {/* Animated gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/20 via-[var(--accent-secondary)]/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Category Icon with glow */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-7xl opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-700">
                                            {item.category === 'Web Development' ? '🌐' :
                                                item.category === '3D & Motion' ? '🎮' : '✨'}
                                        </span>
                                    </div>

                                    {/* View overlay */}
                                    <div className="absolute inset-0 bg-[var(--accent-primary)]/0 group-hover:bg-[var(--accent-primary)]/10 transition-colors duration-500 flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-medium text-sm uppercase tracking-wider">
                                            View Project
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-[var(--accent-light)] text-sm font-medium mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {item.category}
                                    </span>

                                    <h3 className="font-display font-semibold text-2xl mb-2 group-hover:text-[var(--accent-light)] transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                                        {item.description}
                                    </p>

                                    {/* Tags with enhanced styling */}
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs rounded-full glass border-[var(--glass-border)] opacity-60 group-hover:opacity-100 group-hover:border-[var(--accent-primary)]/30 transition-all duration-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Hint Text */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="mt-12 text-center"
                >
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[var(--text-muted)] text-xs uppercase tracking-[0.2em]"
                    >
                        Click project to view details
                    </motion.span>
                </motion.div>
            </div>

            {/* Pop-up Modal */}
            <PortfolioModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
}
