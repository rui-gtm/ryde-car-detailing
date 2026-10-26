import { Shield, Users, Leaf, ThumbsUp, type LucideIcon } from "lucide-react";

// Single source for the "why trust us" points — previously defined
// identically in both Testimonial.tsx and About.tsx. Now imported by
// WhyUs.tsx (homepage) and About.tsx instead of being retyped.
export type TrustBadge = {
  icon: LucideIcon;
  text: string;
  description: string;
};

export const TRUST_BADGES: TrustBadge[] = [
  {
    icon: Shield,
    text: "Fully Insured",
    description: "Complete peace of mind on every job, every time.",
  },
  {
    icon: Users,
    text: "Professional Detailer",
    description: "A trained, experienced detailer who takes pride in the work.",
  },
  {
    icon: Leaf,
    text: "Eco-Friendly Products",
    description: "Effective cleaning that's kinder to your car and the environment.",
  },
  {
    icon: ThumbsUp,
    // Matches Terms §15: tell us within 24 hours; remedy at our discretion.
    text: "24-Hour Satisfaction Guarantee",
    description:
      "Not happy with the result? Tell us within 24 hours and we'll inspect it and offer a reasonable fix, such as redoing that part of the job.",
  },
];
