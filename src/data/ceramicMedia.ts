// Videos shown on the Ceramic Coating page. To add one:
//   1. Put the file in the project's `public/videos/` folder (create it if needed),
//      e.g. public/videos/ceramic-1.mp4
//   2. Set `src` below to "/videos/ceramic-1.mp4"
// Entries with an empty `src` are skipped; the whole "Ceramic Coating in Action"
// section stays hidden until at least one `src` is set.
// MP4 (H.264) plays everywhere; keep each file under ~20 MB so the page stays fast.
export type CeramicVideo = {
  title: string;
  src: string;
  /** Optional still image shown before the video plays, e.g. "/videos/ceramic-1.jpg". */
  poster?: string;
};

export const CERAMIC_VIDEOS: CeramicVideo[] = [
  { title: "Ceramic coating demonstration 1", src: "" },
  { title: "Ceramic coating demonstration 2", src: "" },
];
