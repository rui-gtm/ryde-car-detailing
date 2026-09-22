// Builds the schema.org JSON-LD graph FROM the same data modules the visible
// page content is rendered from (src/data/*). Previously this graph was a
// second, hand-maintained copy hardcoded as a <script> block in index.html —
// editing a price, FAQ answer or suburb meant remembering to change it in two
// places, and they drifted apart. Now there is exactly one place to edit each
// fact; this file just re-shapes it into schema.org form.
import { BUSINESS, AREA_SERVED, GOOGLE_REVIEWS, SITE_URL } from "@/data/business";
import { SERVICES, type ServicePackage } from "@/data/services";
import { EXTRA_SERVICES } from "@/data/extraServices";
import { FAQS } from "@/data/faqs";
import { TESTIMONIALS } from "@/data/testimonials";
import type { Suburb } from "@/data/suburbs";
import type { Guide } from "@/data/guides";

export type Crumb = { name: string; url: string };

const breadcrumbNode = (items: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});

const areaServedNodes = AREA_SERVED.map((name) => ({ "@type": "City", name }));

// Only reviews sourced verbatim from Google Maps are declared as Review
// structured data — declaring the placeholder testimonials too would be
// structured data that can't be verified against the visible source.
const googleTestimonials = TESTIMONIALS.filter((t) => t.source === "google");

const reviewNodes = () =>
  googleTestimonials.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewBody: t.quote,
    reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
  }));

const websiteNode = () => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BUSINESS.name,
  inLanguage: "en-AU",
});

const localBusinessNode = () => ({
  "@type": "AutoWash",
  "@id": `${SITE_URL}/#localbusiness`,
  name: BUSINESS.name,
  description: BUSINESS.description,
  url: `${SITE_URL}/`,
  telephone: BUSINESS.phoneE164,
  priceRange: "$$",
  image: BUSINESS.ogImageUrl,
  keywords: BUSINESS.keywords,
  sameAs: [BUSINESS.googleMapsUrl],
  openingHours: BUSINESS.openingHours,
  address: {
    "@type": "PostalAddress",
    ...BUSINESS.address,
  },
  geo: {
    "@type": "GeoCoordinates",
    ...BUSINESS.geo,
  },
  areaServed: areaServedNodes,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: GOOGLE_REVIEWS.rating,
    reviewCount: GOOGLE_REVIEWS.count,
  },
  review: reviewNodes(),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Car Detailing Services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      name: s.title,
      description: s.description,
      priceCurrency: "AUD",
      price: String(s.price),
    })),
  },
});

const coreServiceNodes = () =>
  SERVICES.map((s) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/#${s.id}`,
    name: s.title,
    serviceType: s.serviceType,
    provider: { "@id": `${SITE_URL}/#localbusiness` },
    areaServed: areaServedNodes,
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      price: String(s.price),
      url: `${SITE_URL}/#${s.id}`,
    },
  }));

// Add-ons that duplicate a core priced package (e.g. "Ceramic Coating" is
// both a core Service and listed as an extra) are skipped here so the graph
// never declares the same Service twice under two different @ids.
const extraServiceNodes = () =>
  EXTRA_SERVICES.filter((extra) => !SERVICES.some((s) => s.title === extra.label)).map((extra) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/#${extra.id}`,
    name: extra.label,
    serviceType: "Mobile car detailing add-on",
    provider: { "@id": `${SITE_URL}/#localbusiness` },
    areaServed: areaServedNodes,
  }));

const webPageNode = (url: string, name: string) => ({
  "@type": "WebPage",
  "@id": `${SITE_URL}${url}#webpage`,
  url: `${SITE_URL}${url}`,
  name,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#localbusiness` },
});

const faqPageNode = () => ({
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** Full graph for the homepage: business, services, FAQ — everything that's actually on that page. */
export const buildHomepageSchema = (pageTitle: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    websiteNode(),
    localBusinessNode(),
    ...coreServiceNodes(),
    webPageNode("/", pageTitle),
    faqPageNode(),
    ...extraServiceNodes(),
  ],
});

/**
 * Lightweight graph for secondary pages (e.g. /book, /terms) that don't carry
 * FAQ or Service content of their own — just a WebPage node referencing the
 * same business/website entities declared on the homepage, so the entity
 * stays consistent without re-declaring markup for content that isn't on
 * that page (declaring FAQPage/Service on a page with no FAQs or services
 * visible would itself be a structured-data mismatch).
 */
export const buildPageSchema = (url: string, pageTitle: string, breadcrumbs?: Crumb[]) => ({
  "@context": "https://schema.org",
  "@graph": [webPageNode(url, pageTitle), ...(breadcrumbs ? [breadcrumbNode(breadcrumbs)] : [])],
});

/** Per-service detail page (/services/:slug) — reuses the same Service node shape as the homepage. */
export const buildServicePageSchema = (service: ServicePackage, url: string, pageTitle: string, breadcrumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    webPageNode(url, pageTitle),
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#${service.id}`,
      name: service.title,
      serviceType: service.serviceType,
      description: service.description,
      provider: { "@id": `${SITE_URL}/#localbusiness` },
      areaServed: areaServedNodes,
      offers: {
        "@type": "Offer",
        priceCurrency: "AUD",
        price: String(service.price),
        url: `${SITE_URL}${url}`,
      },
    },
    breadcrumbNode(breadcrumbs),
  ],
});

/** Per-suburb detail page (/areas/:slug). */
export const buildSuburbPageSchema = (suburb: Suburb, url: string, pageTitle: string, breadcrumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    webPageNode(url, pageTitle),
    {
      "@type": "Service",
      "@id": `${SITE_URL}${url}#service`,
      name: `Mobile Car Detailing in ${suburb.name}`,
      serviceType: "Mobile car detailing",
      provider: { "@id": `${SITE_URL}/#localbusiness` },
      areaServed: { "@type": "City", name: suburb.name },
    },
    breadcrumbNode(breadcrumbs),
  ],
});

/** Per-guide article page (/guides/:slug). */
export const buildGuidePageSchema = (guide: Guide, url: string, pageTitle: string, breadcrumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    webPageNode(url, pageTitle),
    {
      "@type": "Article",
      "@id": `${SITE_URL}${url}#article`,
      headline: guide.title,
      description: guide.excerpt,
      author: { "@id": `${SITE_URL}/#localbusiness` },
      publisher: { "@id": `${SITE_URL}/#localbusiness` },
      mainEntityOfPage: { "@id": `${SITE_URL}${url}#webpage` },
    },
    breadcrumbNode(breadcrumbs),
  ],
});
