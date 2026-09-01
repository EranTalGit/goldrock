/**
 * The Goldrock diamond as vector art: a brilliant cut in gold with just
 * enough facets to read as a cut stone. Drawn rather than photographed
 * because at nav size a rendered gem turns to noise - the sparkle and
 * refraction swallow the silhouette, which is the one thing a mark has
 * to keep.
 */
export default function DiamondMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      fill="none"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="dm-gold" x1="0.15" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#F7E9B4" />
          <stop offset="30%" stopColor="#E6C868" />
          <stop offset="62%" stopColor="#C9A45C" />
          <stop offset="100%" stopColor="#A07C36" />
        </linearGradient>
        <linearGradient id="dm-crown" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#FBF1CE" />
          <stop offset="100%" stopColor="#DCBB63" />
        </linearGradient>
      </defs>

      {/* Pavilion and crown as one body. */}
      <path
        d="M52 20 H148 L192 66 L100 150 L8 66 Z"
        fill="url(#dm-gold)"
      />
      {/* Brighter crown so the stone reads as cut, not flat. */}
      <path d="M52 20 H148 L192 66 H8 Z" fill="url(#dm-crown)" opacity="0.95" />

      {/* Minimal facets - any more turns to mush at 46px. */}
      <g
        stroke="#8A6A2A"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.75"
      >
        <path d="M8 66 H192" />
        <path d="M52 20 L68 66" />
        <path d="M148 20 L132 66" />
        <path d="M68 66 L100 150" />
        <path d="M132 66 L100 150" />
      </g>

      {/* Outline holds the silhouette together at small sizes. */}
      <path
        d="M52 20 H148 L192 66 L100 150 L8 66 Z"
        stroke="#7A5C22"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
