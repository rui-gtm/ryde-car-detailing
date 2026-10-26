import type { ReactNode } from "react";
import ServiceCardGrid from "@/components/services/ServiceCardGrid";
import type { ServiceCardVariant } from "@/components/services/ServiceCard";
import type { ServicePackage } from "@/data/services";
import SectionHeading from "@/components/SectionHeading";

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
  fade = false,
  services,
  footer,
}: {
  heading?: string;
  subheading?: string;
  variant?: ServiceCardVariant;
  sectionId?: string;
  tone?: "muted" | "plain";
  /** Brand blue at the top fading to black at the bottom (homepage). */
  fade?: boolean;
  services?: ServicePackage[];
  footer?: ReactNode;
}) => {
  return (
    <section
      id={sectionId}
      style={
        fade
          ? { background: "linear-gradient(180deg, hsl(214 80% 18%) 0%, hsl(var(--ink)) 92%)" }
          : undefined
      }
      className={`py-24 scroll-mt-24 ${tone === "muted" ? "bg-transparent" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading eyebrow="Services" title={heading} description={subheading} />

        <ServiceCardGrid variant={variant} services={services} />

        {footer && <div className="text-center mt-12">{footer}</div>}
      </div>
    </section>
  );
};

export default Services;
