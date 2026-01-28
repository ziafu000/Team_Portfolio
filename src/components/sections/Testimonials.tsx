'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

export default function Testimonials() {
    return (
        <section className="section relative overflow-hidden bg-[var(--bg-secondary)]">
            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        variants={fadeInUp}
                        className="text-[var(--accent-primary)] font-display font-medium uppercase tracking-widest text-sm"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2 variants={fadeInUp} className="section-title mt-3">
                        What Clients <span className="gradient-text">Say</span>
                    </motion.h2>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={staggerItem}
                            className="glass-card p-6 md:p-8"
                        >
                            {/* Quote */}
                            <div className="relative mb-6">
                                <span className="absolute -top-4 -left-2 text-6xl text-[var(--accent-primary)] opacity-20 font-serif">
                                    &ldquo;
                                </span>
                                <p className="text-[var(--text-secondary)] leading-relaxed relative z-10">
                                    {testimonial.quote}
                                </p>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                {/* Avatar Placeholder */}
                                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center font-display font-bold text-lg">
                                    {testimonial.name.charAt(0)}
                                </div>

                                <div>
                                    <h4 className="font-display font-semibold">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        {testimonial.role}, {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
