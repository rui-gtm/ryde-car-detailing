import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-bmw-interior.webp";
import { BUSINESS, GOOGLE_REVIEWS } from "@/data/business";
import GoogleG from "@/components/GoogleG";
import "@/hero.css";

// The hero acts out what the service does: the photo starts under a dull film
// of road grime, then a single quick wipe sweeps across and leaves it clean.
// Nothing else in the background moves — no zoom, no cursor parallax. The wipe
// is driven by a CSS variable set on the section, so React never re-renders
// while it runs.
const WIPE_DELAY_MS = 250;
const WIPE_MS = 1700;

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

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
    const start = performance.now() + WIPE_DELAY_MS;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / WIPE_MS, 0), 1);
      el.style.setProperty("--wipe", String(-14 + easeOutQuart(t) * 126));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={root}
      className="hero relative flex min-h-[100dvh] flex-col overflow-hidden text-white"
      style={{ ["--wipe" as string]: -14 }}
    >
      {/* Layer 1: the photo under road film */}
      <div className="hero-photo absolute inset-0">
        <img
          src={heroImage}
          width={2048}
          height={1152}
          alt=""
          aria-hidden="true"
          className="hero-dull absolute inset-0 h-full w-full object-cover object-[50%_12%]"
          loading="eager"
          decoding="async"
          {...({ fetchpriority: "high" } as object)}
        />
        <div className="hero-grime absolute inset-0" />

        {/* Layer 2: the same photo, clean, revealed by the wipe */}
        <div className="hero-clean absolute inset-0">
          <img
            src={heroImage}
            width={2048}
            height={1152}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[50%_12%]"
            decoding="async"
          />
        </div>
      </div>

      {/* The wipe edge */}
      <div className="hero-edge pointer-events-none absolute inset-y-0" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--ink)/0.05)_0%,hsl(var(--ink)/0.6)_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_62%,hsl(var(--ink)/0.75),transparent)]" />

      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 via-ink/30 to-transparent" aria-hidden="true" />
      <div className="container relative mx-auto flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-44 text-center lg:px-8">
        <a
          href={BUSINESS.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-fade group mb-8 inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/10 py-2.5 pl-3 pr-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition-colors hover:bg-white/15"
          style={delay("0.1s")}
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
            <span style={delay("0.2s")}>Mobile Car Detailing</span>
          </span>{" "}
          <span className="hero-line block text-5xl font-medium leading-[1.02] tracking-tighter md:text-6xl">
            <span className="hero-gleam" style={delay("0.32s")}>
              in Ryde, NSW
            </span>
          </span>
        </h1>

        <p className="hero-fade mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/80" style={delay("0.5s")}>
          Hand washing, full interior and exterior details and ceramic coating at your home or workplace, quoted up
          front and fully insured.
        </p>

        <div className="hero-fade mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={delay("0.62s")}>
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
