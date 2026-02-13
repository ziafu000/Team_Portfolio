'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem, PortfolioSubItem } from '@/data/portfolio';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
import { useState, useEffect } from 'react';
import { useLenis } from '@/components/ui/SmoothScroll';

// Styles for category filter buttons - Edit these to customize appearance
const CATEGORY_STYLES = {
    active: 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg shadow-[var(--accent-primary)]/30 border-transparent',
    inactive: 'bg-white/5 border border-[var(--glass-border)] text-[var(--text-secondary)] hover:bg-white/10 hover:border-[var(--accent-primary)]/40 hover:text-[var(--text-primary)]'
};

interface PortfolioModalProps {
    project: PortfolioItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function PortfolioModal({ project, isOpen, onClose }: PortfolioModalProps) {
    const [selectedSubItem, setSelectedSubItem] = useState<PortfolioSubItem | null>(null);
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const lenis = useLenis();

    // Lock body scroll and pause Lenis when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            lenis?.stop();
        } else {
            document.body.style.overflow = '';
            lenis?.start();
        }

        return () => {
            document.body.style.overflow = '';
            lenis?.start();
        };
    }, [isOpen, lenis]);

    if (!project) return null;

    // Derive categories and filtered items
    const categories = ['Tất cả', ...Array.from(new Set(project.subItems?.map(item => item.category || 'Khác') || []))];
    const hasCategories = categories.length > 2;
    const filteredItems = activeCategory === 'Tất cả'
        ? project.subItems
        : project.subItems?.filter(item => (item.category || 'Khác') === activeCategory);

    // Helper to render a sub-item card
    const renderSubItemCard = (item: PortfolioSubItem) => (
        <motion.div
            key={item.id}
            variants={staggerItem}
            layoutId={`subitem-${item.id}`}
            onClick={() => setSelectedSubItem(item)}
            className="group relative rounded-2xl overflow-hidden aspect-video bg-[var(--bg-primary)] border border-[var(--glass-border)] cursor-zoom-in min-w-[85vw] md:min-w-[600px] snap-center shrink-0"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl opacity-10">🖼️</span>
            </div>

            {item.image && (
                <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            {item.video && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}

            {item.category && (
                <div className="absolute top-3 left-3 z-20">
                    <span className="px-2 py-1 text-[10px] uppercase tracking-wider rounded-md bg-black/50 backdrop-blur-sm text-white/90 border border-white/10">
                        {item.category}
                    </span>
                </div>
            )}

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 z-30">
                <span className="font-display font-medium text-center uppercase tracking-wider text-sm text-white">
                    {item.title}
                </span>
            </div>
        </motion.div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div key="modal-content" className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
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
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto overscroll-contain glass-card border-[var(--glass-border)] bg-[var(--bg-elevated)]/90 p-6 md:p-10 rounded-3xl custom-scrollbar"
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

                        {/* Category Tabs */}
                        {hasCategories && (
                            <div className="flex flex-wrap gap-3 mb-8">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`category-tab px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                            ? CATEGORY_STYLES.active
                                            : CATEGORY_STYLES.inactive
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Sub Items Scroll Container */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            key={activeCategory}
                            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 md:-mx-10 md:px-10 custom-scrollbar max-h-[50vh] overflow-y-auto"
                        >
                            {filteredItems?.map(renderSubItemCard)}
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

            {/* Lightbox for SubItem Zoom */}
            {selectedSubItem && (
                <div key="lightbox-view" className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedSubItem(null)}
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    <motion.div
                        layoutId={`subitem-${selectedSubItem.id}`}
                        className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none"
                    >
                        <div className="relative max-w-7xl max-h-[85vh] w-full h-full flex items-center justify-center pointer-events-auto">
                            {selectedSubItem.video ? (
                                <video
                                    src={selectedSubItem.video}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                                />
                            ) : selectedSubItem.image ? (
                                <img
                                    src={selectedSubItem.image}
                                    alt={selectedSubItem.title}
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                />
                            ) : (
                                <div className="w-full aspect-video bg-[var(--bg-primary)] flex items-center justify-center rounded-lg">
                                    <span className="text-6xl opacity-20">🖼️</span>
                                </div>
                            )}
                        </div>

                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 font-display text-xl md:text-2xl text-white pointer-events-auto"
                        >
                            {selectedSubItem.title}
                        </motion.h3>

                        <button
                            onClick={() => setSelectedSubItem(null)}
                            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors pointer-events-auto cursor-pointer"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
