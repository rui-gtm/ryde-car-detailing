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
// since structured data has no concept of an icon — mapped here by label
// instead, and exported so other places that reference an extra service by
// label (e.g. ServiceDetail's "Often paired with") can reuse the same icon.
export const EXTRA_SERVICE_ICONS: Record<string, LucideIcon> = {
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

const extraServices = EXTRA_SERVICES.map((s) => ({ ...s, icon: EXTRA_SERVICE_ICONS[s.label] }));

// Unpriced add-ons as a ruled list rather than a grid of icon cards —
// reused by the homepage's ExtraServices section and the /services page.
const ExtraServicesGrid = () => (
  <ul className="grid grid-cols-1 border-t border-white/[0.06] sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
    {extraServices.map((service) => (
      <li key={service.label} className="flex items-center gap-3 border-b border-white/[0.06] py-4">
        <service.icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
        <h3 className="text-[15px] font-medium text-foreground">{service.label}</h3>
      </li>
    ))}
  </ul>
);

export default ExtraServicesGrid;
