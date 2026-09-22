// Shared slug helper — used by every data file that needs a URL-safe id
// derived from a title/name (services, extra services, suburbs, guides), so
// the slugging rule only lives in one place.
export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
