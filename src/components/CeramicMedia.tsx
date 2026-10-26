import { Play } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import garagePhoto from "@/assets/ceramic-garage.webp";
import { CERAMIC_VIDEOS, type CeramicVideo } from "@/data/ceramicMedia";

// A single video slot: the real video once `src` is set in
// src/data/ceramicMedia.ts, otherwise a "coming soon" placeholder so the
// layout is complete in the meantime.
const VideoSlot = ({ video, index }: { video: CeramicVideo; index: number }) => (
  <figure>
    {video.src ? (
      <video
        controls
        playsInline
        preload="metadata"
        poster={video.poster}
        aria-label={video.title}
        className="aspect-video w-full rounded-xl border border-border bg-ink object-cover"
      >
        <source src={video.src} type="video/mp4" />
      </video>
    ) : (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/30 bg-white/[0.04] text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10">
          <Play className="h-6 w-6 translate-x-0.5" />
        </span>
        <span className="text-sm text-muted-foreground">Video {index + 1} coming soon</span>
      </div>
    )}
    <figcaption className="mt-3 text-sm text-muted-foreground">{video.title}</figcaption>
  </figure>
);

// "Ceramic coating in action": a photo of a finished car plus two video slots.
const CeramicMedia = () => (
  <section className="bg-transparent py-24" aria-labelledby="ceramic-media-title">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionHeading
        title="Ceramic Coating in Action"
        description="See how the coating goes on and the finish it leaves behind."
      />
      <span id="ceramic-media-title" className="sr-only">
        Ceramic coating photo and videos
      </span>

      <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
        <img
          src={garagePhoto}
          alt="White Porsche Macan with a deep, glossy ceramic-coated finish reflecting overhead hexagon lights"
          loading="lazy"
          decoding="async"
          className="aspect-[3/4] w-full rounded-xl border border-border object-cover lg:h-full"
        />
        <div className="grid content-start gap-8">
          {CERAMIC_VIDEOS.map((video, i) => (
            <VideoSlot key={video.title} video={video} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CeramicMedia;
