import { Link, useParams } from "react-router-dom";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import { EXTRA_SERVICE_ICONS } from "@/components/services/ExtraServicesGrid";
import { buildServicePageSchema } from "@/lib/schema";
import { SERVICES, serviceSlug, serviceHref } from "@/data/services";
import { BUSINESS } from "@/data/business";
import SectionHeading from "@/components/SectionHeading";
import CeramicMedia from "@/components/CeramicMedia";
import CeramicPricing from "@/components/CeramicPricing";
import foamPhoto from "@/assets/exterior-foam.jpg";
import interiorPhoto from "@/assets/interiorImage-4.jpg";
import exteriorPhoto from "@/assets/before-after/bmw-exterior-after.jpg";

// Photos for the non-ceramic service pages: one beside the overview, and one on top of each inclusion card.
const ABOUT_PHOTOS: Record<string, { src: string; alt: string }> = {
  basic: { src: foamPhoto, alt: "BMW covered in thick foam during a hand wash" },
};
const GROUP_PHOTOS: Record<string, { src: string; alt: string }> = {
  Interior: { src: interiorPhoto, alt: "Freshly detailed Porsche Macan interior with cleaned seats and floor mats" },
  Exterior: { src: exteriorPhoto, alt: "BMW with a clean, glossy exterior after a hand wash" },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => serviceSlug(s.id) === slug);

  if (!service) return <NotFound />;

  const url = serviceHref(service.id);
  const title = `${service.title} in Ryde NSW | ${BUSINESS.name}`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url },
  ];
  const otherServices = SERVICES.filter((s) => s.id !== service.id);
  const hasInclusions = !!service.inclusionGroups;
  const isCeramic = service.packageValue === "ceramic";
  const aboutText = `${service.title} is a ${service.serviceType.toLowerCase()} service carried out entirely at your home, apartment car park or workplace across ${BUSINESS.address.addressLocality} and nearby suburbs. There's no workshop and no drop-off. You provide access to mains water and a power outlet, and the car doesn't need to move. It typically takes ${service.duration.toLowerCase()} and is best suited to ${service.bestFor.charAt(0).toLowerCase()}${service.bestFor.slice(1)}`;

  return (
    <PageShell
      title={title}
      schema={buildServicePageSchema(service, url, title, breadcrumbs)}
      breadcrumbs={breadcrumbs}
      hero={!isCeramic}
    >
      {isCeramic ? (
        // The ceramic page opens straight on the price; the heading is kept for screen readers and search.
        <h1 className="sr-only">{service.title}</h1>
      ) : (
        <PageHero title={service.title} description={service.description} />
      )}

      {isCeramic ? (
        <>
          <CeramicPricing service={service} />
          <CeramicMedia />
        </>
      ) : (
        <>
      <section className="py-24 bg-transparent" aria-labelledby="about-service-title">
        <div className="container mx-auto px-4 lg:px-8">
          <div
            className={`grid gap-10 lg:gap-20 ${
              ABOUT_PHOTOS[service.packageValue] ? "lg:grid-cols-2 lg:items-center" : "lg:grid-cols-[2fr_3fr]"
            }`}
          >
            <div>
              <SectionHeading eyebrow="Overview" title="About this service" className={ABOUT_PHOTOS[service.packageValue] ? "" : "mb-0"} />
              {ABOUT_PHOTOS[service.packageValue] && (
                <p id="about-service-title" className="text-xl leading-relaxed text-muted-foreground">
                  {aboutText}
                </p>
              )}
            </div>
            {ABOUT_PHOTOS[service.packageValue] ? (
              <img
                src={ABOUT_PHOTOS[service.packageValue].src}
                alt={ABOUT_PHOTOS[service.packageValue].alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
              />
            ) : (
              <p id="about-service-title" className="text-xl leading-relaxed text-muted-foreground">
                {aboutText}
              </p>
            )}
          </div>
        </div>
      </section>

      {service.inclusionGroups && (
        <section className="py-24 bg-transparent scroll-mt-24" aria-labelledby="inclusions-title">
          <div className="container mx-auto px-4 lg:px-8">
            <div>
              <SectionHeading eyebrow="Included" title={`What the ${service.title} includes`} />
              <div className="grid sm:grid-cols-2 gap-6">
                {service.inclusionGroups.map((group) => (
                  <Card key={group.label}>
                    {GROUP_PHOTOS[group.label] && (
                      <img
                        src={GROUP_PHOTOS[group.label].src}
                        alt={GROUP_PHOTOS[group.label].alt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full rounded-t-lg object-cover"
                      />
                    )}
                    <CardHeader>
                      <CardTitle>{group.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {group.items.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                            <span className="text-sm text-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        id="pricing"
        className={`py-24 scroll-mt-24 ${hasInclusions ? "bg-transparent" : "bg-transparent"}`}
        aria-labelledby="pricing-title"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div>
            <SectionHeading eyebrow="Pricing" title={`${service.title} Price`} />
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <Card className="h-full border-white/40 bg-white/10 text-white">
                <CardContent className="p-8">
                  <p className="text-sm uppercase tracking-wider text-white/60">Starting from</p>
                  <p className="mt-1 mb-3 text-6xl font-semibold tracking-tight">${service.price}</p>
                  <p className="text-base text-white/70 mb-8">
                    Final price depends on vehicle size and condition.
                  </p>
                  <Button size="lg" className="w-full" asChild>
                    <Link to={`/book?package=${service.packageValue}`}>Book Now →</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl">Often paired with</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <ul className="space-y-4">
                    {service.recommendedExtras.map((extra) => {
                      const Icon = EXTRA_SERVICE_ICONS[extra];
                      return (
                        <li key={extra} className="flex items-center gap-3">
                          <Icon className="w-6 h-6 shrink-0 text-primary" />
                          <span className="text-base font-medium text-foreground">{extra}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

        </>
      )}

      <Services
        sectionId="other-services"
        heading="Other services"
        subheading="Explore the rest of our detailing packages."
        variant="detailed"
        tone={hasInclusions ? "muted" : "plain"}
        services={otherServices}
        footer={
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            View all services & pricing →
          </Link>
        }
      />

      <HowItWorks tone={hasInclusions ? "plain" : "muted"} />

      <FAQ
        tone={hasInclusions ? "muted" : "plain"}
        faqs={service.faqs}
        title={`${service.title} FAQs`}
      />
      <CTA
        heading={`Ready to book your ${service.title}?`}
        bookHref={`/book?package=${service.packageValue}`}
        bookLabel={`Book ${service.title} Today`}
      />
    </PageShell>
  );
};

export default ServiceDetail;
