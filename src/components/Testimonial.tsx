import { Quote } from "lucide-react";

const Testimonial = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8 md:p-12 relative">
            <Quote className="w-12 h-12 text-primary/20 absolute top-6 left-6" />
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed text-center relative z-10">
              "I recently visited Ryde Car Detailing and was genuinely impressed by the exceptional
              service. From start to finish, the entire process was seamless, and my car has never
              looked better!"
            </blockquote>
            <div className="mt-8 text-center">
              <p className="font-semibold text-foreground">Johnny Fang</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
