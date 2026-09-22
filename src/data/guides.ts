// Single source of truth for /guides and /guides/:slug. Content is written
// from facts already established elsewhere in the app (SERVICES, FAQS,
// TERMS_SECTIONS) — sentences interpolate those values instead of retyping
// prices/policy, so a price change in services.ts flows through here too.
//
// These are starter drafts (per ref/SEO-AEO-GEO-Audit.md §11) — factual and
// non-generic, but intentionally not vendor-specific technical claims (e.g.
// ceramic coating chemistry) that would need the business's sign-off.
import { slugify } from "@/lib/slug";
import { SERVICES } from "./services";
import { BUSINESS, AREA_SERVED_TEXT } from "./business";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  sections: GuideSection[];
};

const priceFor = (title: string) => SERVICES.find((s) => s.title === title)?.price;

const raw: Omit<Guide, "slug">[] = [
  {
    title: "Car Wash vs Car Detailing: What's the Difference?",
    excerpt:
      "A car wash and a car detail solve different problems. Here's what each actually covers, and how to tell which one your car needs.",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          `A car wash focuses on the exterior — removing dirt, grime and brake dust for a clean, polished finish. A car detail goes further: it typically includes interior vacuuming, deep stain and dirt extraction, and trim care, restoring the whole cabin to a like-new condition, not just the paintwork.`,
        ],
      },
      {
        heading: "When a wash is enough",
        paragraphs: [
          `If your car just needs the outside refreshed — regular maintenance, nothing spilled or ground into the carpets — our Basic Exterior Wash (from $${priceFor(
            "Basic Exterior Wash",
          )}) covers the hand wash, wheel and tyre clean, and streak-free windows.`,
        ],
      },
      {
        heading: "When you need a full detail",
        paragraphs: [
          `Pet hair, stains, spills or general day-to-day build-up inside the cabin call for the Interior Deep Clean (from $${priceFor(
            "Interior Deep Clean",
          )}) or, for a complete inside-and-out result, the Premium Full Detail (from $${priceFor(
            "Premium Full Detail",
          )}).`,
        ],
      },
    ],
  },
  {
    title: "How Much Does Car Detailing Cost in Ryde?",
    excerpt: `A breakdown of what determines car detailing prices in ${BUSINESS.address.addressLocality} NSW, and what's included at each price point.`,
    sections: [
      {
        heading: "Our starting prices",
        paragraphs: SERVICES.map((s) => `${s.title} — from $${s.price} (${s.duration}). ${s.bestFor}`),
      },
      {
        heading: "What can change the price",
        paragraphs: [
          `Prices depend on vehicle size and condition. Excessive pet hair, staining, sand, mud or other heavy contamination may require additional time — we'll always discuss and agree any extra cost with you before work starts, never after.`,
        ],
      },
    ],
  },
  {
    title: "How Long Does Mobile Car Detailing Take?",
    excerpt: "Typical timeframes for each package, and what makes a job take longer than expected.",
    sections: [
      {
        heading: "Typical durations",
        paragraphs: SERVICES.map((s) => `${s.title}: approx. ${s.duration}.`),
      },
      {
        heading: "What can extend the time",
        paragraphs: [
          "Excessive pet hair, heavy staining or a vehicle that hasn't been cleaned in a long time can all add time to a booking. If that's likely to apply to your car, mentioning it when you book helps us plan the appointment properly.",
        ],
      },
    ],
  },
  {
    title: "What to Expect From Mobile Car Detailing",
    excerpt: "A practical walkthrough of how a mobile detail actually works, from booking to drive-away.",
    sections: [
      {
        heading: "Where we work",
        paragraphs: [
          `We come to you — home, apartment car park or workplace — across ${AREA_SERVED_TEXT} and nearby suburbs.`,
        ],
      },
      {
        heading: "What we need from you",
        paragraphs: [
          "Access to a standard mains water supply and a standard 240V power outlet close to the vehicle, plus a safe, suitable work area — unless alternative arrangements have been agreed with us in advance.",
        ],
      },
      {
        heading: "Before we arrive",
        paragraphs: [
          "Remove valuables and personal belongings from the vehicle, and make sure it's accessible at the agreed time and location.",
        ],
      },
    ],
  },
];

export const GUIDES: Guide[] = raw.map((g) => ({ slug: slugify(g.title), ...g }));

export const findGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
