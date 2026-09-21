// Single source of truth for business identity (NAP), used by every component
// AND by the generated JSON-LD (see src/lib/schema.ts). Update it here once —
// everything else (Footer, ServiceArea, Book, Testimonial, schema.org markup)
// reads from this file instead of hardcoding its own copy.

export const SITE_URL = "https://www.rydecardetailing.com";

export const BUSINESS = {
  name: "Ryde Car Detailing",
  url: SITE_URL,
  description:
    "Professional mobile car wash and detailing service in Ryde, NSW. We come to your home or office with everything needed — mobile car wash, interior deep clean, full detail, and ceramic coating.",
  keywords: "mobile car wash, mobile car detailing, car wash Ryde, car detailing Ryde NSW, mobile detailing Sydney",
  phoneDisplay: "0411 666 174",
  phoneE164: "+61411666174",
  get phoneHref() {
    return `tel:${this.phoneE164}`;
  },
  address: {
    streetAddress: "109 Blaxland Rd",
    addressLocality: "Ryde",
    addressRegion: "NSW",
    postalCode: "2112",
    addressCountry: "AU",
  },
  get addressDisplay() {
    return `${this.address.streetAddress}, ${this.address.addressLocality} ${this.address.addressRegion} ${this.address.postalCode}`;
  },
  geo: {
    latitude: -33.8138256,
    longitude: 151.106138,
  },
  googleMapsUrl: "https://maps.app.goo.gl/AVe32BtBi5oWsNBDA",
  ogImageUrl: `${SITE_URL}/og-image.jpg`,
  openingHours: ["Mo-Su 00:00-23:59"],
} as const;

// Suburbs the business services. Used verbatim in Footer, FAQ, ServiceArea copy
// AND as the schema.org `areaServed` list — change the list once, here.
export const AREA_SERVED = ["Ryde", "North Ryde", "Meadowbank", "Gladesville", "Macquarie Park", "Hunters Hill"] as const;

export const AREA_SERVED_TEXT = AREA_SERVED.join(", ");

// Google review summary shown in Testimonial.tsx. Update the count here as
// reviews come in — this used to also be hardcoded (and stale) in the unused
// GoogleRatingSection.tsx, which is why the two disagreed.
export const GOOGLE_REVIEWS = {
  rating: 5,
  count: 49,
} as const;
