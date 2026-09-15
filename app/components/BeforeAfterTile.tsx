"use client";

import { useRef, useState } from "react";

/**
 * One draggable before/after comparison. Ported from the technique proven
 * on Sharon Polish's site, where an earlier version stuttered on a phone
 * and was rebuilt around one rule: nothing is clipped and nothing is laid
 * out while the divider moves - only three layers slide.
 *
 * Recutting a clip-path repaints whatever is under it, and under this is a
 * large photograph squeezed into a box a third of a phone wide - no amount
 * of batching makes a repaint that size fit in a frame there. Instead the
 * "before" image sits inside a window with its overflow hidden. The window
 * slides right by --split and the photograph inside slides left by the
 * same amount, so the picture stays exactly where it is on screen while
 * the edge that exposes it travels - a transform the GPU composites with
 * no layout and no paint.
 *
 * The drag is read from the pointer directly rather than through a native
 * range input: a range maps a press to (x - thumbWidth/2) / (trackWidth -
 * thumbWidth), which only agrees with the finger at the exact centre and
 * will not move at all within half a thumb of either edge.
 */
export default function BeforeAfterTile({
  before,
  after,
  beforeAlt,
  afterAlt,
  caption,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ id: number; box: DOMRect; grabX: number; grabPct: number } | null>(null);

  function drive(clientX: number) {
    const d = drag.current;
    if (!d) return;
    const raw = d.grabPct + ((clientX - d.grabX) / d.box.width) * 100;
    const pct = raw < 0 ? 0 : raw > 100 ? 100 : raw;
    // Held against an edge, the anchor moves up to the finger - without
    // this, pushing past the end banks an invisible debt that has to be
    // dragged back through before the divider stirs again.
    if (raw !== pct) {
      d.grabX = clientX;
      d.grabPct = pct;
    }
    setSplit(pct);
  }

  return (
    <div className="select-none">
      <div
        ref={ref}
        role="slider"
        tabIndex={0}
        aria-label={`השוואת לפני ואחרי - ${caption}. הזיזו כדי לחשוף את הרצפה`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        style={{ "--split": `${split}%` } as React.CSSProperties}
        // pan-y looked like the right compromise - let a vertical finger
        // scroll natively, keep horizontal for the drag - but it means the
        // browser is still watching every gesture on this element for the
        // vertical component it is allowed to claim. The moment a drag
        // picks up a little vertical wobble, which every real thumb-drag
        // does, the browser takes the gesture and cancels the pointer
        // stream mid-stroke. none keeps the whole gesture on the element,
        // so the drag never gets interrupted; the trade is that a scroll
        // starting exactly on the photo will not pass through - the image
        // is a third of a phone screen in a page many screens long, so
        // there is no shortage of elsewhere to start a scroll from.
        className="group relative aspect-[4/5] w-full cursor-ew-resize overflow-hidden rounded-2xl border border-gold/25 bg-sand shadow-[0_12px_30px_rgba(0,0,0,0.08)] [touch-action:none]"
        onPointerDown={(e) => {
          if (e.button) return;
          const el = ref.current;
          if (!el) return;
          drag.current = { id: e.pointerId, box: el.getBoundingClientRect(), grabX: e.clientX, grabPct: split };
          try {
            el.setPointerCapture(e.pointerId);
          } catch {
            /* not fatal */
          }
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (drag.current?.id === e.pointerId) drive(e.clientX);
        }}
        onPointerUp={(e) => {
          if (drag.current?.id !== e.pointerId) return;
          drag.current = null;
          setDragging(false);
        }}
        onPointerCancel={(e) => {
          if (drag.current?.id !== e.pointerId) return;
          drag.current = null;
          setDragging(false);
        }}
        onLostPointerCapture={() => {
          drag.current = null;
          setDragging(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setSplit((v) => Math.max(0, v - 5));
          if (e.key === "ArrowRight") setSplit((v) => Math.min(100, v + 5));
        }}
      >
        {/* After: the full, undivided base layer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={after}
          alt={afterAlt}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />

        {/* Before: a window whose overflow hides everything but --split of
            it, sliding right as the picture inside slides left by the same
            amount - so the photo never moves, only the edge revealing it. */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ transform: "translateX(var(--split))" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={before}
            alt={beforeAlt}
            className="h-full w-full object-cover"
            style={{ transform: "translateX(calc(-1 * var(--split)))" }}
            loading="lazy"
          />
        </div>

        {/* Physical left, not the logical start: the layers above work in
            physical coordinates, and a logical property would resolve to
            the right edge in RTL - travelling opposite to the pointer. */}
        <div
          className="pointer-events-none absolute inset-y-0 z-[3] flex items-center justify-center"
          style={{ left: "var(--split)", width: 2 }}
        >
          <span className="absolute h-full w-0.5 bg-white shadow-[0_0_18px_rgba(0,0,0,0.7)]" />
          <span
            className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_22px_rgba(0,0,0,0.45)] transition-transform ${
              dragging ? "scale-95" : ""
            }`}
          >
            {/* Pointing outward - away from the handle, not at each other -
                so the pair reads as "drag either way" rather than a pinch. */}
            <span className="flex items-center gap-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </span>
          </span>
        </div>

        {/* Physical sides, matching the layers above: "לפני" tracks the
            portion the before-window has not yet covered, "אחרי" the part
            it has. A caption too narrow to read its own word fades rather
            than clips. */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 z-[2] py-2 text-center text-[13px] font-semibold tracking-wide text-white backdrop-blur-[4px] transition-opacity duration-150"
          style={{
            width: `calc(100% - var(--split))`,
            background: "rgba(20,18,14,0.55)",
            opacity: split > 86 ? 0 : 1,
          }}
        >
          לפני
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 z-[2] py-2 text-center text-[13px] font-semibold tracking-wide text-white transition-opacity duration-150"
          style={{
            width: "var(--split)",
            background: "linear-gradient(180deg,#CBA55C,#A37F34)",
            opacity: split < 14 ? 0 : 1,
          }}
        >
          אחרי
        </span>
      </div>
    </div>
  );
}
