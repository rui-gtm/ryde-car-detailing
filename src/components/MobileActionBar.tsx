import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import { BUSINESS } from "@/data/business";

// Always-visible Call / Get a Quote bar at the bottom of the screen on phones
// only (below md, 768px; hidden on tablets and desktops) — the same pattern
// GoDetailing uses. Rendered once for every page in AppRoutes; the
// page gets matching bottom padding in index.css so the bar never covers the
// footer. The full-screen menu (z-55) sits above it.
const MobileActionBar = () => (
  <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-white/15 bg-ink pb-[env(safe-area-inset-bottom)] md:hidden">
    <a
      href={BUSINESS.phoneHref}
      className="flex h-14 items-center justify-center gap-2 text-base font-medium text-white transition-colors active:bg-white/10"
    >
      <Phone className="h-4 w-4" aria-hidden="true" />
      Call
    </a>
    <Link
      to="/book"
      className="flex h-14 items-center justify-center gap-2 bg-primary text-base font-semibold text-primary-foreground transition-opacity active:opacity-90"
    >
      Get a Quote
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  </div>
);

export default MobileActionBar;
