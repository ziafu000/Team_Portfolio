'use client';

import { motion } from 'framer-motion';
import { processSteps } from '@/data/process';
import { fadeInUp, staggerContainerSlow, perspectiveIn, hoverCard, hoverGlow } from '@/lib/motion';

export default function Process() {
    return (
        <section id="process" className="section relative overflow-hidden">
            {/* Background */}
            <div className="bg-glow-purple" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    variants={staggerContainerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-16 align-center flex flex-col items-center"
                >
                    <motion.span
                        variants={fadeInUp}
                        className="text-[var(--accent-primary)] font-display font-medium uppercase tracking-widest text-sm"
                    >
                        How We Work
                    </motion.span>
                    <motion.h2 variants={fadeInUp} className="section-title mt-3">
                        Our <span className="gradient-text">Process</span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
                        A proven methodology that ensures exceptional results every time.
                    </motion.p>
                </motion.div>

                {/* Process Grid */}
                <motion.div
                    variants={staggerContainerSlow}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3"
                >
                    {processSteps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            variants={perspectiveIn}
                            whileHover="hover"
                            initial="initial"
                            className="relative group"
                        >
                            {/* Connection Line - Mobile */}
                            {index < processSteps.length - 1 && (
                                <div className="lg:hidden absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-20" />
                            )}

                            <motion.div
                                variants={hoverCard}
                                className="glass-card p-6 md:p-8 h-full flex flex-col cursor-pointer relative z-10 bg-[var(--bg-elevated)]/50 border-[var(--glass-border)] group-hover:border-[var(--accent-primary)]/50 transition-colors"
                            >
                                <motion.div variants={hoverGlow} className="absolute inset-0 rounded-2xl pointer-events-none" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-display font-bold group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 flex-shrink-0">
                                        {step.id}
                                    </div>
                                    <h3 className="font-display font-semibold text-2xl group-hover:text-[var(--accent-light)] transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                </div>
                                <p className="text-[var(--text-secondary)] text-md leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
