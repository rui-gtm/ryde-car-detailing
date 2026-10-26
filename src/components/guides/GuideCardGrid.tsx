import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GUIDES, guideHref } from "@/data/guides";

// Grid of guide cards — reused by the /guides page (full list) and the
// homepage's "Reading" teaser section (first few, via `limit`).
const GuideCardGrid = ({ limit }: { limit?: number }) => {
  const guides = limit ? GUIDES.slice(0, limit) : GUIDES;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <Link key={guide.slug} to={guideHref(guide.slug)} className="block cursor-pointer">
          <Card className="h-full transition-colors duration-200 hover:border-foreground/30">
            <CardHeader>
              <CardTitle className="text-xl leading-snug">{guide.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground leading-relaxed">{guide.excerpt}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default GuideCardGrid;
