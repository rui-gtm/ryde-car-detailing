import { Button } from "@/components/ui/button";
import { Calendar, Award, ThumbsUp } from "lucide-react";

const benefits = [
  { icon: Calendar, text: "Flexible scheduling options" },
  { icon: Award, text: "Premium service guarantee" },
  { icon: ThumbsUp, text: "100% satisfaction guaranteed" },
];

const CTA = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-8">
          Ready to Experience the Detailing Difference?
        </h2>

        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {benefits.map((benefit) => (
            <div key={benefit.text} className="flex items-center gap-3 text-primary-foreground">
              <benefit.icon className="w-6 h-6" />
              <span className="font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          variant="secondary"
          className="text-lg px-8"
          asChild
        >
          <a href="#contact">Book Your Detail Today</a>
        </Button>
      </div>
    </section>
  );
};

export default CTA;
