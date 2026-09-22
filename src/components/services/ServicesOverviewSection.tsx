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

// "Overview" section — a short explanation of how the service model works,
// above the fold on /services before the full package breakdown.
const ServicesOverviewSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Everything we do is mobile</h2>
        <p className="text-muted-foreground">
          We bring the equipment, water and power — every service below happens wherever your car already is.
        </p>
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

export default ServicesOverviewSection;
