import { Link } from "react-router-dom";
import GuideCardGrid from "@/components/guides/GuideCardGrid";

// Homepage teaser for the guides — reuses GuideCardGrid (same card the
// /guides page uses), limited to the first 3, with a link to the full list.
const ReadingSection = () => (
  <section className="py-20 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Worth a Read</h2>
        <p className="text-muted-foreground text-lg">
          Practical car detailing guides, pricing, timing and what each service covers.
        </p>
      </div>

      <GuideCardGrid limit={3} />

      <div className="text-center mt-10">
        <Link to="/guides" className="text-sm font-medium text-primary hover:underline">
          View all guides →
        </Link>
      </div>
    </div>
  </section>
);

export default ReadingSection;
