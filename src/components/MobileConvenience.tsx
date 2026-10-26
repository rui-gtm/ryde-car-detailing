import { Home, DollarSign, MapPin } from "lucide-react";
import { BUSINESS, RED_ZONE_OUTCALL_FEE } from "@/data/business";
import SectionHeading from "@/components/SectionHeading";

export const points = [
  {
    icon: Home,
    title: "We come to you",
    description: "Home, apartment car park or workplace — no need to drive anywhere or wait in a queue.",
  },
  {
    icon: DollarSign,
    title: "Priced up front",
    description: `Every package has a clear starting price. No outcall fee in the Green Zone, $${RED_ZONE_OUTCALL_FEE} in the Red Zone, and any extra charge for your car's condition is agreed before work starts.`,
  },
  {
    icon: MapPin,
    title: `${BUSINESS.address.addressLocality}-based`,
    description: "A local mobile detailing business, not a national franchise dispatching whoever's free.",
  },
];

// The "mobile convenience" explainer — same content used on the homepage
// (as its own section) and the /services page (as its overview block), since
// it's the same three facts in both places rather than two versions of them.
const MobileConvenience = ({
  heading = "Everything we do is mobile",
  subheading = "Every service happens wherever your car already is.",
}: {
  heading?: string;
  subheading?: string;
}) => (
  <section className="py-24">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionHeading eyebrow="Mobile" title={heading} description={subheading} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {points.map((point) => (
          <div key={point.title} className="rounded-xl border border-border bg-white/[0.06] p-8">
            <point.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
            <h3 className="font-semibold text-foreground mb-1">{point.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MobileConvenience;
