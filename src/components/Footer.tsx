import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/data/business";
import { SUBURBS } from "@/data/suburbs";
import { SERVICES, serviceHref } from "@/data/services";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = (e: MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("service-area")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "service-area" } });
    }
  };

  return (
    <footer className="py-10 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <Link to="/" className="flex items-start gap-2" aria-label="Ryde Car Detailing home">
              <div className="relative h-14 md:h-16 w-auto -mt-4 md:-mt-5">
                <img
                  src={logo}
                  alt="Ryde Car Detailing logo"
                  className="h-full w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="font-semibold text-foreground pt-0.5">{BUSINESS.name}</span>
            </Link>

            <div className="flex flex-col gap-2">
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-3.5 w-3.5" />
                {BUSINESS.phoneDisplay}
              </a>
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {BUSINESS.addressDisplay}
              </span>
              <Button asChild size="sm" className="mt-1 w-fit">
                <Link to="/book">Book Now</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">Explore</span>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Services
            </Link>
            <Link to="/areas" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Areas
            </Link>
            <Link to="/guides" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Guides
            </Link>
            <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <a
              href="/#service-area"
              onClick={handleContactClick}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">Areas</span>
            {SUBURBS.map((suburb) => (
              <Link
                key={suburb.slug}
                to={`/areas/${suburb.slug}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {suburb.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-foreground">Services</span>
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                to={serviceHref(service.id)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col-reverse md:flex-row items-center md:justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
