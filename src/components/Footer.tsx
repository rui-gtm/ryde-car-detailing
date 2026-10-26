import { Link } from "react-router-dom";
import { Phone, MapPin, Instagram } from "lucide-react";
import logo from "@/assets/logo-new.webp";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/data/business";
import { SUBURBS } from "@/data/suburbs";
import { SERVICES, serviceHref } from "@/data/services";

const linkClass = "text-sm text-white/60 transition-colors hover:text-white";
const headingClass = "text-sm font-semibold text-white";

const Footer = () => {
  return (
    <footer className="border-t border-white/15 py-14 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
            <Link to="/" className="flex items-center gap-3" aria-label="Ryde Car Detailing home">
              <img
                src={logo}
                width={600}
                height={233}
                alt="Ryde Car Detailing logo"
                className="h-16 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <span className="font-semibold">{BUSINESS.name}</span>
            </Link>

            <div className="flex flex-col gap-3">
              <a href={BUSINESS.phoneHref} className={`flex items-center gap-2 ${linkClass}`}>
                <Phone className="h-4 w-4" />
                {BUSINESS.phoneDisplay}
              </a>
              <span className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 shrink-0" />
                {BUSINESS.addressDisplay}
              </span>
              {BUSINESS.instagramUrl && (
                <a
                  href={BUSINESS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${linkClass}`}
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              )}
              <Button asChild size="sm" className="mt-1 w-fit">
                <Link to="/book">Get a Quote</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className={headingClass}>Explore</span>
            <Link to="/" className={linkClass}>
              Home
            </Link>
            <Link to="/services" className={linkClass}>
              Services
            </Link>
            <Link to="/areas" className={linkClass}>
              Areas
            </Link>
            <Link to="/guides" className={linkClass}>
              Guides
            </Link>
            <Link to="/about" className={linkClass}>
              About
            </Link>
            <Link to="/book" className={linkClass}>
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className={headingClass}>Areas</span>
            {SUBURBS.map((suburb) => (
              <Link key={suburb.slug} to={`/areas/${suburb.slug}`} className={linkClass}>
                {suburb.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className={headingClass}>Services</span>
            {SERVICES.map((service) => (
              <Link key={service.id} to={serviceHref(service.id)} className={linkClass}>
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-3 border-t border-white/10 pt-6 md:flex-row md:justify-between">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <Link to="/terms" className={linkClass}>
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
