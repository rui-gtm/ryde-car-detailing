import type { ReactNode } from "react";
import ServiceCardGrid from "@/components/services/ServiceCardGrid";
import type { ServiceCardVariant } from "@/components/services/ServiceCard";
import type { ServicePackage } from "@/data/services";

// Renders the core packages as a heading + grid. Configurable so the exact
// same section works both as the homepage's compact "Our Services" block, the
// /services page's more detailed "What each service covers" block, and a
// service detail page's "Other services" block — one component, several
// contexts, instead of near-duplicate sections.
const Services = ({
  heading = "Our Services",
  subheading = "Professional detailing services tailored to your needs.",
  variant = "compact",
  sectionId = "services",
  tone = "muted",
  services,
  footer,
}: {
  heading?: string;
  subheading?: string;
  variant?: ServiceCardVariant;
  sectionId?: string;
  tone?: "muted" | "plain";
  services?: ServicePackage[];
  footer?: ReactNode;
}) => {
  return (
    <section
      id={sectionId}
      className={`py-20 scroll-mt-24 ${tone === "muted" ? "bg-secondary/30" : "bg-background"}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          <p className="text-muted-foreground text-lg">{subheading}</p>
        </div>

        <ServiceCardGrid variant={variant} services={services} />

        {footer && <div className="text-center mt-12">{footer}</div>}
      </div>
    </section>
  );
};

export default Services;
