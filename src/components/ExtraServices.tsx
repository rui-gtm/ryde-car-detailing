import {
  Dog,
  Sparkles,
  Paintbrush,
  Lightbulb,
  Shield,
  Cog,
  Eraser,
  Layers,
  Droplets,
  Armchair
} from "lucide-react";

const extraServices = [
  { icon: Dog, label: "Pet Hair Removal" },
  { icon: Sparkles, label: "Clay Bar Treatment" },
  { icon: Paintbrush, label: "Exterior Plastics Restoration" },
  { icon: Lightbulb, label: "Headlight Restoration" },
  { icon: Shield, label: "Ceramic Coating" },
  { icon: Cog, label: "Engine Bay Clean" },
  { icon: Eraser, label: "Step 1 Paint Correction" },
  { icon: Layers, label: "Step 2 Paint Correction" },
  { icon: Droplets, label: "Deep Steam Clean" },
  { icon: Armchair, label: "Deep Seat Extraction" },
];

const ExtraServices = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Extra Services</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {extraServices.map((service, index) => (
            <div
              key={service.label}
              className="group p-6 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-300 text-center"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <service.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-medium text-foreground">{service.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraServices;
