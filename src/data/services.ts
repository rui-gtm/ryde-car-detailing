// Single source of truth for the four core priced packages. Services.tsx
// renders this list on the page; src/lib/schema.ts turns the same list into
// the JSON-LD `Service`/`Offer` nodes. Change a price or description once, here.

export const slugify = (title: string) =>
  `service-${title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

export type ServicePackage = {
  id: string;
  title: string;
  packageValue: string;
  serviceType: string;
  description: string;
  price: number;
  features: string[];
};

const raw: Omit<ServicePackage, "id">[] = [
  {
    title: "Basic Exterior Wash",
    packageValue: "basic",
    serviceType: "Mobile car wash",
    description: "Essential exterior care, finished to a premium standard.",
    price: 79,
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
