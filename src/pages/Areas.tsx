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
import SectionHeading from "@/components/SectionHeading";

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
          <Link to="/book">Get a Quote →</Link>
        </Button>
      </PageHero>
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Areas" title="Find your suburb"
            description="We service Ryde and the surrounding suburbs below, tap yours for local pricing and details."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {SUBURBS.map((suburb) => (
              <Link
                key={suburb.slug}
                to={`/areas/${suburb.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-border bg-white/[0.06] p-6 transition-colors hover:border-foreground/30"
              >
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-lg font-medium text-foreground">
                  {suburb.name}
                </span>
              </Link>
            ))}
          </div>

          <div>
            <p className="text-muted-foreground">
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
