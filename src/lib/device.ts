// Device and performance detection utilities

export type PerformanceTier = 'desktop' | 'mobile' | 'lite';

export interface TierConfig {
    dpr: number;
    shadows: boolean;
    postprocessing: boolean;
    fallback?: boolean;
}

export const tierConfigs: Record<PerformanceTier, TierConfig> = {
    desktop: { dpr: 2, shadows: true, postprocessing: true },
    mobile: { dpr: 1.5, shadows: false, postprocessing: false },
    lite: { dpr: 1, shadows: false, postprocessing: false, fallback: true }
};

export const getPerformanceTier = (): PerformanceTier => {
    if (typeof window === 'undefined') return 'desktop';

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    if (isMobile && isLowEnd) return 'lite';
    if (isMobile) return 'mobile';
    return 'desktop';
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
