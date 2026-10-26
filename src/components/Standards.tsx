import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TRUST_BADGES } from "@/data/trustBadges";
import { points } from "@/components/MobileConvenience";

// Homepage "why us" section. Replaces the separate WhyUs + MobileConvenience
// icon rows (same facts, same data) with one ruled list beside a headline.
// Only MobileConvenience's `points` are still used; the WhyUs and
// MobileConvenience components themselves aren't rendered on any page.
const items = [
  ...TRUST_BADGES.map((b) => ({ icon: b.icon, title: b.text, description: b.description })),
  ...points,
];

const Standards = () => (
  <section id="why-us" className="scroll-mt-24 border-y border-white/10 py-24 text-white">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-sky-300">Why us</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Detailing done properly, at your door</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
            We bring the products and the experience. You get a showroom result without giving up your day.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link to="/book">Book a detail</Link>
          </Button>
        </div>

        <ul className="border-t border-white/10">
          {items.map((item) => (
            <li key={item.title} className="flex gap-5 border-b border-white/10 py-6">
              <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-sky-300" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-white/65">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Standards;
