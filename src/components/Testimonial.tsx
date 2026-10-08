import { ExternalLink, Star } from "lucide-react";
import { BUSINESS, GOOGLE_REVIEWS } from "@/data/business";
import { TESTIMONIALS } from "@/data/testimonials";

// Only reviews copied from the Google listing are shown here.
const googleReviews = TESTIMONIALS.filter((t) => t.source === "google");

const AVATAR_COLORS = ["#e11d48", "#0891b2", "#7c3aed", "#ea580c", "#16a34a", "#2563eb", "#c026d3", "#ca8a04"];

const avatarColor = (name: string) => {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

const GoogleG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
    <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

const Stars = ({ className = "h-4 w-4" }: { className?: string }) => (
  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`${className} fill-yellow-400 text-yellow-400`} />
    ))}
  </div>
);

const Testimonial = () => (
  <section id="reviews" className="py-20 bg-background scroll-mt-24">
    <div className="container mx-auto px-4">
      {/* Summary banner */}
      <div className="mx-auto max-w-5xl rounded-3xl bg-neutral-950 px-6 py-8 text-white md:px-10">
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
      <div className="mx-auto mt-14 max-w-5xl">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">What customers are saying</h2>
        <p className="mt-2 text-muted-foreground">Every review below is verified on Google.</p>
      </div>

      {/* Review cards */}
      <div className="mx-auto mt-8 max-w-5xl columns-1 gap-5 md:columns-2 lg:columns-3">
        {googleReviews.map((review) => (
          <article
            key={review.name}
            className="mb-5 break-inside-avoid rounded-2xl border border-border bg-card p-6 shadow-sm"
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
              <p className="font-semibold text-foreground">{review.name}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonial;
