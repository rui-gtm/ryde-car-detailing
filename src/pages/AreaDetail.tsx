import { Link, useParams } from "react-router-dom";
import PageShell from "@/components/PageShell";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle } from "lucide-react";
import { buildSuburbPageSchema } from "@/lib/schema";
import { SUBURBS, findSuburb } from "@/data/suburbs";
import { SERVICES } from "@/data/services";
import { BUSINESS } from "@/data/business";

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
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Mobile Car Detailing in {suburb.name}
            </h1>
            <p className="text-muted-foreground text-lg">{suburb.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button size="lg" asChild>
                <Link to="/book">Book Your Detail →</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">View Services & Prices</Link>
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Every service is available in {suburb.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SERVICES.map((s) => (
                <Card key={s.id} className="text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold text-primary">from ${s.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xl font-bold text-foreground mb-2">Questions before you book?</h2>
            <p className="text-muted-foreground mb-4">
              Not sure if we service your exact street in {suburb.name}? Give us a call.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <a href={BUSINESS.phoneHref}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call {BUSINESS.phoneDisplay}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/book">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get a Quote
                </Link>
              </Button>
            </div>
          </div>

          {nearby.length > 0 && (
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl font-bold text-foreground mb-4">We also detail near {suburb.name}</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {nearby.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/areas/${s.slug}`}
                    className="px-4 py-2 bg-card rounded-full border border-border hover:border-primary text-sm font-medium text-foreground transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
};

export default AreaDetail;
