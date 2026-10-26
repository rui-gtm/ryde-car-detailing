import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { type ReactNode, useEffect, useState } from "react";
import AppRoutes from "@/AppRoutes";

type AppShellProps = {
  router: ReactNode;
};

export const AppShell = ({ router }: AppShellProps) => {
  const [queryClient] = useState(() => new QueryClient());
  // The toasters are browser-only, but they must not render on the first
  // client pass: the prerendered HTML doesn't contain them, and any difference
  // makes React discard the whole prerendered page and re-render it (which
  // replays the entrance animations and pushed LCP to ~6s on mobile).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {mounted ? <Toaster /> : null}
        {mounted ? <Sonner /> : null}
        {router}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  return (
    <AppShell
      router={
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      }
    />
  );
};

export default App;

