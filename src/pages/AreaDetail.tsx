import { Link, useParams } from "react-router-dom";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import { buildSuburbPageSchema } from "@/lib/schema";
import { SUBURBS, findSuburb } from "@/data/suburbs";
import { BUSINESS } from "@/data/business";
import SectionHeading from "@/components/SectionHeading";

const AreaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const suburb = slug ? findSuburb(slug) : undefined;

  if (!suburb) return <NotFound />;

  const url = `/areas/${suburb.slug}`;
  const title = `Mobile Car Detailing in ${suburb.name} | ${BUSINESS.name}`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Areas", url: "/areas" },
    { name: suburb.name, url },
  ];
  const nearby = SUBURBS.filter((s) => s.slug !== suburb.slug).slice(0, 4);

  return (
    <PageShell title={title} schema={buildSuburbPageSchema(suburb, url, title, breadcrumbs)} breadcrumbs={breadcrumbs}>
      <PageHero title={`Mobile Car Detailing in ${suburb.name}`} description={suburb.intro}>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" asChild>
            <Link to="/book">Book Your Detail →</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
            <Link to="/services">View Services & Prices</Link>
          </Button>
        </div>
      </PageHero>

      <Services
        heading={`Every service is available in ${suburb.name}`}
        subheading="Same packages, same prices, brought to your door."
        tone="plain"
      />

      {nearby.length > 0 && (
        <section className="py-24 bg-transparent">
          <div className="container mx-auto px-4 lg:px-8">
            <div>
              <SectionHeading eyebrow="Nearby" title={`We also detail near ${suburb.name}`} className="mb-8" />
              <div className="flex flex-wrap gap-3">
                {nearby.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/areas/${s.slug}`}
                    className="px-5 py-2.5 bg-white/[0.06] rounded-full border border-border hover:border-foreground/40 text-base font-medium text-foreground transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <HowItWorks tone={nearby.length > 0 ? "plain" : "muted"} />

      <FAQ tone={nearby.length > 0 ? "muted" : "plain"} />
      <CTA
        heading={`Ready to book your detail in ${suburb.name}?`}
        bookHref="/book"
        bookLabel="Book Your Detail Today"
      />
    </PageShell>
  );
};

export default AreaDetail;
