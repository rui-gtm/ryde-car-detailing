import ServiceCardGrid from "@/components/services/ServiceCardGrid";
import type { ServiceCardVariant } from "@/components/services/ServiceCard";

// Renders the 4 core packages as a heading + grid. Configurable so the exact
// same section works both as the homepage's compact "Our Services" block and
// the /services page's more detailed "What each service covers" block —
// one component, two contexts, instead of two near-duplicate sections.
const Services = ({
  heading = "Our Services",
  subheading = "Professional detailing services tailored to your needs.",
  variant = "compact",
  sectionId = "services",
  tone = "muted",
}: {
  heading?: string;
  subheading?: string;
  variant?: ServiceCardVariant;
  sectionId?: string;
  tone?: "muted" | "plain";
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

        <ServiceCardGrid variant={variant} />
      </div>
    </section>
  );
};

export default Services;
