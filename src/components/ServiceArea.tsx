import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, ZoomIn, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import BookingDialog from "@/components/BookingDialog";
const ServiceArea = () => {
  return (
    <section className="py-20 bg-secondary/30 scroll-mt-15" id="service-area">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Service Area</h2>
          <p className="text-muted-foreground text-lg">
            We come to you - mobile detailing at your convenience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Service area map */}
          <div className="space-y-6">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="relative rounded-lg overflow-hidden border border-border/50 cursor-pointer group hover:border-primary transition-all w-full"
                  aria-label="Expand Service Area Map"
                >
                  <img
                    src="https://rydecardetailing.lovable.app/assets/service-area-map-CaQxbS4g.png"
                    alt="RYDE Car Detailing Service Area Map"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  {/* Hover overlay with scope icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-w-7xl w-full p-0 bg-transparent border-0">
                <DialogClose asChild>
                  <button
                    type="button"
                    aria-label="Close"
                    className="absolute right-4 top-4 z-50 rounded-full bg-background/80 p-2 hover:bg-background transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </DialogClose>
                <DialogHeader className="sr-only">
                  <DialogTitle>Service Area Map</DialogTitle>
                  <DialogDescription>Expanded view of the service area</DialogDescription>
                </DialogHeader>
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4 gap-4">
                  <img
                    src="https://rydecardetailing.lovable.app/assets/service-area-map-CaQxbS4g.png"
                    alt="RYDE Car Detailing Service Area Map - Expanded View"
                    className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg"
                  />
                  <div className="flex gap-4 bg-background/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-600" />
                      <span className="text-sm font-semibold">Green Zone = No outcall fee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-600" />
                      <span className="text-sm font-semibold">Red Zone = $30 outcall fee</span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Zone Info & Contact */}
          <div className="space-y-6">
            {/* Local SEO: service suburbs */}
            <div className="bg-card rounded-xl border border-border p-6">
              <p className="text-sm md:text-base text-muted-foreground">
                We proudly service Ryde, North Ryde, Parramatta, Gladesville, Meadowbank, Hunters Hill, and surrounding suburbs.
              </p>
            </div>
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

            <div className="bg-card rounded-xl border border-border p-6 scroll-mt-28" id="contact">
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
                  <BookingDialog>
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Get a Quote
                    </Button>
                  </BookingDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
