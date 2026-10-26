// Single source of truth for FAQ content. FAQ.tsx renders this list on the
// page; src/lib/schema.ts turns the same list into the JSON-LD `FAQPage`
// node. Edit the questions/answers here — do NOT edit them separately in
// FAQ.tsx or in index.html, that's what caused the two to drift apart.
//
// NOTE: customers supply water and power (see Terms §5) — keep every answer
// here consistent with that.

export type Faq = {
  q: string;
  a: string;
};

export const FAQS: Faq[] = [
  {
    q: "Do you come to my home or office?",
    a: "Yes. We’re a mobile detailing service and come to your home, apartment car park or workplace.",
  },
  {
    q: "How long does a detail take?",
    a: "Between 1–3 hours depending on the package and car condition.",
  },
  {
    q: "Do I need to supply water or power?",
    a: "Yes. We need access to a standard mains water supply and a power outlet close to the car. If that isn’t possible, contact us before booking so we can talk through options.",
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
    a: "Yes. Stain removal is included in the Full Detail, and pet hair removal is available as an extra service.",
  },
];
