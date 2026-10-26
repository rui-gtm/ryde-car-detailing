// Testimonials shown in Testimonial.tsx. Entries with `source: "google"` are
// copied verbatim from the business's Google Maps listing and are also used
// to build the Review nodes in the JSON-LD graph (see src/lib/schema.ts) —
// only genuine, sourced reviews are declared as structured data there.
import { SERVICES } from "./services";

export type Testimonial = {
  quote: string;
  name: string;
  /** Which package this review is about — one of SERVICES[].title. */
  service: string;
  source?: "google";
  /** When the review was posted, as shown on Google, e.g. "June 2026". */
  date?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Took my car in for a full interior and exterior detail and didn't expect it to come back looking this good. Didn't realise how bad the headlights had got until I saw them cleared up. Cheaper than replacing the units and honestly hard to tell the difference from new. Friendly service the whole way through, no pressure and no upselling. Easy to book, finished when they said they would. Will definitely be back.", name: "Zidane S", service: "Full Detail", source: "google", date: "September 2026" },
  { quote: "Flawless carwash for the CHEAPEST price I have seen in sydney for a while. Very pleased and will come again!", name: "Alejandro P", service: "Basic Exterior Wash", source: "google", date: "September 2026" },
  { quote: "Really happy with the detailing! Jared was very thorough and paid great attention to detail, especially with the interior and all the small gaps and hard-to-reach areas. The car came out looking super clean and fresh. Great service and would definitely recommend!", name: "MJ Z", service: "Full Detail", source: "google", date: "September 2026" },
  { quote: "Jared did an amazing job on my car! The paint correction and detailing came out perfect, and the car looks absolutely mint. Great attention to detail and quality work. Highly recommend!", name: "Adam H", service: "Full Detail", source: "google", date: "September 2026" },
  { quote: "Jared provided an excellent car detailing service. From the booking experience through to the logistics on the day, and of course the end result. Thanks Jared!", name: "Emily G", service: "Full Detail", source: "google", date: "September 2026" },
  { quote: "Jared was great, punctual and polite. Job done in a couple of hours and the car looked great so thanks for your hard work well done!", name: "Steve H", service: "Interior Deep Clean", source: "google", date: "August 2026" },
  { quote: "Jared did an incredible job on my car, was pretty dirty and a new car. After Jared detailed it, it looked better than when I picked it up from the dealership. He did the full wash, polishing and ceramic coating. Super high quality service, very happy and will come back when my car is dirty again.", name: "Ethan", service: "Ceramic Coating", source: "google", date: "July 2026" },
  { quote: "Jared did a great job on my car that was overdue for a really good clean. I would recommend Ryde Car Detailing to anyone who wants the convenience of having someone come to them and do a quality job.", name: "Alma M", service: "Full Detail", source: "google", date: "June 2026" },
  { quote: "Great car cleaning service! Got an interior and exterior clean and the car looks fantastic. Super easy to organise and highly recommended. Big thanks for the clean and will be using Ryde Car Detailing again!", name: "Deb R", service: "Full Detail", source: "google", date: "November 2025" },
];
