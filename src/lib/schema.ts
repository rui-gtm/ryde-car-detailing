// Builds the schema.org JSON-LD graph FROM the same data modules the visible
// page content is rendered from (src/data/*). Previously this graph was a
// second, hand-maintained copy hardcoded as a <script> block in index.html —
// editing a price, FAQ answer or suburb meant remembering to change it in two
// places, and they drifted apart. Now there is exactly one place to edit each
// fact; this file just re-shapes it into schema.org form.
import { BUSINESS, AREA_SERVED, SITE_URL } from "@/data/business";
import { SERVICES } from "@/data/services";
import { EXTRA_SERVICES } from "@/data/extraServices";
import { FAQS } from "@/data/faqs";

const areaServedNodes = AREA_SERVED.map((name) => ({ "@type": "City", name }));

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
export const buildPageSchema = (url: string, pageTitle: string) => ({
  "@context": "https://schema.org",
  "@graph": [webPageNode(url, pageTitle)],
});
