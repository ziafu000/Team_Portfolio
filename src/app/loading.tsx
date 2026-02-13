export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[var(--bg-primary)]">
            <div className="w-12 h-12 rounded-full border-4 border-[var(--accent-primary)] border-t-transparent animate-spin" />
        </div>
    );
}
