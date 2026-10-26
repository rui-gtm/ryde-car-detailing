import { useState, useEffect, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowUpRight, Instagram } from "lucide-react";
import logo from "@/assets/logo-new.webp";
import { SERVICES, serviceHref } from "@/data/services";
import { BUSINESS } from "@/data/business";

// Minimal nav: logo, four links, one button — shown from lg (1024px) up;
// phones and tablets get the full-screen menu. Areas, Guides and Terms stay
// reachable from the footer.

// Areas / Guides links at the bottom of the mobile menu — hidden for now;
// set to true to show them again.
const SHOW_AREAS_AND_GUIDES_IN_MENU = false;

const isPathActive = (to: string, pathname: string) =>
  to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

// Full-white links (the old 75% white got lost over the hero photo),
// with a soft shadow while the header floats over the hero. The current page
// gets a short underline.
const linkClass = (active: boolean, overHero: boolean) =>
  [
    "relative whitespace-nowrap py-1 text-sm font-medium text-white transition-colors xl:text-base",
    "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-white after:transition-transform after:duration-200",
    active ? "after:scale-x-100" : "after:scale-x-0 hover:text-white/80",
    overHero ? "[text-shadow:0_1px_10px_rgba(0,0,0,0.85)]" : "",
  ].join(" ");

const Header = ({ heroOverlay }: { heroOverlay?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  // Transparent over a dark hero until the page scrolls. Pages without a dark hero pass heroOverlay={false}.
  const overHero = (heroOverlay ?? location.pathname === "/") && !isScrolled && !menuOpen;
  const ceramic = SERVICES.find((s) => s.packageValue === "ceramic");
  const detailing = SERVICES.filter((s) => s.packageValue !== "ceramic");
  const ceramicHref = ceramic ? serviceHref(ceramic.id) : "/services";
  const detailingActive =
    isPathActive("/services", location.pathname) && !isPathActive(ceramicHref, location.pathname);
  const ceramicActive = isPathActive(ceramicHref, location.pathname);
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
              className={`relative z-[60] flex items-center transition-transform duration-300 focus:outline-none ${
                overHero ? "translate-y-3 md:translate-y-6 lg:translate-y-10" : ""
              }`}
              aria-label="Ryde Car Detailing home"
            >
              <img
                src={logo}
                width={600}
                height={233}
                alt="Ryde Car Detailing logo"
                className={`h-14 w-auto object-contain md:h-[4.5rem] lg:h-24`}
                loading="eager"
                decoding="async"
              />
            </Link>

            <nav className="hidden items-center gap-6 lg:flex xl:gap-10" aria-label="Main">
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
              <Link to="/about" className={linkClass(aboutActive, overHero)}>
                About
              </Link>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
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
              className="relative z-[60] p-2 lg:hidden"
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
        className={`fixed inset-0 z-[55] flex flex-col bg-ink px-6 pb-10 pt-28 text-white transition-all duration-500 ease-out lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-1 flex-col justify-center gap-4" aria-label="Mobile">
          {[
            { label: "Home", to: "/", active: location.pathname === "/" },
            {
              label: "Car Detailing",
              to: "/services",
              active: detailingActive,
              // Same sub-items as the desktop dropdown.
              children: detailing.map((service) => ({
                label: service.title,
                to: serviceHref(service.id),
                active: isPathActive(serviceHref(service.id), location.pathname),
              })),
            },
            { label: "Ceramic Coating", to: ceramicHref, active: ceramicActive },
            { label: "About", to: "/about", active: aboutActive },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : "0ms" }}
            >
              <Link
                to={item.to}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={item.active ? "page" : undefined}
                className={`inline-block py-1 text-2xl font-medium tracking-tight ${
                  item.active ? "underline decoration-2 underline-offset-8" : "text-white/90"
                }`}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mt-2 flex flex-col gap-2 border-l border-white/20 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      onClick={closeMenu}
                      tabIndex={menuOpen ? 0 : -1}
                      aria-current={child.active ? "page" : undefined}
                      className={`text-base ${child.active ? "text-white underline underline-offset-4" : "text-white/70"}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {SHOW_AREAS_AND_GUIDES_IN_MENU && (
            <div className="mt-4 flex gap-6 text-base text-white/60">
              <Link to="/areas" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                Areas
              </Link>
              <Link to="/guides" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                Guides
              </Link>
            </div>
          )}
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
