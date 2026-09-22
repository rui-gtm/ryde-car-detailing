import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import ServicesIntro from "@/components/services/ServicesIntro";
import Services from "@/components/Services";
import ExtraServices from "@/components/ExtraServices";
import ServiceComparison from "@/components/services/ServiceComparison";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { buildPageSchema } from "@/lib/schema";
import { BUSINESS } from "@/data/business";

const ServicesOverview = () => {
  const title = `Mobile Car Detailing Services & Prices | ${BUSINESS.name}`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ];

  return (
    <PageShell
      title={title}
      schema={buildPageSchema("/services", title, breadcrumbs, { services: true, faq: true })}
      breadcrumbs={breadcrumbs}
    >
      <PageHero
        title={`Mobile car detailing services in ${BUSINESS.address.addressLocality}`}
        description={`Every service is priced up front and comes to you, home, apartment car park or workplace, anywhere across ${BUSINESS.address.addressLocality} and nearby suburbs.`}
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link to="/book">Book Your Detail →</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/areas">View Areas We Service</Link>
          </Button>
        </div>
      </PageHero>
      <ServicesIntro />
      <Services
        heading="What each service covers"
        subheading="Every service is available across Ryde and nearby suburbs, priced up front."
        variant="detailed"
        sectionId="four-services"
        tone="muted"
      />
      <ExtraServices />
      <ServiceComparison />
      <FAQ tone="plain" />
      <CTA />
    </PageShell>
  );
};

export default ServicesOverview;
