'use client';

import { motion } from 'framer-motion';
import { services } from '@/data/services';
import { fadeInUp, staggerContainer, perspectiveIn, hoverCard, hoverGlow } from '@/lib/motion';

export default function Services() {
    return (
        <section id="services" className="section relative overflow-hidden">
            {/* Background glow */}
            <div className="bg-glow-purple" />

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
                        What We Do
                    </motion.span>
                    <motion.h2 variants={fadeInUp} className="section-title mt-3">
                        Services & <span className="gradient-text">Capabilities</span>
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="section-subtitle mx-auto">
                        We combine technical excellence with creative vision to deliver exceptional digital solutions.
                    </motion.p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={perspectiveIn}
                            whileHover="hover"
                            initial="initial"
                            className="relative group"
                        >
                            <motion.div
                                variants={hoverCard}
                                className="glass-card p-6 md:p-8 h-full flex flex-col cursor-pointer bg-[var(--bg-elevated)]/50 border-[var(--glass-border)] group-hover:border-[var(--accent-primary)]/50 transition-colors"
                            >
                                <motion.div variants={hoverGlow} className="absolute inset-0 rounded-2xl pointer-events-none" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 flex-shrink-0">
                                        {service.icon}
                                    </div>
                                    <h3 className="font-display font-semibold text-2xl group-hover:text-[var(--accent-light)] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-[var(--text-secondary)] text-md leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
