import { createContext, useContext, useEffect, type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import JsonLd from "./JsonLd";
import Breadcrumbs from "./Breadcrumbs";
import type { Crumb } from "@/lib/schema";

// Pages that open with <PageHero> read the trail from here and render it inside
// the dark hero; pages without one (hero={false}) get it above their content.
export const BreadcrumbContext = createContext<Crumb[]>([]);
export const useBreadcrumbs = () => useContext(BreadcrumbContext);

// Shared shell for secondary pages: sets the document title on client-side
// navigation (prerender.mjs already bakes the right <title> into the static
// HTML per-route, this covers SPA navigation), renders the page's JSON-LD,
// and the breadcrumb trail — so each new page file only has to provide its
// own content, not repeat this boilerplate.
const PageShell = ({
  title,
  schema,
  breadcrumbs,
  hero = true,
  children,
}: {
  title: string;
  schema: unknown;
  breadcrumbs: Crumb[];
  /** True when the page opens with a dark <PageHero> the header floats over. */
  hero?: boolean;
  children: ReactNode;
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <BreadcrumbContext.Provider value={breadcrumbs}>
      <div className="min-h-screen flex flex-col">
        <JsonLd data={schema} />
        <Header heroOverlay={hero} />
        <main className={`flex-1 ${hero ? "" : "pt-16 lg:pt-20"}`}>
          {!hero && <Breadcrumbs items={breadcrumbs} />}
          {children}
        </main>
        <Footer />
      </div>
    </BreadcrumbContext.Provider>
  );
};

export default PageShell;
