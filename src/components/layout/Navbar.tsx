'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInDown, staggerContainer, hoverButton } from '@/lib/motion';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';

const navLinks = [
    { href: '#services', label: 'Dịch vụ' },
    { href: '#work', label: 'Dự án' },
    { href: '#process', label: 'Quy trình' },
    { href: '#contact', label: 'Liên hệ' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass py-3'
                : 'py-6'
                } bg-[var(--bg-primary)] md:bg-transparent`}
        >
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center font-display font-bold text-lg">
                        R
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight group-hover:text-[var(--accent-light)] transition-colors">
                        RYAN 4B
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="hidden md:flex items-center gap-8"
                >
                    {navLinks.map((link) => (
                        <Magnetic key={link.href}>
                            <motion.div variants={fadeInDown}>
                                <Link
                                    href={link.href}
                                    className="font-medium text-[var(--text-secondary)] hover:text-[var(--accent-light)] transition-colors relative group py-1 block"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-primary)] group-hover:w-full transition-all duration-300" />
                                </Link>
                            </motion.div>
                        </Magnetic>
                    ))}
                    <Magnetic>
                        <motion.div variants={fadeInDown}>
                            <Link
                                href="#contact"
                                className="btn-primary text-sm py-2 px-5 inline-block"
                            >
                                <motion.span
                                    whileHover="hover"
                                    whileTap="tap"
                                    variants={hoverButton}
                                    className="inline-block"
                                >
                                    Trò chuyện ngay
                                </motion.span>
                            </Link>
                        </motion.div>
                    </Magnetic>
                </motion.div>


                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-10 h-10 flex items-center justify-center relative z-50"
                    aria-label="Toggle menu"
                >
                    <div className="flex flex-col gap-1.5 w-6 items-end">
                        <motion.span
                            animate={{
                                rotate: mobileMenuOpen ? 45 : 0,
                                y: mobileMenuOpen ? 8 : 0,
                                width: mobileMenuOpen ? '100%' : '100%'
                            }}
                            className="h-0.5 bg-white block rounded-full"
                        />
                        <motion.span
                            animate={{
                                opacity: mobileMenuOpen ? 0 : 1,
                                width: mobileMenuOpen ? '0%' : '70%'
                            }}
                            className="h-0.5 bg-white block rounded-full"
                        />
                        <motion.span
                            animate={{
                                rotate: mobileMenuOpen ? -45 : 0,
                                y: mobileMenuOpen ? -8 : 0,
                                width: mobileMenuOpen ? '100%' : '100%'
                            }}
                            className="h-0.5 bg-white block rounded-full"
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={{
                    height: mobileMenuOpen ? 'auto' : 0,
                    opacity: mobileMenuOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden bg-[var(--bg-primary)] border-t border-[var(--glass-border)]"
            >
                <div className="container py-8 flex flex-col gap-6 text-center">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                                opacity: mobileMenuOpen ? 1 : 0,
                                y: mobileMenuOpen ? 0 : 10
                            }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-display font-medium text-xl py-2 hover:text-[var(--accent-light)] transition-colors inline-block"
                            >
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: mobileMenuOpen ? 1 : 0,
                            y: mobileMenuOpen ? 0 : 10
                        }}
                        transition={{ delay: navLinks.length * 0.05 }}
                    >
                        <Link
                            href="#contact"
                            className="btn-primary w-full max-w-xs mx-auto"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Trò chuyện ngay
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </motion.nav>
    );
}
