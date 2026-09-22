import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowUpRight, Clock, Users } from "lucide-react";
import { serviceHref, type ServicePackage } from "@/data/services";

export type ServiceCardVariant = "compact" | "detailed";

// One service package card. Used by ServiceCardGrid, which is itself reused
// by both the homepage "Our Services" section and the /services page's
// "What each service covers" section — same card, same data, two contexts.
const ServiceCard = ({
  service,
  variant = "compact",
  index = 0,
}: {
  service: ServicePackage;
  variant?: ServiceCardVariant;
  index?: number;
}) => {
  const isPopular = service.title === "Premium Full Detail";
  const detailed = variant === "detailed";
  const titleId = `${service.id}-title`;
  const href = serviceHref(service.id);

  return (
    <article id={service.id} aria-labelledby={titleId} className="h-full scroll-mt-28">
      <Card
        className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-primary h-full flex flex-col${
          isPopular ? " bg-sky-50" : ""
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardHeader className="relative flex flex-col px-6 pt-6 pb-4 gap-3">
          {isPopular ? (
            <span className="self-start rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
              MOST POPULAR
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide opacity-0"
            >
              MOST POPULAR
            </span>
          )}
          <CardTitle id={titleId} className="text-lg font-semibold leading-snug text-foreground">
            <Link to={href} className="hover:underline underline-offset-4">
              {service.title}
            </Link>
          </CardTitle>
          <p className="text-sm leading-relaxed text-muted-foreground min-h-[56px]">{service.description}</p>
          {detailed && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                {service.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-primary shrink-0" />
                {service.bestFor}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-1 px-6 pt-0 pb-6">
          <div className="border-t border-border/60 pt-1">
            <p className="text-2xl font-bold text-primary mt-1">from ${service.price}</p>
          </div>
          <ul className="space-y-2.5 mt-2.5">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm leading-snug text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="mt-auto flex flex-col gap-2 items-stretch">
          <Button className="w-full" asChild>
            <Link to={`/book?package=${service.packageValue}`}>Book Now</Link>
          </Button>
          <Link
            to={href}
            className="inline-flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            View Service
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </CardFooter>
      </Card>
    </article>
  );
};

export default ServiceCard;
