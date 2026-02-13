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
    { href: '#services', label: 'Dịch vụ' },
    { href: '#work', label: 'Dự án' },
    { href: '#process', label: 'Quy trình' },
    { href: '#contact', label: 'Liên hệ' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-[var(--glass-border)] bg-[var(--bg-secondary)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/50 to-transparent pointer-events-none" />

            <div className="container relative z-10 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    {/* Brand - Spans 2 cols on tablet/desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center font-display font-bold text-lg text-white shadow-lg shadow-[var(--accent-primary)]/20 group-hover:shadow-[var(--accent-primary)]/40 transition-all duration-300">
                                R
                            </div>
                            <span className="font-display font-bold text-2xl tracking-tight group-hover:text-[var(--accent-light)] transition-colors">
                                RYAN 4B
                            </span>
                        </Link>
                        <p className="text-[var(--text-secondary)] max-w-sm mb-8 leading-relaxed">
                            Kiến tạo trải nghiệm số vượt trội thông qua thiết kế đổi mới và công nghệ tiên tiến. Đối tác tin cậy cho hành trình chuyển đổi số của bạn.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <h4 className="font-display font-bold text-lg mb-6 text-[var(--text-primary)]">Khám Phá</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[var(--text-secondary)] hover:text-[var(--accent-light)] transition-colors relative group py-1 block"
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 left-1/2 md:left-0 w-0 h-0.5 bg-[var(--accent-primary)] group-hover:w-full transition-all duration-300 -translate-x-1/2 md:translate-x-0" />
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
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <h4 className="font-display font-bold text-lg mb-6 text-[var(--text-primary)]">Kết Nối</h4>
                        <a
                            href="mailto:hello@team.agency"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent-light)] transition-colors mb-6 text-lg"
                        >
                            hello@team.agency
                        </a>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full glass border-[var(--glass-border)] flex items-center justify-center text-sm font-bold hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-[var(--text-muted)] text-sm">
                        © {currentYear} TEAM Agency. Bảo lưu mọi quyền.
                    </p>
                    <div className="flex gap-8 text-sm text-[var(--text-muted)]">
                        <Link href="#" className="hover:text-[var(--accent-light)] transition-colors">Điều khoản</Link>
                        <Link href="#" className="hover:text-[var(--accent-light)] transition-colors">Bảo mật</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
