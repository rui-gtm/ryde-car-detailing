import BeforeAfter from "@/components/BeforeAfter";
import SectionHeading from "@/components/SectionHeading";

// The portfolio is one drag-to-compare slider with numbered buttons. The old
// scrolling photo strip (GalleryScroller.tsx) is still in the repo if it's
// wanted back.
const Gallery = () => {
  return (
    <section id="gallery" className="relative overflow-hidden py-16 md:py-20 scroll-mt-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="See the Difference"
          description="Real jobs, shot from the same angle, before and after. Drag the handle across to see what changed."
          className="mb-12 md:text-center md:mx-auto"
        />
        <BeforeAfter />
      </div>
    </section>
  );
};

export default Gallery;
