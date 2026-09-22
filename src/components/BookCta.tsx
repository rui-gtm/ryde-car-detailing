import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// The "book now" closing block repeated near-identically at the bottom of
// About, Areas, Guides and Services pages — one component instead of the
// same JSX copied into each page file.
const BookCta = ({
  heading,
  description,
  secondary,
}: {
  heading?: string;
  description?: string;
  secondary?: { label: string; to: string };
}) => (
  <div className="text-center">
    {heading && <h2 className="text-xl font-bold text-foreground mb-2">{heading}</h2>}
    {description && <p className="text-muted-foreground mb-4">{description}</p>}
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button size="lg" asChild>
        <Link to="/book">Book Your Detail →</Link>
      </Button>
      {secondary && (
        <Button size="lg" variant="outline" asChild>
          <Link to={secondary.to}>{secondary.label}</Link>
        </Button>
      )}
    </div>
  </div>
);

export default BookCta;
