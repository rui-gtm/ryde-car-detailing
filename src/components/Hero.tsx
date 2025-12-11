import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[hsl(var(--hero-overlay))]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 animate-fade-in-up">
          Ryde Car Detailing
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Premium Detailing — Right at your Door
        </p>
        
        {/* Animated Arrow */}
        <div className="animate-bounce-slow my-6">
          <ChevronDown className="w-8 h-8 mx-auto text-primary" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Button size="lg" asChild>
            <a href="#contact">Book Now</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#services">View Services</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
