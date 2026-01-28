'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInDown, staggerContainer, hoverButton } from '@/lib/motion';
import Link from 'next/link';

const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Work' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-6'
                }`}
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
                        <motion.div key={link.href} variants={fadeInDown}>
                            <Link
                                href={link.href}
                                className="font-medium text-[var(--text-secondary)] hover:text-[var(--accent-light)] transition-colors relative group py-1"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-primary)] group-hover:w-full transition-all duration-300" />
                            </Link>
                        </motion.div>
                    ))}
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
                                Let&apos;s Talk
                            </motion.span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-10 h-10 flex items-center justify-center"
                    aria-label="Toggle menu"
                >
                    <div className="flex flex-col gap-1.5">
                        <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
                className="md:hidden overflow-hidden glass"
            >
                <div className="container py-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-medium text-lg py-2 hover:text-[var(--accent-light)] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        className="btn-primary mt-2"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Let&apos;s Talk
                    </Link>
                </div>
            </motion.div>
        </motion.nav>
    );
}
