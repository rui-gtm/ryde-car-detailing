import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import BookingDialog from "@/components/BookingDialog";

const createServiceId = (title: string) => {
  return `service-${title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
};

const services = [
  {
    title: "Basic Exterior Wash",
    packageValue: "basic",
    description: "Essential exterior care, finished to a premium standard.",
    price: "from $79",
    features: [
      "Hand contact wash for a gentle, swirl-free clean",
      "Dirt, grime & brake-dust removal",
      "Wheel & tyre cleanse",
      "Streak-free exterior windows",
      "Quick-dry, polished finish",
    ],
  },
  {
    title: "Interior Deep Clean",
    packageValue: "basic",
    description: "Restore your cabin to a pristine, hygienic, like-new condition.",
    price: "from $129",
    features: [
      "Full interior vacuum (seats, carpets, mats & boot)",
      "Interior scrub + deep decontamination",
      "Dirt & stain extraction",
      "Dash, console & trim detailing",
      "Crystal-clear, streakless windows",
    ],
  },
  {
    title: "Premium Full Detail",
    packageValue: "premium",
    description: "The complete inside-and-out transformation. Our signature service.",
    price: "from $149",
    features: [
      "Full interior deep clean",
      "Complete exterior wash + wheel clean",
      "Streak-free interior & exterior windows",
      "Interior scrub, stain removal & decontamination",
      "Tyre shine for a refined finish",
      "Full-vehicle vacuum throughout",
    ],
  },
  {
    title: "Ceramic Coating",
    packageValue: "ceramic",
    description: "Elite paint protection with a superior gloss finish.",
    price: "from $499",
    features: [
      "Paint decontamination & professional surface prep",
      "High-gloss, mirror-like finish",
      "UV & chemical resistance",
      "Hydrophobic water-beading performance",
      "10H hardness formula for long-term durability",
      "1-year or 7-year protection kit options",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg">
            Professional detailing services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const serviceId = createServiceId(service.title);
            const titleId = `${serviceId}-title`;

            return (
              <article key={service.title} id={serviceId} aria-labelledby={titleId} className="h-full">
                <Card
                  className={
                    `relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-primary h-full flex flex-col${
                      service.title === "Premium Full Detail" ? " bg-sky-50" : ""
                    }`
                  }
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="relative flex flex-col px-6 pt-6 pb-4 gap-3">
                    {service.title === "Premium Full Detail" ? (
                      <span className="self-start rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                        MOST POPULAR
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide opacity-0"
                      >
                        MOST POPULAR
                      </span>
                    )}
                    <CardTitle id={titleId} className="text-lg font-semibold leading-snug text-foreground">
                      <a href={`#${serviceId}`} className="hover:underline underline-offset-4">
                        {service.title}
                      </a>
                    </CardTitle>
                    <p className="text-sm leading-relaxed text-muted-foreground min-h-[56px]">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 px-6 pt-0 pb-6">
                    <div className="border-t border-border/60 pt-1">
                      <p className="text-2xl font-bold text-primary mt-1">{service.price}</p>
                    </div>
                    <ul className="space-y-2.5 mt-2.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm leading-snug text-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <BookingDialog defaultPackage={service.packageValue}>
                      <Button className="w-full">
                        Book Now
                      </Button>
                    </BookingDialog>
                  </CardFooter>
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
