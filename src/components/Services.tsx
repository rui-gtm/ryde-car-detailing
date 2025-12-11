import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import BookingDialog from "@/components/BookingDialog";

const services = [
  {
    title: "Basic Exterior Wash",
    description: "Perfect for regular upkeep.",
    price: "from $79",
    features: [
      "Hand wash & dry",
      "Wheel & tyre clean",
      "Windows exterior",
      "Tyre shine",
    ],
  },
  {
    title: "Premium Full Detail",
    description: "Our most popular option.",
    price: "from $189",
    features: [
      "Full exterior wash + wax",
      "Interior vacuum",
      "Dash, doors & trims",
      "Windows inside & out",
      "Wheel deep clean",
      "Deodorise",
    ],
  },
  {
    title: "Interior Deep Clean",
    description: "For families, pets & rideshare vehicles.",
    price: "from $159",
    features: [
      "Full interior vacuum",
      "Carpet & seat shampoo",
      "Leather clean & condition",
      "Stain removal",
      "Pet hair removal (optional add-on)",
    ],
  },
  {
    title: "Ceramic Coating",
    description: "Long-lasting protection & gloss.",
    price: "from $499",
    features: [
      "Paint decontamination",
      "Clay bar treatment",
      "Ceramic coating application",
      "6–12 months protection",
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
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-primary h-full flex flex-col`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{service.description}</p>
                <p className="text-2xl font-bold text-primary mt-2">{service.price}</p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <BookingDialog>
                  <Button className="w-full">
                    Book Now
                  </Button>
                </BookingDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
