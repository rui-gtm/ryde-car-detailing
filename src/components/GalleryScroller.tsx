import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryScrollerProps {
  images: GalleryImage[];
}

const GalleryScroller = ({ images }: GalleryScrollerProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrowClass =
    "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition hover:bg-background hover:scale-105";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        aria-label="Scroll gallery left"
        className={`${arrowClass} left-2`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => scrollByPage(1)}
        aria-label="Scroll gallery right"
        className={`${arrowClass} right-2`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Photo gallery"
      >
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(image)}
            aria-label={`View larger image: ${image.alt}`}
            className="flex-shrink-0 snap-start cursor-pointer overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="block h-80 md:h-[32rem] w-auto max-w-none"
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
            />
          </button>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-[90vw] border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">
            {selectedImage?.alt ?? "Gallery image preview"}
          </DialogTitle>
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="h-auto w-full rounded-lg object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryScroller;
