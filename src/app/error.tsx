'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-primary)] text-center px-4">
            <h2 className="text-4xl font-display font-bold text-[var(--accent-primary)] mb-4">Đã xảy ra lỗi!</h2>
            <p className="text-[var(--text-secondary)] mb-8">Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau.</p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="btn-primary"
            >
                Thử lại
            </button>
        </div>
    );
}
