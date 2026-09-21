// Renders a schema.org graph (built in src/lib/schema.ts) as a JSON-LD
// <script> tag. Used instead of hand-writing JSON-LD in index.html so the
// markup always reflects the same data the page itself renders from.
const JsonLd = ({ data }: { data: unknown }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export default JsonLd;
