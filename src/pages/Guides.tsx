import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import GuideCardGrid from "@/components/guides/GuideCardGrid";
import CTA from "@/components/CTA";
import { buildPageSchema } from "@/lib/schema";
import { BUSINESS } from "@/data/business";

const Guides = () => {
  const title = `Car Detailing Guides & Advice | ${BUSINESS.name}`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
  ];

  return (
    <PageShell title={title} schema={buildPageSchema("/guides", title, breadcrumbs)} breadcrumbs={breadcrumbs}>
      <PageHero
        title="Car detailing guides for Ryde drivers"
        description="Practical answers on pricing, timing and what each service actually covers, no filler."
      />
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* The cards' titles are h3s; this keeps the outline h1 > h2 > h3. */}
          <h2 className="sr-only">All guides</h2>
          <GuideCardGrid />
        </div>
      </section>
      <CTA />
    </PageShell>
  );
};

export default Guides;
