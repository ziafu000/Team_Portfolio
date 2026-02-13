import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-primary)] text-center px-4">
            <h2 className="text-6xl font-display font-bold text-[var(--accent-primary)] mb-4">404</h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8">Không tìm thấy trang này.</p>
            <Link href="/" className="btn-primary">
                Về Trang Chủ
            </Link>
        </div>
    );
}
