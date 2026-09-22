// Testimonials shown in Testimonial.tsx. Entries with `source: "google"` are
// copied verbatim from the business's Google Maps listing and are also used
// to build the Review nodes in the JSON-LD graph (see src/lib/schema.ts) —
// only genuine, sourced reviews are declared as structured data there.
import { SERVICES } from "./services";

export type Testimonial = {
  quote: string;
  name: string;
  /** Which package this review is about — one of SERVICES[].title. */
  service: (typeof SERVICES)[number]["title"];
  source?: "google";
};

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Best detail in Ryde, hands down. My car looks brand new.", name: "James R.", service: "Premium Full Detail" },
  { quote: "Fast, friendly, and came to my office. Super convenient.", name: "Melissa T.", service: "Basic Exterior Wash" },
  { quote: "Interior detail removed all pet hair. Amazing!", name: "Alex P.", service: "Interior Deep Clean" },
  { quote: "Great car cleaning service! Got an interior and exterior clean and the car looks fantastic. Super easy to organise and highly recommended. Big thanks for the clean and will be using Ryde Car Detailing again!", name: "Deb R", service: "Premium Full Detail" },
  { quote: "Great communication, service- and job well done. Would recommend!", name: "Saarang J", service: "Basic Exterior Wash" },
  { quote: "Jared was great, punctual and polite. Job done in a couple of hours and the car looked great so thanks for your hard work well done!", name: "Steve H", service: "Interior Deep Clean", source: "google" },
  { quote: "Jared did an excellent job with the ceramic coating. The car looks incredibly glossy and the finish is flawless, highly recommend!", name: "Lucas P", service: "Ceramic Coating", source: "google" },
  { quote: "Fantastic service from Jared. Professional, thorough, and clearly takes pride in his work. Highly recommend!", name: "Brandon L", service: "Premium Full Detail", source: "google" },
  { quote: "Such amazing quality and services with their clean, I am thoroughly impressed. Will 100% be a returning customer", name: "Antonio C", service: "Interior Deep Clean", source: "google" },
  { quote: "Absolutely flawless job — the car looks better than the day I bought it. Attention to detail and professionalism were top-tier.", name: "Jacky Z", service: "Premium Full Detail", source: "google" },
  { quote: "Jared was fantastic working tirelessly to make the car look like new inside and out - all on my driveway. Very convenient & very happy", name: "Steve T", service: "Premium Full Detail", source: "google" },
  { quote: "Jared did SUCH a good job. It was such short notice but he was super professional and attentive, spending over 90 minutes to make sure he did a 5* job. Would really recommend- thank you!", name: "Sarah C", service: "Interior Deep Clean", source: "google" },
];
