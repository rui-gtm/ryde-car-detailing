import { useEffect, type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import JsonLd from "./JsonLd";
import Breadcrumbs from "./Breadcrumbs";
import type { Crumb } from "@/lib/schema";

// Shared shell for secondary pages: sets the document title on client-side
// navigation (prerender.mjs already bakes the right <title> into the static
// HTML per-route, this covers SPA navigation), renders the page's JSON-LD,
// and the breadcrumb trail — so each new page file only has to provide its
// own content, not repeat this boilerplate.
const PageShell = ({
  title,
  schema,
  breadcrumbs,
  children,
}: {
  title: string;
  schema: unknown;
  breadcrumbs: Crumb[];
  children: ReactNode;
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={schema} />
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <Breadcrumbs items={breadcrumbs} />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageShell;
