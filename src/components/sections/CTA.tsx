'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeInUp, staggerContainer, blurIn, scaleIn, hoverButton } from '@/lib/motion';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    scale: 1.2,
                    y: 50,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="section relative overflow-hidden flex items-center justify-center min-h-[60vh]"
        >
            {/* Background with optimized gradient */}
            <div className="absolute inset-0 bg-[var(--bg-primary)]">
                <div ref={bgRef} className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,var(--accent-primary)_0%,transparent_70%)] blur-[120px]" />
                </div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            <div className="container relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-16 align-center flex flex-col items-center"
                >
                    <motion.h2
                        variants={blurIn}
                        className="font-display font-bold mb-8"
                        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}
                    >
                        Sẵn sàng bắt đầu? <br />
                        <span className="gradient-text">Cùng nhau tạo nên những điều phi thường.</span>
                    </motion.h2>

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Magnetic>
                            <motion.div whileHover="hover" whileTap="tap" variants={hoverButton}>
                                <a href="mailto:contact@example.com" className="px-8 py-4 rounded-full category-tab bg-[var(--accent-primary)] text-white font-medium hover:scale-105 transition-transform shadow-lg shadow-[var(--accent-primary)]/25 w-full sm:w-auto min-w-[160px] inline-block">
                                    Bắt Đầu Dự Án
                                </a>
                            </motion.div>
                        </Magnetic>
                        <Magnetic>
                            <motion.div whileHover="hover" whileTap="tap" variants={hoverButton}>
                                <a href="mailto:contact@example.com" className="px-8 py-4 rounded-full glass border-[var(--glass-border)] hover:bg-white/10 transition-colors w-full sm:w-auto min-w-[160px] inline-block">
                                    Liên Hệ
                                </a>
                            </motion.div>
                        </Magnetic>
                    </motion.div>

                    {/* Trust indicators - Enhanced with repeating */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[var(--text-muted)] border-t border-[var(--glass-border)] pt-8"
                    >
                        {[
                            { icon: '⚡', label: 'Phản Hồi Nhanh' },
                            { icon: '💬', label: 'Định Hướng Kết Quả' },
                            { icon: '🤝', label: 'Minh Bạch Rõ Ràng' },
                        ].map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                viewport={{ once: true }}
                                className="flex items-center gap-2 group cursor-default"
                            >
                                <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)]/20 group-hover:scale-110 transition-all duration-300 text-lg">
                                    {item.icon}
                                </div>
                                <span className="text-sm font-medium group-hover:text-[var(--text-primary)] transition-colors duration-300">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
