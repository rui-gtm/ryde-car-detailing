import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      {/* Background Image */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[hsl(var(--hero-overlay))]" />

      {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center space-y-6 md:space-y-10 pb-8 md:pb-12 pt-1 md:pt-4 flex flex-col">
            <div className="flex flex-col items-center gap-3 md:gap-4 animate-fade-in-up flex-none">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-0.5 md:mt-3 [@media(max-height:900px)_and_(min-width:768px)]:mt-12">
                Mobile Car Detailing in Ryde
              </h1>
              <span className="inline-flex items-center gap-2 text-lg md:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-primary via-pink-500 to-purple-500 text-transparent bg-clip-text px-3 pt-0 pb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                 We Come to You
              </span>
              <p className="text-lg md:text-xl text-muted-foreground mt-0.5 md:mt-2 mb-1 md:mb-2 animate-fade-in-up [animation-delay:0.1s] max-w-3xl mx-auto flex-none [@media(max-height:900px)_and_(min-width:768px)]:mt-7">
              Get a showroom shine at your home or office.
              <br />
              Trusted by Ryde locals for fast, professional, high-quality detailing.
              </p>
            </div>


        
        {/* Why Choose Us */}
        <div className="mx-auto max-w-4xl text-center animate-fade-in-up [animation-delay:0.25s] mt-6 md:mt-8 mb-8 md:mb-12 flex-none">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why Choose Us</h3>
          <div className="flex flex-wrap items-center justify-center gap-4 mx-auto max-w-4xl px-2">
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm md:text-base text-foreground">Local experts who service Ryde daily</span>
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm md:text-base text-foreground">We come to you — home or workplace</span>
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm md:text-base text-foreground">Premium products for a lasting finish</span>
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm md:text-base text-foreground">Fast, reliable, friendly detailers</span>
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm md:text-base text-foreground">Clear pricing with no surprises</span>
            </span>
          </div>

        </div>

        {/* CTA Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center animate-fade-in-up [animation-delay:0.2s] mt-1 flex-none">
          <Button size="lg" asChild>
            <Link to="/book">Book Your Detail →</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#services">View Packages</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
