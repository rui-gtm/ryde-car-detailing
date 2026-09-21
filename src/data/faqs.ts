// Single source of truth for FAQ content. FAQ.tsx renders this list on the
// page; src/lib/schema.ts turns the same list into the JSON-LD `FAQPage`
// node. Edit the questions/answers here — do NOT edit them separately in
// FAQ.tsx or in index.html, that's what caused the two to drift apart.
//
// NOTE (2026-09-22): content left unchanged from the current live copy on
// purpose — a content rewrite (including the water/power contradiction below)
// is planned separately. This file only centralizes where that edit happens.

export type Faq = {
  q: string;
  a: string;
};

export const FAQS: Faq[] = [
  {
    q: "Do you come to my home or office?",
    a: "Yes — we’re a mobile detailing service and bring everything needed.",
  },
  {
    q: "How long does a detail take?",
    a: "Between 1–3 hours depending on the package and car condition.",
  },
  {
    q: "Do I need to supply water or power?",
    a: "No. Please ensure water and power are available and easily accessible.",
  },
  {
    q: "What areas do you service?",
    a: "Ryde, North Ryde, Meadowbank, Gladesville, Macquarie Park, Hunters Hill, and nearby suburbs.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash and PayID accepted. Credit card payments coming soon.",
  },
  {
    q: "Do you remove stains and pet hair?",
    a: "Yes — included in the Interior Deep Clean package.",
  },
];
