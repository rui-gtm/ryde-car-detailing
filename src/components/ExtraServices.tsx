import ExtraServicesGrid from "@/components/services/ExtraServicesGrid";

// Reused as-is on both the homepage and the /services page's "Extra
// Services" section — identical content in both places, so it's the same
// component rather than two copies of the same heading + grid.
const ExtraServices = () => {
  return (
    <section id="extra-services" className="py-20 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Extra Services</h2>
        </div>

        <ExtraServicesGrid />
      </div>
    </section>
  );
};

export default ExtraServices;
