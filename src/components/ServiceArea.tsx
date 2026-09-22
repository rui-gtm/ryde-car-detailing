import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ZoomIn, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import ServiceAreaMapPng from "@/assets/service-area-map.png";
import ServiceAreaMapWebp from "@/assets/service-area-map.webp";
import { BUSINESS, AREA_SERVED_TEXT } from "@/data/business";

const ServiceArea = () => {
  return (
    <section id="service-area" className="py-20 bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Service Area
          </h2>
          <p className="text-muted-foreground text-lg">
            We come to you - mobile detailing at your convenience
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* Left — map only */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="relative w-full rounded-xl overflow-hidden border border-border/50 cursor-pointer group hover:border-primary transition-colors"
                aria-label="Expand service area map"
              >
                <picture>
                  <source type="image/webp" srcSet={ServiceAreaMapWebp} />
                  <img
                    src={ServiceAreaMapPng}
                    alt="Ryde Car Detailing service area map (Ryde NSW and nearby suburbs)"
                    className="w-full h-auto block"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </button>
            </DialogTrigger>

            <DialogContent className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] max-w-5xl w-full p-0 bg-transparent border-0 shadow-none">
              <DialogClose asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute right-4 top-4 z-50 rounded-full bg-background/90 p-2 hover:bg-background transition-colors shadow"
                >
                  <X className="w-5 h-5" />
                </button>
              </DialogClose>
              <DialogHeader className="sr-only">
                <DialogTitle>Service Area Map</DialogTitle>
                <DialogDescription>Expanded view of the service area map</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 p-4">
                <picture>
                  <source type="image/webp" srcSet={ServiceAreaMapWebp} />
                  <img
                    src={ServiceAreaMapPng}
                    alt="Expanded service area map for Ryde Car Detailing (Ryde NSW and nearby suburbs)"
                    className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="flex gap-8 bg-background/90 backdrop-blur-sm rounded-lg px-6 py-3 border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-600 shrink-0" />
                    <span className="text-sm font-semibold">Green Zone = No outcall fee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-600 shrink-0" />
                    <span className="text-sm font-semibold">Red Zone = $30 outcall fee</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Right — all cards */}
          <div className="ml-10 space-y-8 items-center">

            {/* Suburbs */}
            <div className="mt-4 bg-card rounded-xl border border-border p-6">
              <p className="text-base text-muted-foreground leading-relaxed">
                We proudly service {AREA_SERVED_TEXT}, and surrounding suburbs.
              </p>
              <Link to="/areas" className="inline-block mt-2 text-sm font-medium text-primary hover:underline">
                View all suburbs we service →
              </Link>
            </div>

            {/* Zone legend */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4 px-5 py-5 bg-card rounded-xl border border-border">
                <div className="w-4 h-4 rounded-full bg-green-500 shrink-0" />
                <div>
                  <p className="text-base font-semibold text-foreground">Green Zone</p>
                  <p className="text-base text-muted-foreground mt-1">No outcall fee</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-5 py-5 bg-card rounded-xl border border-border">
                <div className="w-4 h-4 rounded-full bg-red-500 shrink-0" />
                <div>
                  <p className="text-base font-semibold text-foreground">Red Zone</p>
                  <p className="text-base text-muted-foreground mt-1">$30 outcall fee</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-card rounded-xl border border-border p-6 scroll-mt-28" id="contact">
              <h3 className="text-xl font-bold text-foreground mb-2">Contact Us</h3>
              <p className="text-base text-muted-foreground mb-1">
                Not sure if we serve your area? Give us a call! We're happy to answer any questions.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {BUSINESS.addressDisplay}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" asChild>
                  <a href={BUSINESS.phoneHref}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call {BUSINESS.phoneDisplay}
                  </a>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/book">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get a Quote
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Local content block 
        <div className="mt-16 max-w-4xl mx-auto text-left">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Why Ryde Locals Choose Us for Mobile Car Detailing
          </h3>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              Finding a reliable car detailer nearby shouldn't mean driving across Sydney or waiting
              weeks for a booking. Ryde Car Detailing is based right in Ryde NSW, and we bring premium
              mobile car detailing directly to your driveway, office car park or apartment garage —
              anywhere across Ryde, North Ryde, Meadowbank, Gladesville, Macquarie Park and
              Hunters Hill.
            </p>
            <p>
              Whether you need a quick basic exterior wash before the weekend, an interior deep clean to
              remove pet hair and stains, or a ceramic coating to protect your paint for years, our local
              detailers know the area and can usually fit you in within days, not weeks. Being based
              locally means less travel time for us and lower outcall fees for you — most of our core
              service area (Green Zone) has no outcall fee at all.
            </p>
            <p>
              We've built our reputation suburb by suburb: families in Ryde and North Ryde trust us for
              regular maintenance washes, apartment residents in Meadowbank and Gladesville appreciate
              that we come down to basement car parks, and busy professionals in Macquarie Park book us for detailing during work hours. If you're near Ryde and searching for
              mobile car detailing near you, we're the local team that turns up on time and leaves your
              car looking showroom-fresh.
            </p>
          </div>
        </div>*/}
      </div>
    </section>
  );
};

export default ServiceArea;