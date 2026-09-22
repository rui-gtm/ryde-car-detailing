import { Link, useParams } from "react-router-dom";
import PageShell from "@/components/PageShell";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Users } from "lucide-react";
import { buildServicePageSchema } from "@/lib/schema";
import { SERVICES, serviceSlug, serviceHref } from "@/data/services";
import { BUSINESS } from "@/data/business";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => serviceSlug(s.id) === slug);

  if (!service) return <NotFound />;

  const url = serviceHref(service.id);
  const title = `${service.title} in Ryde NSW | ${BUSINESS.name}`;
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url },
  ];
  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  return (
    <PageShell title={title} schema={buildServicePageSchema(service, url, title, breadcrumbs)} breadcrumbs={breadcrumbs}>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{service.title}</h1>
            <p className="text-muted-foreground text-lg">{service.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> {service.duration}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> {service.bestFor}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start mb-16">
            <Card>
              <CardHeader>
                <CardTitle>What's included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-sky-50">
              <CardHeader>
                <CardTitle>Price</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary mb-2">from ${service.price}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Final price depends on vehicle size and condition — we may ask for photos beforehand to confirm
                  an accurate quote.
                </p>
                <Button size="lg" className="w-full" asChild>
                  <Link to={`/book?package=${service.packageValue}`}>Book {service.title} →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Other services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  to={serviceHref(s.id)}
                  className="p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors text-center"
                >
                  <p className="text-sm font-medium text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">from ${s.price}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">View all services & pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default ServiceDetail;
