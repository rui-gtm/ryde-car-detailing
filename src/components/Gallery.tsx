const galleryImages = [
  { src: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600", alt: "Clean car interior detailing" },
  { src: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600", alt: "Luxury car interior" },
  { src: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600", alt: "White SUV exterior" },
  { src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600", alt: "Car exterior polished" },
  { src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600", alt: "Professional interior cleaning" },
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600", alt: "Detailed exterior finish" },
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
