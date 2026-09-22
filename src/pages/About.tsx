import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import BookCta from "@/components/BookCta";
import { Shield, Users, Leaf, ThumbsUp, Check, X } from "lucide-react";
import { buildPageSchema } from "@/lib/schema";
import { BUSINESS, AREA_SERVED_TEXT } from "@/data/business";
import { SERVICES, serviceHref } from "@/data/services";
import { findTermsSection } from "@/data/terms";

// Reuses the Scope of Service section already defined once in
// src/data/terms.ts (for Terms.tsx), instead of re-listing the same
// inclusions/exclusions in different words on this page.
const scopeSection = findTermsSection("Scope of Service");

const trustBadges = [
  { icon: Shield, text: "Fully Insured" },
  { icon: Users, text: "Professional Detailers" },
  { icon: Leaf, text: "Eco-Friendly Products" },
  { icon: ThumbsUp, text: "100% Satisfaction Guarantee" },
];

const About = () => {
  const title = `About Us | ${BUSINESS.name}`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ];

  return (
    <PageShell title={title} schema={buildPageSchema("/about", title, breadcrumbs)} breadcrumbs={breadcrumbs}>
      <PageHero title="Your local Ryde detailer" description={BUSINESS.description} />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* TODO (content): replace with the real detailer's name, a photo,
              and 1-2 sentences of real bio — see ref/SEO-AEO-GEO-Audit.md §13.
              Left generic until that's confirmed, rather than inventing a name. */}
          <div className="max-w-2xl mx-auto mb-16 p-6 md:p-8 bg-card rounded-xl border border-border text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">Who does the work</h2>
            <p className="text-muted-foreground leading-relaxed">
              {BUSINESS.name} is a locally operated mobile detailing business based in{" "}
              {BUSINESS.address.addressLocality} NSW. Every job is done by a professional detailer who turns up on
              time, brings everything needed, and treats your car the way they'd treat their own.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Why choose us</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex flex-col items-center gap-2 justify-center p-5 bg-card rounded-lg border border-border text-center"
                >
                  <badge.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-foreground">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Services, priced up front
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  to={serviceHref(s.id)}
                  className="p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors text-center"
                >
                  <p className="text-sm font-medium text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">from ${s.price}</p>
                </Link>
              ))}
            </div>
          </div>

          {scopeSection && (
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                What detailing can — and can't — do
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" /> What we do
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Exterior washing, interior deep cleaning, stain and pet hair removal, and ceramic coating —
                    significantly improving the look and condition of your vehicle.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <X className="w-4 h-4 text-muted-foreground" /> What we don't do (unless quoted separately)
                  </h3>
                  <ul className="text-sm text-muted-foreground leading-relaxed space-y-1">
                    {scopeSection.items?.slice(0, 6).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Full detail in our{" "}
                <Link to="/terms" className="underline hover:text-foreground">
                  Terms & Conditions
                </Link>
                .
              </p>
            </div>
          )}

          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-xl font-bold text-foreground mb-2">Where we work</h2>
            <p className="text-muted-foreground">
              {AREA_SERVED_TEXT}, and surrounding suburbs.{" "}
              <Link to="/areas" className="text-primary hover:underline">
                See all areas →
              </Link>
            </p>
          </div>

          <BookCta />
        </div>
      </section>
    </PageShell>
  );
};

export default About;
