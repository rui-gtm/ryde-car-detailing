import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { buildPageSchema } from "@/lib/schema";
import { BUSINESS, AREA_SERVED_TEXT } from "@/data/business";
import { SERVICES, serviceHref } from "@/data/services";
import { findTermsSection } from "@/data/terms";
import { TRUST_BADGES } from "@/data/trustBadges";

// Reuses the Scope of Service section already defined once in
// src/data/terms.ts (for Terms.tsx), instead of re-listing the same
// inclusions/exclusions in different words on this page.
const scopeSection = findTermsSection("Scope of Service");

const About = () => {
  const title = `About Us | ${BUSINESS.name}`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ];

  return (
    <PageShell title={title} schema={buildPageSchema("/about", title, breadcrumbs)} breadcrumbs={breadcrumbs}>
      <PageHero title="Your local Ryde detailer" description={BUSINESS.description} />

      <section className="bg-transparent py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* TODO (content): replace with the real detailer's name, a photo,
              and 1-2 sentences of real bio — see ref/SEO-AEO-GEO-Audit.md §13.
              Left generic until that's confirmed, rather than inventing a name. */}
          <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-20">
            <SectionHeading eyebrow="About" title="Who does the work" className="mb-0" />
            <p className="text-xl leading-relaxed text-muted-foreground">
              {BUSINESS.name} is a locally operated mobile detailing business based in {BUSINESS.address.addressLocality}{" "}
              NSW. Every job is done by a professional detailer who turns up on time, and treats your car the way
              they'd treat their own.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-transparent py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Why us" title="Why choose us" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.text} className="rounded-xl border border-border bg-white/[0.06] p-8">
                <badge.icon className="mb-4 h-8 w-8 text-primary" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-foreground">{badge.text}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-transparent py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Pricing" title="Services, priced up front" />
          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                to={serviceHref(s.id)}
                className="group rounded-xl border border-border bg-white/[0.06] p-8 transition-colors hover:border-foreground/30"
              >
                <p className="text-lg font-semibold text-foreground">{s.title}</p>
                <p className="mt-6 text-sm uppercase tracking-wider text-muted-foreground">Starting from</p>
                <p className="mt-1 text-5xl font-semibold tracking-tight text-foreground">${s.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {scopeSection && (
        <section className="bg-transparent py-16 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              eyebrow="Scope" title="What detailing can, and can't, do"
              description={
                <>
                  Full detail in our{" "}
                  <Link to="/terms" className="text-primary underline underline-offset-4">
                    Terms &amp; Conditions
                  </Link>
                  .
                </>
              }
            />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-white/[0.06] p-8">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Check className="h-5 w-5 text-primary" /> What we do
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Exterior washing, interior deep cleaning, stain and pet hair removal, and ceramic coating —
                  significantly improving the look and condition of your vehicle.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-white/[0.06] p-8">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <X className="h-5 w-5 text-muted-foreground" /> What we don't do (unless quoted separately)
                </h3>
                <ul className="space-y-2 text-base text-muted-foreground">
                  {scopeSection.items?.slice(0, 6).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-transparent py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Where we work" title="Servicing Ryde and nearby"
              description={`${AREA_SERVED_TEXT}, and surrounding suburbs.`}
              className="mb-0"
            />
            <Button size="lg" variant="outline" asChild>
              <Link to="/areas">See all areas</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTA />
    </PageShell>
  );
};

export default About;
