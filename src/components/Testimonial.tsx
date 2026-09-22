import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { BUSINESS, GOOGLE_REVIEWS } from "@/data/business";
import { TESTIMONIALS as testimonials } from "@/data/testimonials";

const GOOGLE_MAPS_URL = BUSINESS.googleMapsUrl;
const GOOGLE_RATING = GOOGLE_REVIEWS.rating;
const GOOGLE_REVIEW_COUNT = GOOGLE_REVIEWS.count;

const GoogleLogo = () => (
  <span className="text-xl font-bold tracking-tight">
    <span style={{ color: "#4285F4" }}>G</span>
    <span style={{ color: "#EA4335" }}>o</span>
    <span style={{ color: "#FBBC04" }}>o</span>
    <span style={{ color: "#4285F4" }}>g</span>
    <span style={{ color: "#34A853" }}>l</span>
    <span style={{ color: "#EA4335" }}>e</span>
  </span>
);

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="py-20 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Customer Reviews
          </h2>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 mb-2 mt-2"
          >
            <div className="flex items-center gap-3 bg-card rounded-xl border border-border px-5 py-3 hover:bg-muted transition-colors cursor-pointer">
              <GoogleLogo />
              <div className="w-px h-8 bg-border" />
              <div className="text-left">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-foreground">
                    {GOOGLE_RATING}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on {GOOGLE_REVIEW_COUNT} Google reviews
                </p>
              </div>
            </div>
          </a>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="bg-card rounded-xl border border-border p-8 md:p-12 relative min-h-[200px]">
              <span className="absolute top-6 right-6 text-xs font-medium text-primary">
                {testimonials[activeIndex].service}
              </span>

              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <div className="relative">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 absolute inset-0"
                    }`}
                  >
                    <blockquote className="text-lg md:text-xl text-foreground leading-relaxed text-center relative z-10">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mt-6 text-center">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;