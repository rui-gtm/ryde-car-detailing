// Single source of truth for the three core priced packages. Services.tsx
// renders this list on the page; src/lib/schema.ts turns the same list into
// the JSON-LD `Service`/`Offer` nodes; ServiceDetail.tsx renders the
// per-service page. Change a price or description once, here.
import { slugify as slugifyBase } from "@/lib/slug";
import type { Faq } from "@/data/faqs";
import { EXTRA_SERVICES } from "@/data/extraServices";

// The full detail used to be called "Premium Full Detail". It was renamed, but
// the id — and therefore the URL (/services/premium-full-detail) and the
// schema @id — deliberately keeps the old slug (decided 2026-10-26).
const LEGACY_SLUGS: Record<string, string> = {
  "Full Detail": "Premium Full Detail",
};

const slugify = (title: string) => `service-${slugifyBase(LEGACY_SLUGS[title] ?? title)}`;

export type ServicePackage = {
  id: string;
  title: string;
  packageValue: string;
  serviceType: string;
  description: string;
  price: number;
  features: string[];
  // Rough estimate for the per-service detail page — TODO: confirm exact
  // durations with the business (see ref/SEO-AEO-GEO-Audit.md §10).
  duration: string;
  // Who this package suits — shown on the per-service detail page.
  bestFor: string;
  // Package-specific FAQs shown (and declared as FAQPage schema) on the
  // per-service detail page — distinct from the generic site-wide FAQS in
  // src/data/faqs.ts.
  faqs: Faq[];
  // Optional two-column breakdown of `features` for the per-service detail
  // page's Inclusions section — only worth showing for packages that combine
  // distinct categories of work (e.g. interior + exterior). Single-focus
  // packages (Basic Exterior Wash) omit this and the
  // Inclusions section doesn't render at all for them.
  inclusionGroups?: { label: string; items: string[] }[];
  // Extra Services (src/data/extraServices.ts) commonly booked alongside this
  // package — shown next to the price card on the per-service detail page.
  recommendedExtras: (typeof EXTRA_SERVICES)[number]["label"][];
};

const raw: Omit<ServicePackage, "id">[] = [
  {
    title: "Basic Exterior Wash",
    packageValue: "basic",
    serviceType: "Mobile car wash",
    description: "Essential exterior care, finished to a premium standard.",
    price: 150,
    duration: "45–90 minutes",
    bestFor: "Regular maintenance washes and cars that just need the outside refreshed.",
    features: [
      "Hand contact wash for a gentle, swirl-free clean",
      "Dirt, grime & brake-dust removal",
      "Wheel & tyre cleanse",
      "Streak-free exterior windows",
      "Quick-dry, spotless finish",
    ],
    recommendedExtras: ["Clay Bar Treatment", "Headlight Restoration", "Exterior Plastics Restoration"],
    faqs: [
      {
        q: "How long does a Basic Exterior Wash take?",
        a: "Usually 45–90 minutes, depending on vehicle size and how dirty it is.",
      },
      {
        q: "Does it include the wheels and tyres?",
        a: "Yes — a wheel and tyre cleanse is included in every Basic Exterior Wash.",
      },
      {
        q: "Do I need to supply water or power?",
        a: "Yes. We need access to a standard mains water supply and a power outlet close to the car. If that isn’t possible, contact us before booking.",
      },
    ],
  },
  {
    title: "Full Detail",
    packageValue: "premium",
    serviceType: "Mobile car detailing",
    description: "The complete inside-and-out transformation, done in one visit.",
    price: 249,
    duration: "2–3 hours",
    bestFor: "A full inside-and-out refresh — our most popular package for a like-new result.",
    features: [
      "Full interior deep clean",
      "Steam clean throughout the interior",
      "Complete exterior wash + wheel clean",
      "3 month ceramic sealant on the exterior",
      "Streak-free interior & exterior windows",
      "Interior scrub, stain removal & decontamination",
      "Tyre shine for a refined finish",
      "Full-vehicle vacuum throughout",
    ],
    inclusionGroups: [
      {
        label: "Interior",
        items: [
          "Full interior deep clean",
          "Steam clean throughout the interior",
          "Interior scrub, stain removal & decontamination",
          "Full-vehicle vacuum throughout",
          "Streak-free interior windows",
        ],
      },
      {
        label: "Exterior",
        items: [
          "Complete exterior wash + wheel clean",
          "3 month ceramic sealant on the exterior",
          "Tyre shine for a refined finish",
          "Streak-free exterior windows",
        ],
      },
    ],
    recommendedExtras: ["Engine Bay Clean", "Step 1 Paint Correction", "Ceramic Coating"],
    faqs: [
      {
        q: "What's included in the Full Detail?",
        a: "A full interior deep clean with a steam clean, a complete exterior wash with wheels, a 3 month ceramic sealant on the exterior, and tyre shine for a refined finish.",
      },
      {
        q: "How long does the Full Detail take?",
        a: "Around 2–3 hours for a complete inside-and-out transformation.",
      },
      {
        q: "Is Full Detail your most popular package?",
        a: "Yes — it's our signature, most-booked service for a full like-new result.",
      },
    ],
  },
  {
    title: "Ceramic Coating",
    packageValue: "ceramic",
    serviceType: "Mobile car detailing",
    description: "Elite paint protection with a superior gloss finish.",
    price: 699,
    duration: "Half-day service",
    bestFor: "Owners who want long-term paint protection and a showroom-gloss finish that lasts.",
    features: [
      "Full paint clean and prep before the coating goes on",
      "Deep, mirror-like gloss",
      "Protects against UV and harsh chemicals",
      "Water beads up and rolls off the paint",
      "10H hard coating for lasting durability",
      "Multiple year protection options",
    ],
    inclusionGroups: [
      {
        label: "Preparation",
        items: ["Full paint clean", "Professional surface prep"],
      },
      {
        label: "Protection",
        items: [
          "Deep, mirror-like gloss",
          "Protects against UV and harsh chemicals",
          "Water beads up and rolls off the paint",
          "10H hard coating for lasting durability",
          "Multiple year protection options",
        ],
      },
    ],
    recommendedExtras: ["Step 1 Paint Correction", "Step 2 Paint Correction", "Headlight Restoration"],
    faqs: [
      {
        q: "How long does Ceramic Coating protection last?",
        a: "There are multiple year options, depending on how long you want the coating to last. Get in touch and we will help you choose the right one for your car.",
      },
      {
        q: "How long does the Ceramic Coating service take?",
        a: "It's a half-day service, since it includes full paint decontamination and surface prep before coating.",
      },
      {
        q: "Does ceramic coating make the car easier to keep clean?",
        a: "Yes — the hydrophobic finish makes water and dirt bead off, so washes between details are quicker.",
      },
    ],
  },
];

export const SERVICES: ServicePackage[] = raw.map((s) => ({ id: slugify(s.title), ...s }));

// Every page/component that links to a service detail page derives the URL
// slug from `service.id` (which is prefixed "service-" for schema @id use) —
// this used to be a `(id) => id.replace(/^service-/, "")` redefined in 6
// different files. Now there's one function to import instead.
export const serviceSlug = (id: string) => id.replace(/^service-/, "");
export const serviceHref = (id: string) => `/services/${serviceSlug(id)}`;
