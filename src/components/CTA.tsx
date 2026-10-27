import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/data/business";

const CTA = ({
  heading = "Ready for a proper detail?",
  bookHref = "/book",
  bookLabel = "Book your detail",
}: {
  heading?: string;
  bookHref?: string;
  bookLabel?: string;
}) => {
  return (
    <section id="book" className="scroll-mt-24 py-16 text-white md:py-20">
      <div className="container mx-auto flex flex-col gap-10 px-4 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold md:text-4xl">{heading}</h2>
          <p className="mt-4 text-lg text-white/70">
            Clear starting prices, flexible scheduling and a 24-hour satisfaction guarantee.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="h-12 px-8 text-base" asChild>
            <Link to={bookHref}>{bookLabel}</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 border-white/25 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <a href={BUSINESS.phoneHref}>Call {BUSINESS.phoneDisplay}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
