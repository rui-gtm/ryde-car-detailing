import SectionHeading from "@/components/SectionHeading";
import { CERAMIC_CLIPS } from "@/data/ceramicMedia";

// "Ceramic coating in action": its own section with the demonstration clips.
const CeramicMedia = () => (
  <section className="bg-transparent py-24" aria-labelledby="ceramic-media-title">
    <div className="container mx-auto px-4 lg:px-8">
      <SectionHeading
        title="Ceramic Coating in Action"
        description="See how water behaves on a coated panel."
      />
      <span id="ceramic-media-title" className="sr-only">
        Ceramic coating demonstrations
      </span>

      <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2 lg:gap-12">
        {CERAMIC_CLIPS.map((clip) => (
          <figure key={clip.caption}>
            {clip.video ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={clip.poster}
                aria-label={clip.alt}
                className="aspect-[4/5] w-full rounded-xl border border-white/20 bg-ink object-cover shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
              >
                <source src={clip.video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={clip.image}
                alt={clip.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-xl border border-white/20 bg-ink object-cover shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
              />
            )}
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default CeramicMedia;
