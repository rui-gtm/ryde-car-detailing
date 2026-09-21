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
  { src: interior1, alt: "Mobile car detailing in Ryde NSW – deep-cleaned car interior and dashboard" },
  { src: interior2, alt: "Ryde car detailing – seats and carpets professionally cleaned" },
  { src: interior3, alt: "Interior detail – leather seats conditioned and refreshed in Ryde NSW" },
  { src: interior4, alt: "Car boot and cargo area deep clean – professional detailing in Ryde NSW" },
  { src: interior5, alt: "Dashboard and console detail – Ryde NSW mobile car detailing" },
  { src: interior6, alt: "Rear seat interior clean – Ryde NSW car detailing service" },
  { src: interior7, alt: "Steering wheel and cabin detail – freshly cleaned in Ryde NSW" },
  { src: interior8, alt: "Interior deep clean – seats and carpets professionally detailed in Ryde NSW" },
  { src: interior9, alt: "Premium interior detailing – dashboard and trim cleaned in Ryde NSW" },
  { src: interior10, alt: "Interior deep clean – freshly detailed and protected in Ryde NSW" },
];

const exteriorImages = [
  { src: exterior1, alt: "Exterior detail in Ryde NSW – glossy, streak-free paint finish" },
  { src: exterior2, alt: "Wheel and rim detailing – professional detailing results in Ryde NSW" },
  { src: exterior3, alt: "Exterior wash and detail in Ryde NSW – SUV cleaned to a polished finish" },
  { src: exterior4, alt: "Premium exterior wash – thick foam cannon treatment in Ryde NSW" },
  { src: exterior5, alt: "Car exterior polished finish – professional detailing results in Ryde NSW" },
  { src: exterior6, alt: "Exterior detail in Ryde NSW – paintwork cleaned and protected" },
  { src: exterior7, alt: "Wheel and brake caliper detailing – Ryde NSW mobile car detailing" },
  { src: exterior8, alt: "Exterior wash and detail in Ryde NSW – luxury SUV cleaned to a polished finish" },
  { src: exterior9, alt: "Premium exterior detail – glossy, streak-free finish in Ryde NSW" },
  { src: exterior10, alt: "Exterior detailing in Ryde NSW – showroom finish after a full detail" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">See the Difference</h2>
          <p className="text-muted-foreground text-lg">
            Professional results that speak for themselves
          </p>
        </div>

        <GalleryMarquee topRow={interiorImages} bottomRow={exteriorImages} />
      </div>
    </section>
  );
};

export default Gallery;
