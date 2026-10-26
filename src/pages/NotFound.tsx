import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";

// Rendered for every unmatched URL. It used to <Navigate> to "/", which search
// engines treat as a soft 404; now the URL stays put and this page explains.
// scripts/prerender.mjs bakes it into dist/404.html (noindex, no canonical) for
// the web server to return with a real 404 status.
const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found | Ryde Car Detailing";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header heroOverlay />
      <main className="flex-1">
        <PageHero
          title="Page not found"
          description="The page you were looking for doesn't exist or has moved. These links will get you back on track."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/">Back to home</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/services">View services &amp; prices</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/book">Get a quote</Link>
            </Button>
          </div>
        </PageHero>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
