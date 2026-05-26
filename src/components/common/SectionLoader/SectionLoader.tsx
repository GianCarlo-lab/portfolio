export function SectionLoader() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: '400px' }}
      aria-label="Cargando sección"
      role="status"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
      >
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="rgba(99,102,241,0.15)"
          strokeWidth="3"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="#6366F1"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="60 40"
          style={{ transformOrigin: '50% 50%', animation: 'spin 1s linear infinite' }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </svg>
    </div>
  )
}
