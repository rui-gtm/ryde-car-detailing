import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin } from "lucide-react";

const ServiceArea = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Service Area</h2>
          <p className="text-muted-foreground text-lg">
            We come to you - mobile detailing at your convenience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map placeholder */}
          <div className="bg-card rounded-xl border border-border p-8 h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Service Area Map</h3>
              <p className="text-muted-foreground text-sm">We service the greater metropolitan area</p>
            </div>
          </div>

          {/* Zone Info & Contact */}
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border flex-1">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <div>
                  <p className="font-semibold text-foreground">Green Zone</p>
                  <p className="text-sm text-muted-foreground">No outcall fee</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border flex-1">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <div>
                  <p className="font-semibold text-foreground">Red Zone</p>
                  <p className="text-sm text-muted-foreground">$30 outcall fee</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6" id="contact">
              <h3 className="text-xl font-bold text-foreground mb-2">Contact Us</h3>
              <p className="text-muted-foreground mb-6">
                Not sure if we serve your area? Give us a call! We're happy to answer any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" asChild>
                  <a href="tel:+1234567890">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us Now
                  </a>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <a href="#contact">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get a Quote
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
