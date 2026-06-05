import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/AVe32BtBi5oWsNBDA";
export const GoogleRatingSection = () => {
  return (
    <section id="google-rating" className="py-20 bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Google rating
          </p>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-amber-400 text-lg leading-none tracking-wide">★★★★★</p>
              <p className="text-sm text-muted-foreground mt-1">5.0 · 41 reviews</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                <MapPin className="w-4 h-4 mr-1.5" />
                View on Google
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};