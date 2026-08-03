import { Link } from "react-router-dom";
import logo from "@/assets/ryde-logo-Bh-MidXe-removebg-preview.png";

const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2" aria-label="Ryde Car Detailing home">
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full">
              <img
                src={logo}
                alt="Ryde Car Detailing logo"
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">Ryde Car Detailing</span>
              <span className="text-xs text-muted-foreground">109 Blaxland Rd, Ryde NSW 2112</span>
            </div>
          </Link>
          <p className="text-xs text-muted-foreground text-center max-w-md">
            Servicing Ryde, North Ryde, Meadowbank, Gladesville, Macquarie Park, Hunters Hill
          </p>
          <div className="flex flex-col items-center md:items-end gap-2">
            <Link
              to="/terms"
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Ryde Car Detailing. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
