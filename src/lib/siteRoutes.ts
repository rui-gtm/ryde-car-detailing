// Single registry of every indexable route on the site: its path, page
// title and meta description. Three different things used to each keep
// their own copy of this list — React Router's <Route> paths, the per-route
// title/description swap in scripts/prerender.mjs, and public/sitemap.xml —
// which is exactly the kind of duplication that caused the FAQ drift (see
// ref/SEO-AEO-GEO-Audit.md §25). Now all three read from this one array
// (prerender.mjs and the sitemap generator import it via the compiled SSR
// bundle — see src/entry-server.tsx).
import { BUSINESS } from "@/data/business";
import { SERVICES, serviceHref } from "@/data/services";
import { SUBURBS } from "@/data/suburbs";
import { GUIDES } from "@/data/guides";

export type SiteRoute = {
  path: string;
  title: string;
  description: string;
};

// "/" is intentionally excluded — it uses index.html's own base <title>/meta
// (see scripts/prerender.mjs), not a generated override.
export const STATIC_ROUTES: SiteRoute[] = [
  {
    path: "/book",
    title: "Book Your Detail | Ryde Car Detailing",
    description: "Book your mobile car detail in Ryde NSW. Fill out the form and we'll contact you to confirm your appointment.",
  },
  {
    path: "/terms",
    title: "Terms & Conditions | Ryde Car Detailing",
    description: "Read the Terms & Conditions for Ryde Car Detailing's mobile car detailing services.",
  },
  {
    path: "/about",
    title: `About Us | ${BUSINESS.name}`,
    description: `Meet the team behind ${BUSINESS.name}, a locally operated mobile detailing business serving Ryde NSW and surrounding suburbs.`,
  },
  {
    path: "/services",
    title: `Mobile Car Detailing Services & Prices | ${BUSINESS.name}`,
    description: "Compare all mobile car detailing packages and prices in Ryde NSW, from a basic exterior wash to full ceramic coating.",
  },
  {
    path: "/areas",
    title: `Areas We Service | ${BUSINESS.name}`,
    description: `Every suburb ${BUSINESS.name} services with mobile car detailing — Ryde, North Ryde, Meadowbank, Gladesville, Macquarie Park, Hunters Hill and nearby.`,
  },
  {
    path: "/guides",
    title: `Car Detailing Guides & Advice | ${BUSINESS.name}`,
    description: "Practical car detailing guides — pricing, timing, and what each service actually covers.",
  },
];

export const SERVICE_ROUTES: SiteRoute[] = SERVICES.map((s) => ({
  path: serviceHref(s.id),
  title: `${s.title} in Ryde NSW | ${BUSINESS.name}`,
  description: s.description,
}));

export const SUBURB_ROUTES: SiteRoute[] = SUBURBS.map((s) => ({
  path: `/areas/${s.slug}`,
  title: `Mobile Car Detailing in ${s.name} | ${BUSINESS.name}`,
  description: `Mobile car detailing in ${s.name}, NSW. We bring our own water and equipment and come to your home, apartment or workplace.`,
}));

export const GUIDE_ROUTES: SiteRoute[] = GUIDES.map((g) => ({
  path: `/guides/${g.slug}`,
  title: `${g.title} | ${BUSINESS.name}`,
  description: g.excerpt,
}));

export const ALL_ROUTES: SiteRoute[] = [...STATIC_ROUTES, ...SERVICE_ROUTES, ...SUBURB_ROUTES, ...GUIDE_ROUTES];
