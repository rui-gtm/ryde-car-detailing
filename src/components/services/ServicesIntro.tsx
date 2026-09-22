import { Check } from "lucide-react";
import interiorImage from "@/assets/interiorImage-1.jpg";
import exteriorImage from "@/assets/exteriorImage-1.jpg";

const POINTS = [
  "Two-bucket hand washing — never automatic brushes",
  "Machine polishing on the Premium Full Detail and Ceramic Coating packages",
  "Wheels and tyres included in every service",
  "Prices fixed by package, not quoted on arrival",
];

// The /services page's "Overview" block — sits directly under the page hero
// and sets the "everything is mobile, priced up front" framing before the
// service cards and comparison table below get into specifics.
const ServicesIntro = () => {
  return (
    <section className="py-16 md:py-20 bg-background" aria-labelledby="services-overview-title">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          <div>
            <h2 id="services-overview-title" className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Everything we do is mobile
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              There's no workshop. Every service is carried out where your car already is — a driveway, an
              apartment car park or a workplace bay.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Water, power, products and equipment all travel with the detailer. You don't supply anything, and
              the car doesn't move.
            </p>
            <ul className="mt-6 space-y-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src={interiorImage}
              alt="Detailer cleaning the interior of a car"
              className="rounded-2xl w-full aspect-[4/3] object-cover shadow-lg"
              loading="lazy"
            />
            <img
              src={exteriorImage}
              alt="Detailer hand washing the exterior of a car"
              className="hidden sm:block absolute -bottom-6 -left-6 w-2/5 aspect-square object-cover rounded-xl border-4 border-background shadow-lg"
              loading="lazy"
            />
            <span className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-foreground shadow">
              Mobile only
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesIntro;
