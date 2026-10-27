import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Choose your service",
    description: "Pick a package — from a basic wash to a full ceramic coating.",
  },
  {
    title: "Tell us about your vehicle",
    description: "Vehicle type and a few details so we can confirm an accurate price.",
  },
  {
    title: "Pick your date & time",
    description: "Choose a time that suits you and where you'd like us to come.",
  },
  {
    title: "We come to you",
    description: "We arrive at your address and detail your car on-site.",
  },
];

// "Four steps, start to finish" — the booking flow explained, mirroring the
// fields actually in BookingForm.tsx (service, vehicle, date/time, address)
// so this stays accurate to how booking really works.
const HowItWorks = ({ tone = "muted" }: { tone?: "muted" | "plain" }) => (
  <section
    id="how-it-works"
    className={`py-16 md:py-20 scroll-mt-24 ${tone === "muted" ? "bg-transparent" : "bg-transparent"}`}
  >
    <div className="container mx-auto px-4 lg:px-8">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-xl text-3xl font-semibold text-foreground md:text-4xl">How it works</h2>
        <Button asChild size="lg">
          <Link to="/book">Book now</Link>
        </Button>
      </div>

      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="text-sm font-medium tabular-nums text-primary">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
