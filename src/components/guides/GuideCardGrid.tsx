import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GUIDES, guideHref } from "@/data/guides";

// Grid of guide cards — reused by the /guides page (full list) and the
// homepage's "Reading" teaser section (first few, via `limit`).
const GuideCardGrid = ({ limit }: { limit?: number }) => {
  const guides = limit ? GUIDES.slice(0, limit) : GUIDES;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {guides.map((guide) => (
        <Card key={guide.slug} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg">
              <Link to={guideHref(guide.slug)} className="hover:underline underline-offset-4">
                {guide.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{guide.excerpt}</p>
            <Link to={guideHref(guide.slug)} className="inline-block mt-4 text-sm font-medium text-primary hover:underline">
              Read more →
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GuideCardGrid;
