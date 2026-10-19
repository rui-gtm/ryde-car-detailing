import { Link } from "react-router-dom";
import GuideCardGrid from "@/components/guides/GuideCardGrid";
import SectionHeading from "@/components/SectionHeading";

// Homepage teaser for the guides — reuses GuideCardGrid (same card the
// /guides page uses), limited to the first 3, with a link to the full list.
const ReadingSection = () => (
  <section className="py-24 bg-transparent">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionHeading
        eyebrow="Guides" title="Worth a Read"
        description="Practical car detailing guides, pricing, timing and what each service covers."
      />

      <GuideCardGrid limit={3} />

      <div className="mt-10">
        <Link to="/guides" className="text-sm font-medium text-primary">
          View all guides →
        </Link>
      </div>
    </div>
  </section>
);

export default ReadingSection;
