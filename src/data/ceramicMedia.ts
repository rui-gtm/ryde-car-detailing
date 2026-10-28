// Media shown on the Ceramic Coating page, in order, after the photo.
// To swap or add one, drop the file in src/assets/ceramic/ and edit this list.
// An animated image works like any image; for a longer clip use an MP4 in `public/videos/`
// and set `video` to "/videos/your-file.mp4" instead of `image`.
import windowSpray from "@/assets/ceramic/window-spray.webp";
import waterRunoff from "@/assets/ceramic/water-runoff.webp";

export type CeramicClip = {
  caption: string;
  alt: string;
  /** An image or animated image (GIF / WebP). */
  image?: string;
  /** An MP4 in public/videos/, e.g. "/videos/window-spray.mp4". Plays silently on a loop, like a GIF. */
  video?: string;
  /** Optional still shown while the MP4 loads, e.g. "/videos/window-spray.jpg". */
  poster?: string;
};

export const CERAMIC_CLIPS: CeramicClip[] = [
  {
    caption: "Water beading and sheeting off a coated window",
    alt: "Water sprayed over the rear window and door of a white car, beading and running off",
    video: "/videos/mobileceramiccoatingnorthryde.mp4",
  },
  {
    caption: "Water running straight off a coated bonnet",
    alt: "Water running off the bonnet and headlight of a coated BMW",
    video: "/videos/mobileceramiccoatingbmwnorthryde.mp4",
  },
];
