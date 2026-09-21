import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface GalleryMarqueeImage {
  src: string;
  alt: string;
}

interface MarqueeRowProps {
  images: GalleryMarqueeImage[];
  direction: "left" | "right";
  speed: number;
  onImageClick: (image: GalleryMarqueeImage) => void;
}

const MarqueeRow = ({ images, direction, speed, onImageClick }: MarqueeRowProps) => {
  const [isPaused, setIsPaused] = useState(false);
  // Duplicated so the track can loop seamlessly at a 50% translate.
  const trackImages = [...images, ...images];

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex w-max gap-6 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {trackImages.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onImageClick(image)}
            aria-label={`View larger image: ${image.alt}`}
            className="relative w-72 h-44 md:w-96 md:h-56 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-300 ease-out hover:z-20 hover:scale-110 hover:shadow-xl"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

interface GalleryMarqueeProps {
  topRow: GalleryMarqueeImage[];
  bottomRow: GalleryMarqueeImage[];
  speed?: number;
}

const GalleryMarquee = ({ topRow, bottomRow, speed = 90 }: GalleryMarqueeProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryMarqueeImage | null>(null);

  return (
    <div>
      <MarqueeRow images={topRow} direction="left" speed={speed} onImageClick={setSelectedImage} />
      <MarqueeRow images={bottomRow} direction="right" speed={speed} onImageClick={setSelectedImage} />

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

export default GalleryMarquee;
