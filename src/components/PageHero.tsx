import type { ReactNode } from "react";

// The compact "centered H1 + paragraph [+ CTA]" header block repeated at the
// top of every secondary page (Services, Areas, Guides, About) — extracted
// here instead of each page re-writing the same container/heading markup.
//
// Deliberately NOT the same component as the homepage's Hero.tsx: that one
// is full-viewport with a background photo and a "Why Choose Us" checklist —
// a genuinely different design for the one page that needs to make a first
// impression, not a variant of this lighter, title-only page header.
const PageHero = ({
  title,
  description,
  children,
  tone = "muted",
}: {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  tone?: "muted" | "plain";
}) => (
  <section className={`py-16 md:py-20 ${tone === "muted" ? "bg-secondary/30" : "bg-background"}`}>
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{title}</h1>
        {description && <p className="text-muted-foreground text-lg">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;
