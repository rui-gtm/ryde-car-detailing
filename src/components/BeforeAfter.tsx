import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronsLeftRight } from "lucide-react";
import bmwWheelBefore from "@/assets/before-after/bmw-wheel-before.webp";
import bmwWheelAfter from "@/assets/before-after/bmw-wheel-after.webp";
import bmwExteriorBefore from "@/assets/before-after/bmw-exterior-before.webp";
import bmwExteriorAfter from "@/assets/before-after/bmw-exterior-after.webp";
import bmwInteriorBefore from "@/assets/before-after/bmw-interior-before.webp";
import bmwInteriorAfter from "@/assets/before-after/bmw-interior-after.webp";
import havalInteriorBefore from "@/assets/before-after/haval-interior-before.webp";
import havalInteriorAfter from "@/assets/before-after/haval-interior-after.webp";
import havalFootwellBefore from "@/assets/before-after/haval-footwell-before.webp";
import havalFootwellAfter from "@/assets/before-after/haval-footwell-after.webp";

// Each pair was shot by hand, so the "after" photo is aligned to the "before"
// and both are cropped to the same frame — dragging the handle reveals the
// same spot of the car, not a jump between two framings. Add a pair here and
// it gets its own number button automatically.
const PAIRS = [
  {
    id: "bmw-interior",
    label: "BMW Interior",
    before: bmwInteriorBefore,
    after: bmwInteriorAfter,
    alt: "BMW interior with seats, carpet and carbon trim",
  },
  {
    id: "bmw-wheel",
    label: "BMW Wheel",
    before: bmwWheelBefore,
    after: bmwWheelAfter,
    alt: "BMW alloy wheel and tyre",
  },
  {
    id: "bmw-exterior",
    label: "BMW Exterior",
    before: bmwExteriorBefore,
    after: bmwExteriorAfter,
    alt: "BMW 4 Series convertible in a car park",
  },
  {
    id: "haval-interior",
    label: "Haval Interior",
    before: havalInteriorBefore,
    after: havalInteriorAfter,
    alt: "Haval driver's door area with floor mat and seat",
  },
  {
    id: "haval-footwell",
    label: "Haval Footwell",
    before: havalFootwellBefore,
    after: havalFootwellAfter,
    alt: "Haval passenger footwell and floor mat",
  },
] as const;

const clamp = (n: number) => Math.min(100, Math.max(0, n));
const AUTO_ADVANCE_MS = 10000;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const BeforeAfter = () => {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const held = paused || focused;
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const sweep = useRef(0);
  const pair = PAIRS[active];

  // Every time a pair is shown, the handle glides in from the right to hint
  // that it can be dragged. Any touch on the slider cancels it.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos(50);
      return;
    }
    const start = performance.now();
    const from = 94;
    const to = 50;
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1100, 1);
      setPos(from + (to - from) * easeOutCubic(t));
      if (t < 1) sweep.current = requestAnimationFrame(tick);
    };
    setPos(from);
    sweep.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(sweep.current);
  }, [active]);

  // Move to the next example after 10 seconds. The timer restarts whenever the
  // example changes (including by clicking a number) and holds while the slider
  // is being dragged or focused, so it never switches under someone's finger.
  useEffect(() => {
    if (held) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % PAIRS.length), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, held]);

  const moveTo = (clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(clamp(((clientX - r.left) / r.width) * 100));
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(sweep.current);
    setPaused(true);
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
    setPaused(false);
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    cancelAnimationFrame(sweep.current);
    if (e.key === "ArrowLeft") setPos((p) => clamp(p - 5));
    if (e.key === "ArrowRight") setPos((p) => clamp(p + 5));
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  return (
    <div className="relative">
      {/* Soft glow of the current photo, spread across the full width behind the slider. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -top-10 left-1/2 w-screen -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      >
        <img
          key={pair.id}
          src={pair.after}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-40 blur-[60px] animate-fade-in"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[34rem]">
        <div
          ref={box}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-xl border border-white/25 bg-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
        >
          {/* After (base layer) */}
          <img
            key={`${pair.id}-after`}
            src={pair.after}
            alt={`${pair.alt}, after`}
            draggable={false}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Before (clipped to the left of the handle) */}
          <img
            key={`${pair.id}-before`}
            src={pair.before}
            alt={`${pair.alt}, before`}
            draggable={false}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          />

          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            Before
          </span>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            After
          </span>

          {/* Handle. A full-size track is slid with transform (a % of the
              track's own width = a % of the photo), rather than animating the
              handle's `left`, which counted as layout shift (CLS). */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ transform: `translateX(${pos}%)` }}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="Before and after comparison"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={onKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="pointer-events-auto absolute inset-y-0 left-0 -ml-px w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)] outline-none focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.6)]"
            >
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-ink/80 text-white shadow-lg backdrop-blur-sm">
                <ChevronsLeftRight className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>

        {/* Countdown to the next example */}
        <div className="mt-6 h-0.5 w-full overflow-hidden rounded-full bg-white/15" aria-hidden="true">
          <div
            key={`${active}-${held}`}
            className="ba-timer h-full origin-left bg-white/70"
            style={{ animationDuration: `${AUTO_ADVANCE_MS}ms`, animationPlayState: held ? "paused" : "running" }}
          />
        </div>

        {/* Numbers to pick which photo you see */}
        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3" role="group" aria-label="Choose a before and after example">
            {PAIRS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Example ${i + 1}: ${p.label}`}
                aria-pressed={i === active}
                className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold tabular-nums transition-all duration-200 active:scale-95 ${
                  i === active
                    ? "border-white bg-white text-ink"
                    : "border-white/30 bg-white/5 text-white hover:border-white/70 hover:bg-white/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {pair.label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
