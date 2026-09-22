import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { buildPageSchema } from "@/lib/schema";
import { SUBURBS } from "@/data/suburbs";
import { BUSINESS } from "@/data/business";

const Areas = () => {
  const title = `Areas We Service | ${BUSINESS.name}`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Areas", url: "/areas" },
  ];

  return (
    <PageShell title={title} schema={buildPageSchema("/areas", title, breadcrumbs)} breadcrumbs={breadcrumbs}>
      <PageHero
        title={`Mobile car detailing across ${BUSINESS.address.addressLocality} and nearby suburbs`}
        description="Same services, same prices, wherever you are in our service area. Pick your suburb below."
      >
        <Button size="lg" asChild>
          <Link to="/book">Book Now →</Link>
        </Button>
      </PageHero>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Find your suburb</h2>
            <p className="text-muted-foreground text-lg">
              We service Ryde and the surrounding suburbs below, tap yours for local pricing and details.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            {SUBURBS.map((suburb) => (
              <Link
                key={suburb.slug}
                to={`/areas/${suburb.slug}`}
                className="group flex items-center gap-3 p-5 bg-card rounded-xl hover:shadow-md transition-all"
              >
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {suburb.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center max-w-xl mx-auto">
            <p className="text-muted-foreground text-sm">
              Don't see your suburb listed? We may still be able to help,{" "}
              <a href={BUSINESS.phoneHref} className="text-primary">
                give us a call
              </a>{" "}
              and we'll let you know.
            </p>
          </div>
        </div>
      </section>

      <Services tone="muted" />
      <HowItWorks tone="plain" />

      <FAQ tone="muted" />
      <CTA />
    </PageShell>
  );
};

export default Areas;
