import { useState, useEffect, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/ryde-logo-Bh-MidXe-removebg-preview.png";

type NavLink =
  | { type: "scroll"; id: string; label: string }
  | { type: "page"; to: string; label: string };

const navLinks: NavLink[] = [
  { type: "scroll", id: "services", label: "Services" },
  { type: "page", to: "/terms", label: "Terms" },
  { type: "scroll", id: "service-area", label: "Contact" },
];

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

  const renderLink = (link: NavLink, className: string) => {
    if (link.type === "page") {
      return (
        <Link
          key={link.label}
          to={link.to}
          className={className}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <a
        key={link.label}
        href={`/#${link.id}`}
        className={className}
        onClick={handleScrollLinkClick(link.id)}
      >
        {link.label}
      </a>
    );
  };

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
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full">
              <img
                src={logo}
                alt="Ryde Car Detailing logo"
                className="h-full w-full object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              renderLink(link, "text-foreground/80 hover:text-foreground transition-colors font-medium"),
            )}
            <Button asChild>
              <Link to="/book">Book Now</Link>
            </Button>
          </nav>

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
            {navLinks.map((link) =>
              renderLink(link, "block py-3 text-foreground/80 hover:text-foreground transition-colors font-medium"),
            )}
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
