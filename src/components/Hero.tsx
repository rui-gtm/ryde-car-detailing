import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";
import BookingDialog from "@/components/BookingDialog";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[hsl(var(--hero-overlay))]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-8 md:space-y-12 pb-12 md:pb-16 pt-4 md:pt-8 flex flex-col">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-3 md:mb-4 animate-fade-in-up flex-none">
            Mobile Car Detailing in Ryde
          </h1>
          <div className="animate-fade-in-up [animation-delay:0.05s] flex-none mt-2 md:mt-3">
            <span className="inline-flex items-center gap-2 text-base md:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-primary via-pink-500 to-purple-500 text-transparent bg-clip-text px-3 py-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
              — We Come to You
            </span>
          </div>
        <p className="text-lg md:text-xl text-muted-foreground mb-14 md:mb-24 animate-fade-in-up [animation-delay:0.1s] max-w-3xl mx-auto flex-none">
          Get a showroom shine at your home or office. Trusted by Ryde locals for fast, professional, high-quality detailing.
        </p>

        
        {/* Why Choose Us */}
        <div className="mx-auto max-w-4xl text-center animate-fade-in-up [animation-delay:0.25s] mt-20 md:mt-24 mb-12 md:mb-16 flex-none">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why Choose Our Detailing</h3>
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
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center animate-fade-in-up [animation-delay:0.2s] mt-2 flex-none">
          <BookingDialog>
            <Button size="lg">
              Book Your Detail →
            </Button>
          </BookingDialog>
          <Button size="lg" variant="outline" asChild>
            <a href="#services">View Packages</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
