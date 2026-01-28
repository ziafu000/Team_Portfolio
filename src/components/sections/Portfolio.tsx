'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioItems, PortfolioItem } from '@/data/portfolio';
import { fadeInUp, staggerContainer, perspectiveIn, hoverCard, hoverGlow } from '@/lib/motion';
import { PortfolioModal } from '@/components/ui';

export default function Portfolio() {
    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (project: PortfolioItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Restore scrolling
        document.body.style.overflow = 'auto';
    };

    return (
        <section id="work" className="section relative overflow-hidden bg-[var(--bg-secondary)]">
            {/* Background glow */}
            <div className="bg-glow-top" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-16 align-center flex flex-col items-center"
                >
                    <motion.span
                        variants={fadeInUp}
                        className="text-[var(--accent-primary)] font-display font-medium uppercase tracking-widest text-sm"
                    >
                        Our Work
                    </motion.span>
                    <motion.h2 variants={fadeInUp} className="section-title mt-3">
                        Selected <span className="gradient-text">Projects</span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
                        A showcase of our most impactful work across web, 3D, and creative campaigns.
                    </motion.p>
                </motion.div>

                {/* Portfolio Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {portfolioItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            variants={perspectiveIn}
                            whileHover="hover"
                            initial="initial"
                            onClick={() => openModal(item)}
                            className="relative group cursor-pointer"
                        >
                            <motion.div
                                variants={hoverCard}
                                className="glass-card relative overflow-hidden rounded-2xl h-full flex flex-col bg-[var(--bg-elevated)]/50 border-[var(--glass-border)] group-hover:border-[var(--accent-primary)]/50 transition-colors"
                            >
                                <motion.div variants={hoverGlow} className="absolute inset-0 rounded-2xl pointer-events-none" />

                                {/* Image Placeholder */}
                                <div className="relative bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-primary)] aspect-[4/3] overflow-hidden">
                                    {/* Gradient overlay for placeholder */}
                                    <div className="absolute inset-1 bg-gradient-to-br from-[var(--accent-primary)]/20 via-[var(--accent-secondary)]/20 to-transparent glass-card" />

                                    {/* Category Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <span className="text-6xl opacity-20">
                                            {item.category === 'Web Development' ? '🌐' :
                                                item.category === '3D & Motion' ? '🎮' : '✨'}
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

                                    {/* Tags */}
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs rounded-full glass border-[var(--glass-border)] opacity-60 group-hover:opacity-100 transition-opacity"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Hint Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-12 text-center"
                >
                    <span className="text-[var(--text-muted)] text-xs uppercase tracking-[0.2em] animate-pulse">
                        Click project to view details
                    </span>
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
