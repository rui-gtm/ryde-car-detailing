import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "@/pages/Index";
import Book from "@/pages/Book";
import Terms from "@/pages/Terms";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-TLK4PLX939";

export const trackPageView = (url: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>,
) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
};

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/book" element={<Book />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
