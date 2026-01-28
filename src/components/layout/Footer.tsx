'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const socialLinks = [
    { href: 'https://twitter.com', label: 'Twitter', icon: '𝕏' },
    { href: 'https://instagram.com', label: 'Instagram', icon: 'IG' },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'in' },
    { href: 'https://behance.net', label: 'Behance', icon: 'Bē' },
];

const quickLinks = [
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Work' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative h-[200px] flex flex-col items-center justify-center border-t border-[var(--glass-border)] bg-[var(--bg-secondary)]">
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center font-display font-bold text-lg">
                                R
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight">
                                RYAN 4B
                            </span>
                        </Link>
                        <p className="text-[var(--text-secondary)] max-w-xs">
                            Crafting exceptional digital experiences through innovative design and cutting-edge technology.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="font-display font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--text-secondary)] hover:text-[var(--accent-light)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact & Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="font-display font-semibold mb-4">Get In Touch</h4>
                        <a
                            href="mailto:hello@team.agency"
                            className="text-[var(--accent-light)] hover:underline block mb-4"
                        >
                            hello@team.agency
                        </a>
                        <div className="flex gap-3">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-sm font-bold hover:bg-[var(--accent-primary)] transition-all"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[var(--text-muted)] text-sm">
                        © {currentYear} TEAM Agency. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
