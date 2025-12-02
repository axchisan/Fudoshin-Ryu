// Japanese Torii Gate - Traditional decorative element
export function ToriiGate({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Horizontal top beam (Noki) */}
      <rect x="30" y="60" width="140" height="12" fill="currentColor" />

      {/* Vertical support beams (Hasira) - Left */}
      <rect x="40" y="65" width="16" height="140" fill="currentColor" />

      {/* Vertical support beams (Hasira) - Right */}
      <rect x="144" y="65" width="16" height="140" fill="currentColor" />

      {/* Cross beam (Nuki) - adds traditional look */}
      <rect x="35" y="130" width="130" height="8" fill="currentColor" opacity="0.6" />

      {/* Upper decorative panels (Gassho) */}
      <rect x="32" y="40" width="136" height="20" fill="currentColor" opacity="0.3" rx="2" />

      {/* Bottom base decoration */}
      <rect x="25" y="200" width="150" height="4" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
