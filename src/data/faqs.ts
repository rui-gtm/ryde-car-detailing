// Single source of truth for FAQ content. FAQ.tsx renders this list on the
// page; src/lib/schema.ts turns the same list into the JSON-LD `FAQPage`
// node. Edit the questions/answers here — do NOT edit them separately in
// FAQ.tsx or in index.html, that's what caused the two to drift apart.
//
// NOTE: customers supply water and power (see Terms §5) — keep every answer
// here consistent with that.
import { SERVICES } from "@/data/services";
import {
  AREA_SERVED_TEXT,
  GREEN_ZONE_SUBURBS,
  RED_ZONE_EXAMPLES,
  RED_ZONE_OUTCALL_FEE,
  listText,
} from "@/data/business";

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
    // Built from each package's `duration` so it can't drift from the service
    // pages (it used to say "1–3 hours" while Ceramic Coating takes half a day).
    a: `It depends on the package and the car's condition. ${SERVICES.map(
      (s) => `${s.title}: ${s.duration.toLowerCase()}`,
    ).join("; ")}.`,
  },
  {
    q: "Do I need to supply water or power?",
    a: "Yes. We need access to a standard mains water supply and a power outlet close to the car. If that isn’t possible, contact us before booking so we can talk through options.",
  },
  {
    q: "What areas do you service?",
    a: `${AREA_SERVED_TEXT} and nearby suburbs. There's no outcall fee in the Green Zone (${listText(
      GREEN_ZONE_SUBURBS,
    )}). A $${RED_ZONE_OUTCALL_FEE} outcall fee applies in the Red Zone, for example ${listText(
      RED_ZONE_EXAMPLES,
    )}. We don't take bookings outside the Red Zone, so check the service area map or give us a call if you're unsure.`,
  },
  {
    q: "What payment methods do you accept?",
    // Must match Terms §14 (Payment).
    a: "Cash or bank transfer, paid when the job is finished. We can't accept credit or debit cards at the moment.",
  },
  {
    q: "Do you remove stains and pet hair?",
    a: "Yes. Stain removal is included in the Full Detail, and pet hair removal is available as an extra service.",
  },
];
