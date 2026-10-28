import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Clock, Users } from "lucide-react";
import { serviceHref, type ServicePackage } from "@/data/services";
import basicImage from "@/assets/exterior-foam.jpg";
import fullImage from "@/assets/interiorImage-4.jpg";
import ceramicImage from "@/assets/ceramic-garage.jpg";

// Real job photos for each package, keyed by packageValue.
const PHOTOS: Record<string, { src: string; alt: string }> = {
  basic: { src: basicImage, alt: "BMW covered in thick foam during a hand wash" },
  premium: { src: fullImage, alt: "Freshly detailed Porsche Macan interior with cleaned seats and floor mats" },
  ceramic: { src: ceramicImage, alt: "White Porsche Macan with a deep gloss finish in a detailing garage" },
};

export type ServiceCardVariant = "compact" | "detailed";

// One service package card. Used by ServiceCardGrid, which is itself reused
// by both the homepage "Our Services" section and the /services page's
// "What each service covers" section — same card, same data, two contexts.
// The most popular package is inverted (dark card) so it reads as the
// recommended option without a badge gimmick.
const ServiceCard = ({
  service,
  variant = "compact",
}: {
  service: ServicePackage;
  variant?: ServiceCardVariant;
  index?: number;
}) => {
  const isPopular = service.title === "Full Detail";
  const detailed = variant === "detailed";
  const titleId = `${service.id}-title`;
  const href = serviceHref(service.id);

  return (
    <article id={service.id} aria-labelledby={titleId} className="h-full scroll-mt-28">
      <div
        className={`flex h-full flex-col rounded-xl border p-7 transition-colors duration-200 lg:p-8 ${
          isPopular
            ? "border-white/40 bg-white/10 text-white"
            : "border-border bg-white/[0.06] text-card-foreground hover:border-white/40"
        }`}
      >
        {PHOTOS[service.packageValue] && (
          <img
            src={PHOTOS[service.packageValue].src}
            alt={PHOTOS[service.packageValue].alt}
            className="mb-6 aspect-[4/3] w-full rounded-lg object-cover object-[50%_60%]"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="flex items-start justify-between gap-3">
          <h3 id={titleId} className="text-xl font-semibold leading-snug">
            <Link to={href} className="underline-offset-4 hover:underline">
              {service.title}
            </Link>
          </h3>
          {isPopular && (
            <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white ring-1 ring-white/20">
              Most popular
            </span>
          )}
        </div>

        <p className={`mt-4 min-h-[3.5rem] text-base leading-relaxed ${isPopular ? "text-white/70" : "text-muted-foreground"}`}>
          {service.description}
        </p>

        {detailed && (
          <div className={`mt-4 flex flex-col gap-1.5 text-xs ${isPopular ? "text-white/70" : "text-muted-foreground"}`}>
            <span className="flex items-start gap-1.5">
              <Users className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {service.bestFor}
            </span>
          </div>
        )}

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="flex items-baseline gap-2">
              <span className={`text-base ${isPopular ? "text-white/70" : "text-muted-foreground"}`}>From</span>
              <span className="text-6xl font-bold leading-none tracking-tight">${service.price}</span>
            </p>
            <p className={`mt-2 text-sm ${isPopular ? "text-white/60" : "text-muted-foreground"}`}>per service</p>
          </div>
          <span className="mb-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white">
            <Clock className="h-3.5 w-3.5" />
            {service.duration}
          </span>
        </div>

        <Button size="lg" className="mt-6 h-12 w-full text-base" asChild>
          <Link to={`/book?package=${service.packageValue}`}>Book now</Link>
        </Button>

        <ul className={`mt-8 flex-1 space-y-4 border-t pt-8 ${isPopular ? "border-white/20" : "border-border"}`}>
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className="mt-1 h-5 w-5 shrink-0 text-white" />
              <span className={`text-base leading-snug ${isPopular ? "text-white/90" : "text-foreground"}`}>{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          to={href}
          className={`mt-8 text-center text-sm font-medium ${isPopular ? "text-white/80 hover:text-white" : "text-primary"}`}
        >
          View details
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
