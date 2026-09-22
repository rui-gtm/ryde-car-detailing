import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "@/App";
import AppRoutes from "@/AppRoutes";

// Re-exported so scripts/prerender.mjs can generate per-route <title>/meta
// and sitemap.xml from the exact same route list AppRoutes.tsx renders from,
// instead of a separately hand-maintained list (see src/lib/siteRoutes.ts).
export { ALL_ROUTES } from "@/lib/siteRoutes";

export const render = (url: string) => {
  const html = renderToString(
    <AppShell
      router={
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      }
    />,
  );

  return { html };
};
