import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check, MapPin, Star } from "lucide-react";
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

const WHY_CHOOSE_US = [
  "We come to you — save time",
  "Premium products for a lasting finish",
  "Fast, reliable, friendly detailers",
  "Clear pricing with no surprises",
];

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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/85 via-ink/45 to-transparent" aria-hidden="true" />
      {/* On phones everything should fit in one screen between the fixed header
          (~80px) and the fixed Call / Get a Quote bar (56px), so spacing and
          type are tightened below sm. */}
      <div className="container relative mx-auto flex flex-1 flex-col items-center justify-center px-4 pb-20 pt-24 text-center sm:pb-16 sm:pt-44 lg:px-8">
        <a
          href={BUSINESS.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-fade group mb-5 inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-2 pr-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition-colors hover:bg-white/15 sm:mb-8 sm:gap-4 sm:py-2.5 sm:pl-3 sm:pr-6"
          style={delay("0.1s")}
          aria-label={`${GOOGLE_REVIEWS.rating.toFixed(1)} stars from ${GOOGLE_REVIEWS.count} Google reviews`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white sm:h-10 sm:w-10">
            <GoogleG className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <span className="text-left">
            <span className="flex items-center gap-2">
              <span className="text-base font-semibold leading-none sm:text-lg">{GOOGLE_REVIEWS.rating.toFixed(1)}</span>
              <span className="flex gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400 sm:h-4 sm:w-4" />
                ))}
              </span>
            </span>
            <span className="mt-1 block text-[11px] text-white/70 sm:text-xs">{GOOGLE_REVIEWS.count} Google reviews</span>
          </span>
        </a>

        <h1 className="mx-auto max-w-[48rem] [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
          <span className="hero-line block text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl sm:leading-[1.02] md:text-6xl">
            <span style={delay("0.2s")}>Mobile Car Detailing</span>
          </span>{" "}
          <span className="hero-line block text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl sm:leading-[1.02] md:text-6xl">
            <span className="hero-gleam" style={delay("0.32s")}>
              in Ryde, NSW
            </span>
          </span>
        </h1>

        <p
          className="hero-fade mt-3 inline-flex items-center gap-1.5 text-lg font-medium text-sky-300 [text-shadow:0_2px_20px_rgba(0,0,0,0.6)] sm:mt-6 sm:gap-2 sm:text-xl md:text-2xl"
          style={delay("0.42s")}
        >
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" aria-hidden="true" />
          We come to you
        </p>

        <p
          className="hero-fade mx-auto mt-4 max-w-xl text-base leading-normal text-white/80 sm:mt-5 sm:text-lg sm:leading-relaxed"
          style={delay("0.5s")}
        >
          Get a showroom shine at your home or office.
          <br />
          Trusted by Ryde locals for fast, professional, high-quality detailing.
        </p>

        <div className="hero-fade mt-5 sm:mt-8" style={delay("0.58s")}>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.25em] text-sky-300 sm:text-xs">Why Choose Us</h2>
          <ul className="mx-auto mt-3 grid w-fit gap-x-8 gap-y-1.5 text-left sm:mt-4 sm:w-auto sm:max-w-2xl sm:grid-cols-2 sm:gap-y-2.5">
            {WHY_CHOOSE_US.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/85 sm:gap-2.5 sm:text-[15px]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" strokeWidth={2.5} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-fade mt-6 flex flex-row items-center justify-center gap-3 sm:mt-10" style={delay("0.68s")}>
          <Button size="lg" className="group h-11 gap-2 px-5 text-sm sm:h-12 sm:px-8 sm:text-base" asChild>
            <Link to="/book">
              Get a Quote
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 border-white/30 bg-white/5 px-5 text-sm text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:h-12 sm:px-8 sm:text-base"
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
