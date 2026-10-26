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
import { GUIDES, guideHref } from "@/data/guides";

export type SiteRoute = {
  path: string;
  title: string;
  description: string;
  /** Prerendered with robots "noindex,follow" and left out of sitemap.xml. */
  noindex?: boolean;
  /** og:type for the page (index.html's default is "website"). */
  ogType?: "website" | "article";
  /** Real last-content-change date (YYYY-MM-DD) for sitemap.xml. Routes
   * without one get no <lastmod>: a build date on every URL is inaccurate,
   * and search engines learn to ignore inaccurate lastmod values. */
  lastmod?: string;
};

// Google shows roughly 60 characters of a title. Append the brand only when
// the whole title still fits; og:site_name carries the brand either way.
export const withBrand = (title: string) => {
  const full = `${title} | ${BUSINESS.name}`;
  return full.length <= 60 ? full : title;
};

// "/" is intentionally excluded — it uses index.html's own base <title>/meta
// (see scripts/prerender.mjs), not a generated override.
export const STATIC_ROUTES: SiteRoute[] = [
  {
    path: "/book",
    title: "Book Your Detail | Ryde Car Detailing",
    description: "Book your mobile car detail in Ryde NSW. Fill out the form and we'll call or email you within 24 hours to confirm your appointment.",
  },
  {
    path: "/terms",
    title: "Terms & Conditions | Ryde Car Detailing",
    description: "Read the Terms & Conditions for Ryde Car Detailing's mobile car detailing services.",
  },
  {
    path: "/about",
    title: `About Us | ${BUSINESS.name}`,
    description: `Meet the detailer behind ${BUSINESS.name}, a locally operated mobile detailing business serving Ryde NSW and surrounding suburbs.`,
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
  description: `${s.description} From $${s.price} (${s.duration.toLowerCase()}), done at your home or workplace across Ryde NSW.`,
}));

export const SUBURB_ROUTES: SiteRoute[] = SUBURBS.map((s) => ({
  path: `/areas/${s.slug}`,
  title: `Mobile Car Detailing in ${s.name} | ${BUSINESS.name}`,
  description: `Mobile car detailing in ${s.name}, NSW. We come to your home, apartment or workplace, so your car never has to move.`,
  // Kept out of the index until each suburb page has its own content — today
  // they're ~99% identical apart from the suburb name (see the business fact
  // sheet backlog). Drop this once a page has real local detail.
  noindex: true,
}));

export const GUIDE_ROUTES: SiteRoute[] = GUIDES.map((g) => ({
  path: guideHref(g.slug),
  title: withBrand(g.title),
  description: g.excerpt,
  ogType: "article",
  lastmod: g.updated,
}));

export const ALL_ROUTES: SiteRoute[] = [...STATIC_ROUTES, ...SERVICE_ROUTES, ...SUBURB_ROUTES, ...GUIDE_ROUTES];
