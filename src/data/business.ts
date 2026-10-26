// Single source of truth for business identity (NAP), used by every component
// AND by the generated JSON-LD (see src/lib/schema.ts). Update it here once —
// everything else (Footer, ServiceArea, Book, Testimonial, schema.org markup)
// reads from this file instead of hardcoding its own copy.

export const SITE_URL = "https://www.rydecardetailing.com";

export const BUSINESS = {
  name: "Ryde Car Detailing",
  url: SITE_URL,
  description:
    "Professional mobile car wash and detailing service in Ryde, NSW. We come to your home or office. Services include mobile car wash, full detail, and ceramic coating.",
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
  // Full Instagram profile URL, e.g. "https://www.instagram.com/yourhandle". Leave empty to hide the
  // Instagram buttons in the header and footer.
  instagramUrl: "" as string,
  googleMapsUrl: "https://maps.app.goo.gl/AVe32BtBi5oWsNBDA",
  ogImageUrl: `${SITE_URL}/og-image.jpg`,
  openingHours: ["Mo-Su 00:00-23:59"],
} as const;

// Suburbs the business services. Used verbatim in Footer, FAQ, ServiceArea copy
// AND as the schema.org `areaServed` list — change the list once, here.
export const AREA_SERVED = ["Ryde", "North Ryde", "Meadowbank", "Gladesville", "Macquarie Park", "Hunters Hill"] as const;

export const AREA_SERVED_TEXT = AREA_SERVED.join(", ");

// Outcall fee for the Red Zone on the service area map (the Green Zone has
// none). Shown on the map, its legend and the homepage pricing copy — change
// it once, here.
export const RED_ZONE_OUTCALL_FEE = 30;

// Which suburbs fall in each zone (confirmed by the business, 2026-10-26).
// The Green Zone list is complete; the Red Zone list is examples — the map
// shows the full zone. Bookings outside the Red Zone aren't taken.
export const GREEN_ZONE_SUBURBS = ["Ryde", "North Ryde", "East Ryde", "West Ryde", "Denistone East"] as const;
export const RED_ZONE_EXAMPLES = ["Macquarie Park", "Chatswood", "Epping", "Hunters Hill", "Sydney Olympic Park"] as const;

/** "A, B and C" */
export const listText = (items: readonly string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

// Google review summary shown in the Hero, Testimonial.tsx and the JSON-LD
// aggregateRating. Update the rating and count here as reviews come in — this
// used to also be hardcoded (and stale) in the unused GoogleRatingSection.tsx,
// which is why the two disagreed. Last checked against Google: 2026-10-26.
export const GOOGLE_REVIEWS = {
  rating: 4.9,
  count: 59,
} as const;
