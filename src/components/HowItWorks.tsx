import { Link } from "react-router-dom";
import { ClipboardList, Car, CalendarClock, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: ClipboardList,
    title: "Choose your service",
    description: "Pick a package — from a basic wash to a full ceramic coating.",
  },
  {
    icon: Car,
    title: "Tell us about your vehicle",
    description: "Vehicle type and a few details so we can confirm an accurate price.",
  },
  {
    icon: CalendarClock,
    title: "Pick your date & time",
    description: "Choose a time that suits you and where you'd like us to come.",
  },
  {
    icon: Sparkles,
    title: "We come to you",
    description: "We arrive with everything needed and detail your car on-site.",
  },
];

// "Four steps, start to finish" — the booking flow explained, mirroring the
// fields actually in BookingForm.tsx (service, vehicle, date/time, address)
// so this stays accurate to how booking really works.
const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-secondary/30 scroll-mt-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
      </div>

      {/* Mobile: vertical stack */}
      <div className="max-w-5xl mx-auto flex flex-col lg:hidden">
        {steps.map((step, index) => (
          <div key={step.title} className="contents">
            <div className="text-center pb-10">
              <step.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center -mt-6 mb-4">
                <ChevronRight className="w-5 h-5 text-muted-foreground/40 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: icons and arrows share one row so their centers line up */}
      <div
        className="max-w-5xl mx-auto hidden lg:grid lg:items-center"
        style={{ gridTemplateColumns: steps.map(() => "1fr").join(" auto ") }}
      >
        {steps.map((step, index) => (
          <div key={step.title} className="contents">
            <step.icon className="w-8 h-8 text-primary mx-auto" />
            {index < steps.length - 1 && (
              <ChevronRight className="w-5 h-5 text-muted-foreground/40" />
            )}
          </div>
        ))}
        {steps.map((step, index) => (
          <div key={step.title} className="contents">
            <div className="text-center pt-3">
              <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
            {index < steps.length - 1 && <div />}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button asChild size="lg">
          <Link to="/book">Book Now</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default HowItWorks;
