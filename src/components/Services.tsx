import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const services = [
  {
    title: "Interior Detail",
    description: "Complete interior transformation",
    price: "from $80",
    features: [
      "Thorough Vacuuming",
      "High-Pressure Air Blasting",
      "Scrubbing & Decontamination",
      "Streakless Windows & Mirrors",
      "Fabric & Carpet Shampooing",
    ],
  },
  {
    title: "Exterior Detail",
    description: "Professional exterior care",
    price: "from $60",
    features: [
      "Full Rims, Tires, Exhaust Cleaning",
      "Pre-Wash, Foam Bath & Contact Wash",
      "Streakless Windows & Mirrors",
      "Tire Shine & Door Jamb Cleaning",
      "Spray On Wax/Sealant",
    ],
  },
  {
    title: "Complete Detail",
    description: "The ultimate detailing package",
    price: "from $150",
    features: [
      "All Interior Services",
      "All Exterior Services",
      "Best Value Package",
      "Additional Services",
    ],
    highlighted: true,
  },
  {
    title: "Ceramic Coating",
    description: "Ultimate long-term protection",
    price: "from $500",
    features: [
      "9H Hardness Protection Layer",
      "Hydrophobic Water Repellent Finish",
      "UV Ray & Oxidation Protection",
      "5+ Year Durability Guarantee",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg">
            Professional detailing services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                service.highlighted ? "ring-2 ring-primary" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{service.description}</p>
                <p className="text-2xl font-bold text-primary mt-2">{service.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="#contact">Book Now</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
