'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[var(--bg-primary)] text-center px-4 overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--accent-glow)] rounded-full blur-[100px] opacity-10 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent-purple-glow)] rounded-full blur-[100px] opacity-10 pointer-events-none" />

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <h2 className="text-[10rem] md:text-[15rem] font-display font-bold leading-none select-none">
                        <span className="gradient-text opacity-50">404</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-6 uppercase tracking-wider">
                        Trang không tồn tại
                    </h3>
                    <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-md mx-auto leading-relaxed">
                        Có vẻ như con đường bạn đang đi đã dẫn đến một khoảng không hư vô.
                        Đừng lo lắng, chúng tôi sẽ đưa bạn quay lại hành trình.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link href="/" className="btn-primary group relative overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                                Quay Lại Trang Chủ
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Noise Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Animated Grid Lines */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        </div>
    );
}
