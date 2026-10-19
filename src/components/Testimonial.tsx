import { ExternalLink, Star } from "lucide-react";
import { BUSINESS, GOOGLE_REVIEWS } from "@/data/business";
import { TESTIMONIALS } from "@/data/testimonials";
import GoogleG from "@/components/GoogleG";
import SectionHeading from "@/components/SectionHeading";

// Only reviews copied from the Google listing are shown here.
const googleReviews = TESTIMONIALS.filter((t) => t.source === "google");

const AVATAR_COLORS = ["#e11d48", "#0891b2", "#7c3aed", "#ea580c", "#16a34a", "#2563eb", "#c026d3", "#ca8a04"];

const avatarColor = (name: string) => {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

const Stars = ({ className = "h-4 w-4" }: { className?: string }) => (
  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`${className} fill-yellow-400 text-yellow-400`} />
    ))}
  </div>
);

const Testimonial = () => (
  <section id="reviews" className="py-24 bg-transparent scroll-mt-24">
    <div className="container mx-auto px-4 lg:px-8">
      {/* Summary banner */}
      <div className="rounded-xl border border-border bg-white/[0.06] px-6 py-8 text-white md:px-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-5">
            <GoogleG className="h-14 w-14" />
            <div>
              <p className="text-5xl font-bold leading-none">{GOOGLE_REVIEWS.rating.toFixed(1)}</p>
              <div className="mt-2">
                <Stars />
              </div>
              <p className="mt-1 text-sm text-white/60">{GOOGLE_REVIEWS.count} Google reviews</p>
            </div>
          </div>
          <a
            href={BUSINESS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View on Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Heading */}
      <SectionHeading
        eyebrow="Reviews" title="What customers are saying"
        description="Every review below is verified on Google."
        className="mt-20 mb-0"
      />

      {/* Review cards */}
      <div className="mt-10 columns-1 gap-5 md:columns-2 lg:columns-3">
        {googleReviews.map((review) => (
          <article
            key={review.name}
            className="mb-5 break-inside-avoid rounded-xl border border-border bg-white/[0.06] p-6"
          >
            <div className="flex items-center justify-between">
              <Stars />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                <GoogleG className="h-3.5 w-3.5" />
                Google
              </span>
            </div>
            <blockquote className="mt-4 leading-relaxed text-foreground">“{review.quote}”</blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: avatarColor(review.name) }}
                aria-hidden="true"
              >
                {review.name.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-foreground">{review.name}</p>
                {review.date && <p className="text-sm text-muted-foreground">{review.date}</p>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonial;
