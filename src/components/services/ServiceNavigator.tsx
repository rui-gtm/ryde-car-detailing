import { SERVICES } from "@/data/services";

// "Jump to what you need" — pills that scroll to each service's card further
// down this same page (the cards carry a matching `id={service.id}`, see
// ServiceCard.tsx), plus the Extra Services section.
const ServiceNavigator = () => (
  <section className="py-6 border-y border-border bg-background sticky top-16 lg:top-20 z-30">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mr-1">
          Jump to:
        </span>
        {SERVICES.map((service) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            className="px-3 py-1.5 rounded-full border border-border text-sm text-foreground/80 hover:border-primary hover:text-foreground transition-colors"
          >
            {service.title}
          </a>
        ))}
        <a
          href="#extra-services"
          className="px-3 py-1.5 rounded-full border border-border text-sm text-foreground/80 hover:border-primary hover:text-foreground transition-colors"
        >
          Extra Services
        </a>
      </div>
    </div>
  </section>
);

export default ServiceNavigator;
