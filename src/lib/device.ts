// Device and performance detection utilities

export type PerformanceTier = 'desktop' | 'mobile' | 'lite';

export interface TierConfig {
    dpr: number;
    shadows: boolean;
    postprocessing: boolean;
    particles: number;
    floatingElements: number;
    fallback?: boolean;
}

export const tierConfigs: Record<PerformanceTier, TierConfig> = {
    desktop: {
        dpr: 2,
        shadows: true,
        postprocessing: true,
        particles: 80,
        floatingElements: 8,
    },
    mobile: {
        dpr: 1.5,
        shadows: false,
        postprocessing: false,
        particles: 40,
        floatingElements: 4,
    },
    lite: {
        dpr: 1,
        shadows: false,
        postprocessing: false,
        particles: 20,
        floatingElements: 2,
        fallback: true,
    }
};

// Cached tier result
let cachedTier: PerformanceTier | null = null;

export const getPerformanceTier = (): PerformanceTier => {
    if (typeof window === 'undefined') return 'desktop';

    // Return cached result if available
    if (cachedTier !== null) return cachedTier;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowCPU = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    // Check device memory (if available)
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const isLowMemory = deviceMemory ? deviceMemory <= 4 : false;

    // Check connection speed (if available)
    const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
    const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';

    // Try to detect GPU capability
    let isLowGPU = false;
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl && gl instanceof WebGLRenderingContext) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
                // Check for integrated/low-end GPUs
                isLowGPU = renderer.includes('intel') && !renderer.includes('iris');
            }
        }
    } catch {
        // Ignore GPU detection errors
    }

    // Determine tier
    if (isMobile && (isLowCPU || isLowMemory || isSlowConnection)) {
        cachedTier = 'lite';
    } else if (isMobile) {
        cachedTier = 'mobile';
    } else if (isLowCPU || isLowMemory || isLowGPU) {
        cachedTier = 'mobile'; // Treat low-end desktop as mobile tier
    } else {
        cachedTier = 'desktop';
    }

    return cachedTier;
};

export const getTierConfig = (): TierConfig => {
    const tier = getPerformanceTier();
    return tierConfigs[tier];
};

export const isMobile = (): boolean => {
    if (typeof window === 'undefined') return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const prefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Utility to clamp DPR based on device
export const getOptimalDpr = (): number => {
    if (typeof window === 'undefined') return 2;
    const tier = getPerformanceTier();
    const maxDpr = tierConfigs[tier].dpr;
    return Math.min(window.devicePixelRatio, maxDpr);
};

// Check if we should disable heavy effects
export const shouldDisableHeavyEffects = (): boolean => {
    if (typeof window === 'undefined') return false;

    const tier = getPerformanceTier();
    const prefersReduced = prefersReducedMotion();

    return tier === 'lite' || prefersReduced;
};
