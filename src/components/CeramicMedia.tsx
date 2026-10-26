import SectionHeading from "@/components/SectionHeading";
import garagePhoto from "@/assets/ceramic-garage.jpg";
import { CERAMIC_VIDEOS, type CeramicVideo } from "@/data/ceramicMedia";

// Only videos whose `src` is set in src/data/ceramicMedia.ts are shown — an
// empty "coming soon" slot would otherwise ship to the live page.
const videos = CERAMIC_VIDEOS.filter((video) => video.src);

const VideoSlot = ({ video }: { video: CeramicVideo }) => (
  <figure>
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
    <figcaption className="mt-3 text-sm text-muted-foreground">{video.title}</figcaption>
  </figure>
);

// "Ceramic coating in action": a photo of a finished car plus the videos.
// Hidden entirely until at least one video has been added.
const CeramicMedia = () => {
  if (videos.length === 0) return null;

  return (
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
            alt="White Porsche Macan with a deep gloss finish, reflecting the hexagon lights in a detailing garage"
            loading="lazy"
            decoding="async"
            className="aspect-[3/4] w-full rounded-xl border border-border object-cover lg:h-full"
          />
          <div className="grid content-start gap-8">
            {videos.map((video) => (
              <VideoSlot key={video.title} video={video} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeramicMedia;
