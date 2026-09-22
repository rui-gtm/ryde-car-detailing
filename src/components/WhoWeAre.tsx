import { Link } from "react-router-dom";
import { BUSINESS } from "@/data/business";

// Short homepage teaser — deliberately brief (one paragraph), not a repeat
// of the fuller /about page (which covers the same "who does the work" idea
// in more depth). This links out to /about rather than duplicating it.
const WhoWeAre = () => (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who We Are</h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-lg">{BUSINESS.description}</p>
        <Link to="/about" className="text-sm text-primary">
          Learn more about us →
        </Link>
      </div>
    </div>
  </section>
);

export default WhoWeAre;
