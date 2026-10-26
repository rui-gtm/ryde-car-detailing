// Builds /llms.txt — a plain-Markdown summary of the business for AI
// assistants and answer engines (https://llmstxt.org). Like the JSON-LD in
// schema.ts, every fact comes from src/data/*, so it can't drift from the
// pages. scripts/prerender.mjs writes it to dist/llms.txt via entry-server.
import {
  BUSINESS,
  SITE_URL,
  GOOGLE_REVIEWS,
  GREEN_ZONE_SUBURBS,
  RED_ZONE_EXAMPLES,
  RED_ZONE_OUTCALL_FEE,
  listText,
} from "@/data/business";
import { SERVICES, serviceHref } from "@/data/services";
import { EXTRA_SERVICES } from "@/data/extraServices";
import { FAQS } from "@/data/faqs";
import { GUIDES, guideHref } from "@/data/guides";

export const buildLlmsTxt = () => {
  const extras = EXTRA_SERVICES.map((e) => e.label).filter((label) => !SERVICES.some((s) => s.title === label));

  return [
    `# ${BUSINESS.name}`,
    "",
    `> Mobile car detailing in ${BUSINESS.address.addressLocality} ${BUSINESS.address.addressRegion}, Australia. The detailer comes to the customer's home, apartment car park or workplace — there is no workshop and customers don't visit an address. Rated ${GOOGLE_REVIEWS.rating.toFixed(1)} from ${GOOGLE_REVIEWS.count} Google reviews.`,
    "",
    "## Key facts",
    "",
    `- Phone: ${BUSINESS.phoneDisplay} (${BUSINESS.phoneE164})`,
    `- Website: ${SITE_URL}/`,
    `- Opening hours: ${BUSINESS.openingHours.join(", ")} (24 hours, 7 days)`,
    `- Based in: ${BUSINESS.address.addressLocality} ${BUSINESS.address.addressRegion} ${BUSINESS.address.postalCode} (mobile service only)`,
    `- Green Zone, no outcall fee: ${listText(GREEN_ZONE_SUBURBS)}`,
    `- Red Zone, $${RED_ZONE_OUTCALL_FEE} outcall fee: for example ${listText(RED_ZONE_EXAMPLES)}`,
    "- No bookings outside the Red Zone",
    "- The customer provides access to mains water and a standard 240V power outlet",
    "- Payment: cash or bank transfer when the job is finished; credit and debit cards are not accepted",
    `- Booking: request at ${SITE_URL}/book — the business calls or emails within 24 hours to confirm`,
    "- Prices are starting prices; the final price can change if the car's condition differs from what was described, and any extra charge is agreed before work starts",
    "",
    "## Services",
    "",
    ...SERVICES.map(
      (s) => `- [${s.title}](${SITE_URL}${serviceHref(s.id)}): from $${s.price}, ${s.duration.toLowerCase()}. ${s.description}`,
    ),
    "",
    `Add-on extras (quoted to suit the vehicle): ${extras.join(", ")}.`,
    "",
    "## FAQ",
    "",
    ...FAQS.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Guides",
    "",
    ...GUIDES.map((g) => `- [${g.title}](${SITE_URL}${guideHref(g.slug)}): ${g.excerpt}`),
    "",
    "## Other pages",
    "",
    `- [All services and prices](${SITE_URL}/services)`,
    `- [About](${SITE_URL}/about)`,
    `- [Terms & Conditions](${SITE_URL}/terms)`,
    `- [Google Maps listing](${BUSINESS.googleMapsUrl})`,
    "",
  ].join("\n");
};
