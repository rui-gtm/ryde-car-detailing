import gallery1 from "@/assets/gallery-1-BfCGAQQG.jpg";
import gallery2 from "@/assets/gallery-2-CSb4CooV.jpg";
import gallery3 from "@/assets/gallery-3-D_A9cLu2.jpg";
import gallery4 from "@/assets/gallery-4-1oP2hfxk.jpg";
import gallery5 from "@/assets/gallery-5-BqR452Xb.jpg";
import gallery6 from "@/assets/gallery-6-DXkgh_Vm.jpg";

const galleryImages = [
  { src: gallery1, alt: "Clean car interior detailing" },
  { src: gallery2, alt: "Luxury car interior" },
  { src: gallery3, alt: "White SUV exterior" },
  { src: gallery4, alt: "Car exterior polished" },
  { src: gallery5, alt: "Professional interior cleaning" },
  { src: gallery6, alt: "Detailed exterior finish" },
];

const Gallery = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">See the Difference</h2>
          <p className="text-muted-foreground text-lg">
            Professional results that speak for themselves
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video overflow-hidden rounded-lg group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
