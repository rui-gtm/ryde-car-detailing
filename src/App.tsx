import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { type ReactNode, useState } from "react";
import AppRoutes from "@/AppRoutes";

type AppShellProps = {
  router: ReactNode;
};

export const AppShell = ({ router }: AppShellProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const isBrowser = typeof window !== "undefined";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isBrowser ? <Toaster /> : null}
        {isBrowser ? <Sonner /> : null}
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

