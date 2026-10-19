import type { ReactNode } from "react";

// The one heading style for every section on every page: left-aligned, an
// optional small accent label, a large tight title and a short muted line.
const SectionHeading = ({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) => (
  <div className={`mb-12 max-w-2xl ${className}`}>
    {eyebrow && <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-primary">{eyebrow}</p>}
    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>}
  </div>
);

export default SectionHeading;
