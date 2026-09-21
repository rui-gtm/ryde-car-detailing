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
  Armchair,
  type LucideIcon,
} from "lucide-react";
import { EXTRA_SERVICES } from "@/data/extraServices";

// Icons aren't part of the schema.org-facing data (src/data/extraServices.ts)
// since structured data has no concept of an icon — mapped here by label instead.
const ICONS: Record<string, LucideIcon> = {
  "Pet Hair Removal": Dog,
  "Clay Bar Treatment": Sparkles,
  "Exterior Plastics Restoration": Paintbrush,
  "Headlight Restoration": Lightbulb,
  "Ceramic Coating": Shield,
  "Engine Bay Clean": Cog,
  "Step 1 Paint Correction": Eraser,
  "Step 2 Paint Correction": Layers,
  "Deep Steam Clean": Droplets,
  "Deep Seat Extraction": Armchair,
};

const extraServices = EXTRA_SERVICES.map((s) => ({ ...s, icon: ICONS[s.label] }));

const ExtraServices = () => {
  return (
    <section id="extra-services" className="py-20 bg-background scroll-mt-24">
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
