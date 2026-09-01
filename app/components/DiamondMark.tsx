/**
 * The Goldrock diamond as vector art: a brilliant cut split down the
 * middle, charcoal on the right, gold on the left. Drawn rather than
 * cropped from the brand artwork so it stays crisp at nav size, where
 * the original raster read as an indistinct blob.
 */
export default function DiamondMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 152"
      className={className}
      fill="none"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="gr-gold" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#F6E7B0" />
          <stop offset="35%" stopColor="#E3C260" />
          <stop offset="70%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#9A7833" />
        </linearGradient>
        <linearGradient id="gr-dark" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#54565A" />
          <stop offset="55%" stopColor="#33353A" />
          <stop offset="100%" stopColor="#1E2024" />
        </linearGradient>
        <clipPath id="clip-left">
          <rect x="0" y="0" width="100" height="152" />
        </clipPath>
        <clipPath id="clip-right">
          <rect x="100" y="0" width="100" height="152" />
        </clipPath>
      </defs>

      {/* Body, split so each half carries its own finish. */}
      <g>
        <path
          d="M50 18 H150 L192 62 L100 146 L8 62 Z"
          fill="url(#gr-dark)"
          clipPath="url(#clip-left)"
        />
        <path
          d="M50 18 H150 L192 62 L100 146 L8 62 Z"
          fill="url(#gr-gold)"
          clipPath="url(#clip-right)"
        />
      </g>

      {/* Facets. */}
      <g
        stroke="#14161A"
        strokeWidth="3.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      >
        <path d="M8 62 H192" />
        <path d="M50 18 L64 62" />
        <path d="M150 18 L136 62" />
        <path d="M100 18 V62" />
        <path d="M64 62 L100 146" />
        <path d="M136 62 L100 146" />
        <path d="M100 62 V146" />
      </g>

      {/* Outline. */}
      <path
        d="M50 18 H150 L192 62 L100 146 L8 62 Z"
        stroke="#14161A"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
