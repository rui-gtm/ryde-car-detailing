import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { BUSINESS, AREA_SERVED_TEXT } from "@/data/business";

const footerLinks = [
  { to: "/services", label: "Services & Pricing" },
  { to: "/areas", label: "Areas We Service" },
  { to: "/guides", label: "Guides" },
  { to: "/about", label: "About" },
  { to: "/terms", label: "Terms & Conditions" },
];

const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <Link to="/" className="flex items-center gap-2" aria-label="Ryde Car Detailing home">
            <div className="relative h-14 md:h-16 w-auto">
              <img
                src={logo}
                alt="Ryde Car Detailing logo"
                className="h-full w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">{BUSINESS.name}</span>
              <span className="text-xs text-muted-foreground">{BUSINESS.addressDisplay}</span>
            </div>
          </Link>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <p className="text-xs text-muted-foreground max-w-md">Servicing {AREA_SERVED_TEXT}</p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
