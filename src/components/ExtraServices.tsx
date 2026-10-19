import ExtraServicesGrid from "@/components/services/ExtraServicesGrid";
import SectionHeading from "@/components/SectionHeading";

// Reused as-is on both the homepage and the /services page's "Extra
// Services" section — identical content in both places, so it's the same
// component rather than two copies of the same heading + grid.
const ExtraServices = () => {
  return (
    <section id="extra-services" className="py-24 bg-transparent scroll-mt-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          eyebrow="Add-ons" title="Extra Services"
          description="Add-ons quoted to suit your vehicle, booked with any package."
        />

        <ExtraServicesGrid />
      </div>
    </section>
  );
};

export default ExtraServices;
