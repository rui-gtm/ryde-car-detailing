import GalleryMarquee from "@/components/GalleryMarquee";
import interior1 from "@/assets/interiorImage-1.jpg";
import interior2 from "@/assets/interiorImage-2.jpg";
import interior3 from "@/assets/interiorImage-3.jpg";
import interior4 from "@/assets/interiorImage-4.jpg";
import interior5 from "@/assets/interiorImage-5.jpg";
import interior6 from "@/assets/interiorImage-6.jpg";
import interior7 from "@/assets/interiorImage-7.jpg";
import interior8 from "@/assets/interiorImage-8.jpg";
import interior9 from "@/assets/interiorImage-9.jpg";
import interior10 from "@/assets/interiorImage-10.jpg";
import exterior1 from "@/assets/exteriorImage-1.jpg";
import exterior2 from "@/assets/exteriorImage-2.jpg";
import exterior3 from "@/assets/exteriorImage-3.jpg";
import exterior4 from "@/assets/exteriorImage-4.jpg";
import exterior5 from "@/assets/exteriorImage-5.jpg";
import exterior6 from "@/assets/exteriorImage-6.jpg";
import exterior7 from "@/assets/exteriorImage-7.jpg";
import exterior8 from "@/assets/exteriorImage-8.jpg";
import exterior9 from "@/assets/exteriorImage-9.jpg";
import exterior10 from "@/assets/exteriorImage-10.jpg";

const interiorImages = [
  { 
    src: interior1, 
    alt: "Interior Deep Clean - seats and carpets professionally shampooed in Ryde NSW" 
  },
  { 
    src: interior2, 
    alt: "Mobile car interior deep clean and dashboard detailing in North Ryde" 
  },
  { 
    src: interior3, 
    alt: "Leather steering wheel and cabin detailing in Meadowbank" 
  },
  { 
    src: interior4, 
    alt: "Dashboard and interior trim detailed with vinyl protection in Gladesville" 
  },
  { 
    src: interior5, 
    alt: "Interior Deep Clean package - sanitized and protected car cabin in Gladesville" 
  },
  { 
    src: interior6, 
    alt: "Mobile interior detailing - dashboard and center console cleaned in Hunters Hill" 
  },
  { 
    src: interior7, 
    alt: "Cloth seats and floor carpets deep cleaned and vacuumed in Macquarie Park" 
  },
  { 
    src: interior8, 
    alt: "Leather seats conditioned and hydrated during interior detail in North Ryde" 
  },
  { 
    src: interior9, 
    alt: "Rear seat row vacuumed and deep cleaned in Macquarie Park" 
  },
  { 
    src: interior10, 
    alt: "Car boot and cargo area vacuumed and deep cleaned in Macquarie Park" 
  },
];

const exteriorImages = [
  { 
    src: exterior1, 
    alt: "Hand exterior wash and detail on a luxury SUV in Hunters Hill" 
  },
  { 
    src: exterior2, 
    alt: "Glossy showroom finish on luxury SUV after full exterior detail in Hunters Hill" 
  },
  { 
    src: exterior3, 
    alt: "Mobile wheel and brake caliper cleaning on luxury SUV in Hunters Hill" 
  },
  { 
    src: exterior4, 
    alt: "Exterior paintwork deep cleaned and spray-sealed in North Ryde" 
  },
  { 
    src: exterior5, 
    alt: "Alloy wheel and rim detailing with tire shine in North Ryde" 
  },
  { 
    src: exterior6, 
    alt: "Exterior paint correction and hand-polished finish in Gladesville" 
  },
  { 
    src: exterior7, 
    alt: "Mobile exterior wash and dry for SUV in Macquarie Park" 
  },
  { 
    src: exterior8, 
    alt: "Thick snow foam cannon pre-wash treatment in Meadowbank" 
  },
  { 
    src: exterior9, 
    alt: "Premium exterior wash result - glossy, streak-free paint finish in Ryde" 
  },
  { 
    src: exterior10, 
    alt: "Exterior detailing with streak-free glass and glossy paint in Ryde NSW" 
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">See the Difference</h2>
          <p className="text-muted-foreground text-lg">
            Professional results that speak for themselves.
          </p>
        </div>

        <GalleryMarquee topRow={interiorImages} bottomRow={exteriorImages} />
      </div>
    </section>
  );
};

export default Gallery;
