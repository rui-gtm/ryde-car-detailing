import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/ryde-logo-Bh-MidXe.jpg";
import BookingDialog from "@/components/BookingDialog";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#service-area", label: "Contact" },
  ];

  return (
    <header
      className={"fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm"}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo (non-clickable) */}
          <div className="flex items-center gap-2" aria-label="Ryde Car Detailing logo">
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full">
              <img
                src={logo}
                alt="Ryde Car Detailing logo"
                className="absolute inset-0 h-full w-full object-cover origin-center scale-[2]"
                loading="eager"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <BookingDialog>
              <Button>
                Book Now
              </Button>
            </BookingDialog>
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-foreground/80 hover:text-foreground transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <BookingDialog>
              <Button className="w-full mt-4">
                Book Now
              </Button>
            </BookingDialog>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
