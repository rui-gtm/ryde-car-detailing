import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildPageSchema } from "@/lib/schema";
import { GUIDES } from "@/data/guides";
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
        description="Practical answers on pricing, timing and what each service actually covers — no filler."
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {GUIDES.map((guide) => (
              <Card key={guide.slug} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link to={`/guides/${guide.slug}`} className="hover:underline underline-offset-4">
                      {guide.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{guide.excerpt}</p>
                  <Link
                    to={`/guides/${guide.slug}`}
                    className="inline-block mt-4 text-sm font-medium text-primary hover:underline"
                  >
                    Read more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Guides;
