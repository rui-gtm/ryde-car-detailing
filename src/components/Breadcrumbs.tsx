import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/schema";

// Visual breadcrumb trail. Pages build the same `Crumb[]` once and pass it
// both here and to the matching schema builder in src/lib/schema.ts, so the
// visible trail and the BreadcrumbList structured data can never disagree.
const Breadcrumbs = ({ items, onDark = false }: { items: Crumb[]; onDark?: boolean }) => (
  <nav aria-label="Breadcrumb" className={onDark ? "" : "bg-white/[0.04]"}>
    <div className={onDark ? "" : "container mx-auto px-4 lg:px-8 py-3"}>
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${onDark ? "text-white/60" : "text-muted-foreground"}`}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
              {isLast ? (
                <span className={onDark ? "font-medium text-white" : "text-foreground font-medium"} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={item.url} className={onDark ? "transition-colors hover:text-white" : "hover:text-foreground transition-colors"}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  </nav>
);

export default Breadcrumbs;
