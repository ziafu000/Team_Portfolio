'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Disable scroll while loading
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = '';
            window.scrollTo(0, 0);
        }, 2000);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        }
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0c0a09]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="relative overflow-hidden">
                        <motion.h1
                            className="text-6xl md:text-9xl font-bold font-display text-white tracking-tighter"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                        >
                            TEAM
                        </motion.h1>
                        <motion.div
                            className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
