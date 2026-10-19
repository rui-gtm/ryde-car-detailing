import { Card, CardContent } from "@/components/ui/card";
import { TRUST_BADGES } from "@/data/trustBadges";
import SectionHeading from "@/components/SectionHeading";

// Full "why choose us" section with descriptions — this supersedes the
// compact icon+label badge row that used to be duplicated at the bottom of
// both Testimonial.tsx and About.tsx (same 4 facts, two places). Now there's
// one detailed version here, and About.tsx reuses the same TRUST_BADGES data
// for its own compact row instead of retyping the four facts.
const WhyUs = () => (
  <section id="why-us" className="py-24 bg-transparent scroll-mt-24">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionHeading eyebrow="Why us" title="Why Choose Us" description="What sets our mobile detailing apart." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRUST_BADGES.map((badge) => (
          <Card
            key={badge.text}
            className="border-0 text-center hover:shadow-md transition-all duration-300"
          >
            <CardContent className="p-6">
              <badge.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{badge.text}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{badge.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
