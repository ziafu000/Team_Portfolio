'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Preloader from '@/components/ui/Preloader';

// Dynamic imports for client-only components that are optional/heavy
// These load after the main content is interactive
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
    ssr: false,
});

const NoiseOverlay = dynamic(() => import('@/components/ui/NoiseOverlay'), {
    ssr: false,
});

interface ClientProvidersProps {
    children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
    const [isIdle, setIsIdle] = useState(false);

    // Load optional effects after browser is idle
    useEffect(() => {
        // Use requestIdleCallback if available, otherwise setTimeout
        if ('requestIdleCallback' in window) {
            const id = window.requestIdleCallback(() => setIsIdle(true), { timeout: 2000 });
            return () => window.cancelIdleCallback(id);
        } else {
            const timeout = setTimeout(() => setIsIdle(true), 1000);
            return () => clearTimeout(timeout);
        }
    }, []);

    return (
        <SmoothScroll>
            <Preloader />
            {/* Only load decorative effects after browser is idle */}
            {isIdle && (
                <>
                    <NoiseOverlay />
                    <CustomCursor />
                </>
            )}
            {children}
        </SmoothScroll>
    );
}
