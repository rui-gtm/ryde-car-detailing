import { Home, DollarSign, MapPin } from "lucide-react";
import { BUSINESS } from "@/data/business";

const points = [
  {
    icon: Home,
    title: "We come to you",
    description: "Home, apartment car park or workplace — no need to drive anywhere or wait in a queue.",
  },
  {
    icon: DollarSign,
    title: "Priced up front",
    description: "Every package has a clear starting price. No surprise call-out or booking fees.",
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
  subheading = "We bring the equipment, every service happens wherever your car already is.",
}: {
  heading?: string;
  subheading?: string;
}) => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
        <p className="text-muted-foreground text-lg">{subheading}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {points.map((point) => (
          <div key={point.title} className="text-center p-6">
            <point.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">{point.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MobileConvenience;
