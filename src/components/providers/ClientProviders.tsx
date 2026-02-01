'use client';

import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Preloader from '@/components/ui/Preloader';

// Dynamic imports for client-only components that are optional/heavy
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
    return (
        <SmoothScroll>
            <Preloader />
            <NoiseOverlay />
            <CustomCursor />
            {children}
        </SmoothScroll>
    );
}
