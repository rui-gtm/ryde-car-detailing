// Single source of truth for the unpriced add-on services shown in
// ExtraServices.tsx. The same list feeds the JSON-LD `Service` nodes in
// src/lib/schema.ts (icons stay in ExtraServices.tsx since schema.org has no
// concept of an icon).
import { slugify as slugifyBase } from "@/lib/slug";

const slugify = (title: string) => `service-${slugifyBase(title)}`;

export type ExtraService = {
  id: string;
  label: string;
};

const labels = [
  "Pet Hair Removal",
  "Clay Bar Treatment",
  "Exterior Plastics Restoration",
  "Headlight Restoration",
  "Ceramic Coating",
  "Engine Bay Clean",
  "Step 1 Paint Correction",
  "Step 2 Paint Correction",
  "Deep Steam Clean",
  "Deep Seat Extraction",
] as const;

export const EXTRA_SERVICES: ExtraService[] = labels.map((label) => ({ id: slugify(label), label }));
