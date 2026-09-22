import { useState, useEffect, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { SERVICES, serviceHref } from "@/data/services";

type NavLink =
  | { type: "scroll"; id: string; label: string }
  | { type: "page"; to: string; label: string };

// "Services" is rendered separately (see the dropdown markup below) since it
// needs a hover dropdown; everything else is a plain link.
const navLinks: NavLink[] = [
  { type: "page", to: "/areas", label: "Areas" },
  { type: "page", to: "/guides", label: "Guides" },
  { type: "page", to: "/about", label: "About" },
  { type: "scroll", id: "service-area", label: "Contact" },
];

// A nav item is "active" on its own page and any of its sub-pages
// (e.g. "/services" is active on "/services/ceramic-coating" too).
// "/" only matches the homepage exactly, otherwise it'd match every route.
const isPathActive = (to: string, pathname: string) =>
  to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

const navLinkClass = (active: boolean) =>
  `font-medium transition-colors ${active ? "text-primary" : "text-foreground/80 hover:text-foreground"}`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: MouseEvent) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollLinkClick = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLink = (link: NavLink, extraClassName: string) => {
    if (link.type === "page") {
      const active = isPathActive(link.to, location.pathname);
      return (
        <Link
          key={link.label}
          to={link.to}
          className={`${navLinkClass(active)} ${extraClassName}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      );
    }
    // Scroll links target a section, not a route, so there's no "active page" to highlight.
    return (
      <a
        key={link.label}
        href={`/#${link.id}`}
        className={`${navLinkClass(false)} ${extraClassName}`}
        onClick={handleScrollLinkClick(link.id)}
      >
        {link.label}
      </a>
    );
  };

  const isHomeActive = isPathActive("/", location.pathname);
  const isServicesActive = isPathActive("/services", location.pathname);

  return (
    <header
      className={"fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm"}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo (clickable) */}
          {/* When clicked, go to (or scroll to the top of) the home page */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 focus:outline-none"
            aria-label="Ryde Car Detailing logo"
          >
            <div className="relative h-14 md:h-16 w-auto">
              <img
                src={logo}
                alt="Ryde Car Detailing logo"
                className="h-full w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
          </Link>

          {/* Desktop Navigation — centered between the logo and Book Now button */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <Link to="/" className={navLinkClass(isHomeActive)}>
              Home
            </Link>
            <div className="relative group py-2 -my-2">
              <Link to="/services" className={`flex items-center gap-1 ${navLinkClass(isServicesActive)}`}>
                Services
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-border py-2 min-w-[220px]">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      to={serviceHref(service.id)}
                      className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {navLinks.map((link) => renderLink(link, ""))}
          </nav>

          <Button asChild className="hidden md:inline-flex">
            <Link to="/book">Book Now</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border bg-white">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-3 ${navLinkClass(isHomeActive)}`}
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-3 ${navLinkClass(isServicesActive)}`}
            >
              Services
            </Link>
            <div className="pl-4 pb-2 flex flex-col gap-1">
              {SERVICES.map((service) => (
                <Link
                  key={service.id}
                  to={serviceHref(service.id)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            </div>
            {navLinks.map((link) => renderLink(link, "block py-3"))}
            <Button asChild className="w-full mt-4">
              <Link to="/book" onClick={() => setIsMobileMenuOpen(false)}>
                Book Now
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
