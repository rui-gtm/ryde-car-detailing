import type { ReactNode } from "react";
import { useBreadcrumbs } from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";

// The title block at the top of every secondary page. Dark, like the homepage
// hero, so the transparent header and the footer/CTA bands all belong to one
// system. Left-aligned with the breadcrumb trail inside it.
//
// Deliberately NOT the same component as the homepage's Hero.tsx: that one is
// full-viewport with the animated photo — a one-off for the first impression.
const PageHero = ({
  title,
  description,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** @deprecated kept so existing call sites compile; the hero is always dark now. */
  tone?: "muted" | "plain";
}) => {
  const crumbs = useBreadcrumbs();
  return (
    <section className="relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_85%_0%,hsl(var(--primary)/0.22),transparent_60%)]" />
      <div className="container relative mx-auto px-4 lg:px-8 pb-16 pt-36 md:pb-20 md:pt-44">
        {crumbs.length > 1 && (
          <div className="mb-8">
            <Breadcrumbs items={crumbs} onDark />
          </div>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};

export default PageHero;
