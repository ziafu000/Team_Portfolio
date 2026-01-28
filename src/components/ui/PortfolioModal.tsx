'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '@/data/portfolio';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

interface PortfolioModalProps {
    project: PortfolioItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function PortfolioModal({ project, isOpen, onClose }: PortfolioModalProps) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card border-[var(--glass-border)] bg-[var(--bg-elevated)]/90 p-6 md:p-10 rounded-3xl custom-scrollbar"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-[var(--accent-primary)] transition-colors z-10"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Header */}
                        <div className="mb-10">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-[var(--accent-light)] text-sm font-medium uppercase tracking-widest block mb-2"
                            >
                                {project.category}
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-display font-bold text-3xl md:text-5xl mb-4 gradient-text"
                            >
                                {project.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-[var(--text-secondary)] text-lg max-w-3xl"
                            >
                                {project.description}
                            </motion.p>
                        </div>

                        {/* Sub Items Grid */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {project.subItems?.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={staggerItem}
                                    className="group relative rounded-2xl overflow-hidden aspect-video bg-[var(--bg-primary)] border border-[var(--glass-border)]"
                                >
                                    {/* Placeholder Image */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 to-transparent" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl opacity-10">🖼️</span>
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                        <span className="font-display font-medium text-center uppercase tracking-wider text-sm">
                                            {item.title}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Optional: Add more placeholders if list is short */}
                            {(!project.subItems || project.subItems.length < 3) && [...Array(3)].map((_, i) => (
                                <motion.div
                                    key={`empty-${i}`}
                                    variants={staggerItem}
                                    className="rounded-2xl border border-dashed border-[var(--glass-border)] aspect-video flex items-center justify-center opacity-30"
                                >
                                    <span className="text-xs uppercase tracking-widest">Coming Soon</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Tags */}
                        <div className="mt-12 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-4 py-1 text-xs rounded-full glass border-[var(--glass-border)] text-[var(--text-secondary)] uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
