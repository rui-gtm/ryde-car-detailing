import { useState, useEffect } from "react";
import { Quote, Star, Shield, Users, Leaf, ThumbsUp, ChevronLeft, ChevronRight } from "lucide-react";
const testimonials = [
  {
    quote: "Best detail in Ryde, hands down. My car looks brand new.",
    name: "James R.",
  },
  {
    quote: "Fast, friendly, and came to my office. Super convenient.",
    name: "Melissa T.",
  },
  {
    quote: "Interior detail removed all pet hair. Amazing!",
    name: "Alex P.",
  },
  {
    quote: "Great car cleaning service! Got an interior and exterior clean and the car looks fantastic. Super easy to organise and highly recommended. Big thanks for the clean and will be using Ryde Car Detailing again!",
    name: "Deb R",
  },
  {
    quote: "Great communication, service- and job well done. Would recommend!",
    name: "Saarang J",
  },
  {
    quote: "Jared did SUCH a good job. It was such short notice but he was super professional and attentive, spending over 90 minutes to make sure he did a 5* job. Would really recommend- thank you!",
    name: "Sarah C",
  }
];

const trustBadges = [
  { icon: Shield, text: "Fully Insured" },
  { icon: Users, text: "Professional Detailers" },
  { icon: Leaf, text: "Eco-Friendly Products" },
  { icon: ThumbsUp, text: "100% Satisfaction Guarantee" },
];

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
    <section id="reviews" className="py-20 bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ⭐ Customer Reviews
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <div className="bg-card rounded-xl border border-border p-8 md:p-12 relative min-h-[200px]">
            <Quote className="w-12 h-12 text-primary/20 absolute top-6 left-6" />
            
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Testimonial Content */}
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
                    <p className="font-semibold text-foreground"> {testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot Indicators */}
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

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 justify-center p-4 bg-card rounded-lg border border-border"
              >
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
