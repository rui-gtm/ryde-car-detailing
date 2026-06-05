import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "@/App";
import AppRoutes from "@/AppRoutes";

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
