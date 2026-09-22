import { Link, useParams } from "react-router-dom";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Users } from "lucide-react";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { EXTRA_SERVICE_ICONS } from "@/components/services/ExtraServicesGrid";
import { buildServicePageSchema } from "@/lib/schema";
import { SERVICES, serviceSlug, serviceHref } from "@/data/services";
import { BUSINESS } from "@/data/business";

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

  return (
    <PageShell title={title} schema={buildServicePageSchema(service, url, title, breadcrumbs)} breadcrumbs={breadcrumbs}>
      <PageHero title={service.title} description={service.description}>
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> {service.duration}
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> {service.bestFor}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link to={`/book?package=${service.packageValue}`}>Book Now →</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#pricing">See Pricing</a>
          </Button>
        </div>
      </PageHero>

      <section className="py-16 md:py-20 bg-background" aria-labelledby="about-service-title">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="about-service-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About this service
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {service.title} is a {service.serviceType.toLowerCase()} carried out entirely at your home,
              apartment car park or workplace across {BUSINESS.address.addressLocality} and nearby suburbs. There's
              no workshop and no drop-off — water, power, products and equipment all travel with the detailer, and
              the car doesn't need to move. It typically takes {service.duration.toLowerCase()}, and suits{" "}
              {service.bestFor.toLowerCase()}
            </p>
          </div>
        </div>
      </section>

      {service.inclusionGroups && (
        <section className="py-16 md:py-20 bg-secondary/30 scroll-mt-24" aria-labelledby="inclusions-title">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 id="inclusions-title" className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
                What the {service.title} includes
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {service.inclusionGroups.map((group) => (
                  <Card key={group.label} className="border-0">
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
        className={`py-16 md:py-20 scroll-mt-24 ${hasInclusions ? "bg-background" : "bg-secondary/30"}`}
        aria-labelledby="pricing-title"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              {service.title} Price
            </h2>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <Card className="bg-sky-50 h-full">
                <CardContent className="pt-6">
                  <p className="text-4xl font-bold text-primary mb-2">from ${service.price}</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Final price depends on vehicle size and condition.
                  </p>
                  <Button size="lg" className="w-full" asChild>
                    <Link to={`/book?package=${service.packageValue}`}>Book Now →</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Often paired with</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {service.recommendedExtras.map((extra) => {
                      const Icon = EXTRA_SERVICE_ICONS[extra];
                      return (
                        <li key={extra} className="flex items-center gap-3">
                          <Icon className="w-6 h-6 shrink-0 text-primary" />
                          <span className="text-sm font-medium text-foreground">{extra}</span>
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

      <section
        className={`py-16 md:py-20 ${hasInclusions ? "bg-secondary/30" : "bg-background"}`}
        aria-labelledby="other-services-title"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="other-services-title" className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
              Other services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {otherServices.map((s) => (
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
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">View all services & pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FAQ
        tone={hasInclusions ? "plain" : "muted"}
        faqs={service.faqs}
        title={`${service.title} FAQs`}
        description="If your question is not here, call 0411 666 174."
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
