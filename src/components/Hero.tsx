import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";
import { BUSINESS, GOOGLE_REVIEWS } from "@/data/business";
import GoogleG from "@/components/GoogleG";
import "@/hero.css";

// The hero acts out what the service does. The car starts under a dull film of
// road grime, then a bright wipe sweeps across it and leaves the paint clean
// and deep. After that, a soft highlight follows the cursor over the paint
// like showroom lighting. All motion is driven by CSS variables set on the
// section element, so nothing re-renders React while it runs.
const WIPE_MS = 2600;

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const delay = (d: string) => ({ ["--d" as string]: d });

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--wipe", "112");
      return;
    }

    let raf = 0;
    const start = performance.now() + 700;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / WIPE_MS, 0), 1);
      el.style.setProperty("--wipe", String(-14 + easeOutExpo(t) * 126));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Highlight + parallax follow the pointer (smoothed), fine pointers only.
    let tx = 0.5;
    let ty = 0.5;
    let cx = 0.5;
    let cy = 0.5;
    let loop = 0;
    const glide = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", `${cx * 100}%`);
      el.style.setProperty("--my", `${cy * 100}%`);
      el.style.setProperty("--px", String((cx - 0.5) * 2));
      el.style.setProperty("--py", String((cy - 0.5) * 2));
      loop = requestAnimationFrame(glide);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
    };
    if (window.matchMedia("(pointer: fine)").matches) {
      el.addEventListener("pointermove", onMove);
      loop = requestAnimationFrame(glide);
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loop);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      ref={root}
      className="hero relative flex min-h-[100dvh] flex-col overflow-hidden text-white"
      style={{ ["--wipe" as string]: -14 }}
    >
      {/* Layer 1: the car under road film */}
      <div className="hero-parallax hero-photo absolute inset-[-3%]">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="hero-zoom hero-dull absolute inset-0 h-full w-full object-cover object-[60%_center]"
          loading="eager"
          decoding="async"
          {...({ fetchpriority: "high" } as object)}
        />
        <div className="hero-grime absolute inset-0" />

        {/* Layer 2: the same car, clean, revealed by the wipe */}
        <div className="hero-clean absolute inset-0">
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="hero-zoom absolute inset-0 h-full w-full object-cover object-[60%_center]"
            decoding="async"
          />
          <div className="hero-spec absolute inset-0" />
        </div>
      </div>

      {/* The wipe edge */}
      <div className="hero-edge pointer-events-none absolute inset-y-0" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--ink)/0.05)_0%,hsl(var(--ink)/0.6)_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_62%,hsl(var(--ink)/0.75),transparent)]" />

      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container relative mx-auto flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-44 text-center lg:px-8">
        <a
          href={BUSINESS.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-fade group mb-8 inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/10 py-2.5 pl-3 pr-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition-colors hover:bg-white/15"
          style={delay("0.2s")}
          aria-label={`${GOOGLE_REVIEWS.rating.toFixed(1)} stars from ${GOOGLE_REVIEWS.count} Google reviews`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <GoogleG className="h-6 w-6" />
          </span>
          <span className="text-left">
            <span className="flex items-center gap-2">
              <span className="text-lg font-semibold leading-none">{GOOGLE_REVIEWS.rating.toFixed(1)}</span>
              <span className="flex gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
            </span>
            <span className="mt-1 block text-xs text-white/70">{GOOGLE_REVIEWS.count} Google reviews</span>
          </span>
        </a>

        <h1 className="mx-auto max-w-[48rem] [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
          <span className="hero-line block text-5xl font-medium leading-[1.02] tracking-tighter md:text-6xl">
            <span style={delay("0.4s")}>Mobile Car Detailing</span>
          </span>
          <span className="hero-line block text-5xl font-medium leading-[1.02] tracking-tighter md:text-7xl">
            <span className="hero-gleam" style={delay("1.6s")}>
              in Ryde, NSW
            </span>
          </span>
        </h1>

        <p className="hero-fade mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/80" style={delay("2.6s")}>
          Hand washing, full interior and exterior details and ceramic coating at your home or workplace, quoted up
          front and fully insured.
        </p>

        <div className="hero-fade mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={delay("2.9s")}>
          <Button size="lg" className="group h-12 gap-2 px-8 text-base" asChild>
            <Link to="/book">
              Get a Quote
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 border-white/30 bg-white/5 px-8 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            asChild
          >
            <Link to="/services">Explore Services</Link>
          </Button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
