// Single source of truth for suburb pages (/areas, /areas/:slug). Built from
// the same AREA_SERVED list used everywhere else (Footer, FAQ, schema
// areaServed) — see src/data/business.ts — so the suburb list itself only
// exists in one place.
//
// `intro` is intentionally generic-but-honest placeholder copy, not invented
// local detail (real North Ryde/Meadowbank/etc. specifics — building types,
// parking, common customer scenarios — need to come from the business, see
// ref/SEO-AEO-GEO-Audit.md §4). Replace it per suburb when that's available.
import { slugify } from "@/lib/slug";
import { AREA_SERVED } from "./business";

export type Suburb = {
  slug: string;
  name: string;
  intro: string;
};

export const SUBURBS: Suburb[] = AREA_SERVED.map((name) => ({
  slug: slugify(name),
  name,
  // TODO (content): replace with real, suburb-specific detail — see §4.
  intro: `We regularly detail cars for homes, apartments and workplaces in ${name}. We bring our own equipment, so a driveway, basement car park or office car park all work the same way.`,
}));

export const findSuburb = (slug: string) => SUBURBS.find((s) => s.slug === slug);
