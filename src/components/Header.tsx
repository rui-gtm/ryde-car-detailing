import { useState, useEffect, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowUpRight, Instagram } from "lucide-react";
import logo from "@/assets/logo-new.png";
import { SERVICES, serviceHref } from "@/data/services";
import { BUSINESS } from "@/data/business";

// Minimal nav: logo, four links (Home, Services, Portfolio, About), one button. Areas / Guides / Terms stay
// reachable from the footer and the full-screen mobile menu.
const isPathActive = (to: string, pathname: string) =>
  to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

const linkClass = (active: boolean, onDark: boolean) =>
  onDark
    ? `text-sm font-medium transition-colors ${active ? "text-white" : "text-white/75 hover:text-white"}`
    : `text-sm font-medium transition-colors ${active ? "text-primary" : "text-foreground/80 hover:text-foreground"}`;

const Header = ({ heroOverlay }: { heroOverlay?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll behind the full-screen menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleLogoClick = (e: MouseEvent) => {
    closeMenu();
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // "Portfolio" is the homepage gallery section, so it scrolls rather than routes.
  const goToPortfolio = (e: MouseEvent) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === "/") {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "gallery" } });
    }
  };

  // Transparent over a dark hero until the page scrolls. Pages without a dark hero pass heroOverlay={false}.
  const overHero = (heroOverlay ?? location.pathname === "/") && !isScrolled && !menuOpen;
  const ceramic = SERVICES.find((s) => s.packageValue === "ceramic");
  const detailing = SERVICES.filter((s) => s.packageValue !== "ceramic");
  const ceramicHref = ceramic ? serviceHref(ceramic.id) : "/services";
  const detailingActive =
    isPathActive("/services", location.pathname) && !isPathActive(ceramicHref, location.pathname);
  const ceramicActive = isPathActive(ceramicHref, location.pathname);
  const termsActive = isPathActive("/terms", location.pathname);
  const aboutActive = isPathActive("/about", location.pathname);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[60] border-b transition-colors duration-300 ${
          overHero || menuOpen
            ? "border-transparent bg-transparent"
            : "border-white/10 bg-ink/80 backdrop-blur"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex min-h-20 items-center justify-between py-3 lg:py-5">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="relative z-[60] flex items-center focus:outline-none"
              aria-label="Ryde Car Detailing home"
            >
              <img
                src={logo}
                alt="Ryde Car Detailing logo"
                className={`h-14 w-auto object-contain md:h-[4.5rem] lg:h-24`}
                loading="eager"
                decoding="async"
              />
            </Link>

            <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
              <Link to="/" className={linkClass(location.pathname === "/", overHero)}>
                Home
              </Link>
              <div className="group relative -my-2 py-2">
                <Link to="/services" className={`flex items-center gap-1 ${linkClass(detailingActive, overHero)}`}>
                  Car Detailing
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="min-w-[220px] rounded-xl border border-white/15 bg-ink py-2">
                    {detailing.map((service) => (
                      <Link
                        key={service.id}
                        to={serviceHref(service.id)}
                        className="block px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary/50 hover:text-foreground"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to={ceramicHref} className={linkClass(ceramicActive, overHero)}>
                Ceramic Coating
              </Link>
              <a href="/#gallery" onClick={goToPortfolio} className={linkClass(false, overHero)}>
                Portfolio
              </a>
              <Link to="/about" className={linkClass(aboutActive, overHero)}>
                About
              </Link>
              <Link to="/terms" className={linkClass(termsActive, overHero)}>
                T&amp;Cs
              </Link>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              {BUSINESS.instagramUrl && (
                <a
                  href={BUSINESS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ryde Car Detailing on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              <Button asChild className="gap-1.5">
                <Link to="/book">
                  Get a Quote
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <button
              className="relative z-[60] p-2 md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className={`h-6 w-6 ${overHero ? "text-white" : "text-foreground"}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[55] flex flex-col bg-ink px-6 pb-10 pt-28 text-white transition-all duration-500 ease-out md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-1 flex-col justify-center gap-2" aria-label="Mobile">
          {[
            { label: "Home", to: "/" },
            { label: "Car Detailing", to: "/services" },
            { label: "Ceramic Coating", to: ceramicHref },
            { label: "Portfolio", to: "/#gallery", scroll: true },
            { label: "About", to: "/about" },
            { label: "T&Cs", to: "/terms" },
          ].map((item, i) => {
            const style = {
              transitionDelay: menuOpen ? `${150 + i * 70}ms` : "0ms",
            };
            const cls = `block py-1.5 text-4xl font-medium tracking-tight transition-all duration-500 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`;
            return item.scroll ? (
              <a key={item.label} href={item.to} onClick={goToPortfolio} className={cls} style={style} tabIndex={menuOpen ? 0 : -1}>
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.to} onClick={closeMenu} className={cls} style={style} tabIndex={menuOpen ? 0 : -1}>
                {item.label}
              </Link>
            );
          })}
          <div className="mt-6 flex gap-6 text-base text-white/60">
            <Link to="/areas" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              Areas
            </Link>
            <Link to="/guides" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              Guides
            </Link>
          </div>
        </nav>

        <div className="space-y-4">
          <Button size="lg" className="h-14 w-full gap-2 text-base" asChild>
            <Link to="/book" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              Get a Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <a
            href={BUSINESS.phoneHref}
            className="block text-center text-sm text-white/60"
            tabIndex={menuOpen ? 0 : -1}
          >
            Or call {BUSINESS.phoneDisplay}
          </a>
          {BUSINESS.instagramUrl && (
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm text-white/60"
              tabIndex={menuOpen ? 0 : -1}
            >
              <Instagram className="h-4 w-4" />
              Follow us on Instagram
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
