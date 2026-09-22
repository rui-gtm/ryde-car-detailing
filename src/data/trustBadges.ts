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
    text: "Professional Detailers",
    description: "Trained, experienced detailers who take pride in the work.",
  },
  {
    icon: Leaf,
    text: "Eco-Friendly Products",
    description: "Effective cleaning that's kinder to your car and the environment.",
  },
  {
    icon: ThumbsUp,
    text: "100% Satisfaction Guarantee",
    description: "Not happy with the result? Let us know within 24 hours and we'll make it right.",
  },
];
