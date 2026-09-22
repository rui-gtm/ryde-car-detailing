// Single source of truth for the four core priced packages. Services.tsx
// renders this list on the page; src/lib/schema.ts turns the same list into
// the JSON-LD `Service`/`Offer` nodes; ServiceDetail.tsx renders the
// per-service page. Change a price or description once, here.
import { slugify as slugifyBase } from "@/lib/slug";

const slugify = (title: string) => `service-${slugifyBase(title)}`;

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
};

const raw: Omit<ServicePackage, "id">[] = [
  {
    title: "Basic Exterior Wash",
    packageValue: "basic",
    serviceType: "Mobile car wash",
    description: "Essential exterior care, finished to a premium standard.",
    price: 79,
    duration: "45–90 minutes",
    bestFor: "Regular maintenance washes and cars that just need the outside refreshed.",
    features: [
      "Hand contact wash for a gentle, swirl-free clean",
      "Dirt, grime & brake-dust removal",
      "Wheel & tyre cleanse",
      "Streak-free exterior windows",
      "Quick-dry, polished finish",
    ],
  },
  {
    title: "Interior Deep Clean",
    packageValue: "basic",
    serviceType: "Mobile car detailing",
    description: "Restore your cabin to a pristine, hygienic, like-new condition.",
    price: 129,
    duration: "1–2 hours",
    bestFor: "Cars with pet hair, stains, spills or general family/daily-use build-up inside.",
    features: [
      "Full interior vacuum (seats, carpets, mats & boot)",
      "Interior scrub + deep decontamination",
      "Dirt & stain extraction",
      "Dash, console & trim detailing",
      "Crystal-clear, streakless windows",
    ],
  },
  {
    title: "Premium Full Detail",
    packageValue: "premium",
    serviceType: "Mobile car detailing",
    description: "The complete inside-and-out transformation. Our signature service.",
    price: 199,
    duration: "2–3 hours",
    bestFor: "A full inside-and-out refresh — our most popular package for a like-new result.",
    features: [
      "Full interior deep clean",
      "Complete exterior wash + wheel clean",
      "Streak-free interior & exterior windows",
      "Interior scrub, stain removal & decontamination",
      "Tyre shine for a refined finish",
      "Full-vehicle vacuum throughout",
    ],
  },
  {
    title: "Ceramic Coating",
    packageValue: "ceramic",
    serviceType: "Mobile car detailing",
    description: "Elite paint protection with a superior gloss finish.",
    price: 499,
    duration: "Half-day service",
    bestFor: "Owners who want long-term paint protection and a showroom-gloss finish that lasts.",
    features: [
      "Paint decontamination & professional surface prep",
      "High-gloss, mirror-like finish",
      "UV & chemical resistance",
      "Hydrophobic water-beading performance",
      "10H hardness formula for long-term durability",
      "1-year or 7-year protection kit options",
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
