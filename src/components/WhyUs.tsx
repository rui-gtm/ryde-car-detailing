import { TRUST_BADGES } from "@/data/trustBadges";

// Full "why choose us" section with descriptions — this supersedes the
// compact icon+label badge row that used to be duplicated at the bottom of
// both Testimonial.tsx and About.tsx (same 4 facts, two places). Now there's
// one detailed version here, and About.tsx reuses the same TRUST_BADGES data
// for its own compact row instead of retyping the four facts.
const WhyUs = () => (
  <section id="why-us" className="py-20 bg-secondary/30 scroll-mt-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Us</h2>
        <p className="text-muted-foreground text-lg">What sets our mobile detailing apart.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.text}
            className="p-6 bg-card rounded-xl text-center hover:border-primary hover:shadow-md transition-all duration-300"
          >
            <badge.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">{badge.text}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
