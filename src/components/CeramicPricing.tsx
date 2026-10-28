import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import garagePhoto from "@/assets/ceramic-garage.jpg";
import type { ServicePackage } from "@/data/services";

const POINTS = [
  "Years of protection, not weeks",
  "UV / sun damage",
  "Harsh water marks",
  "Easier washing, cleaner for longer",
  "1/2 Step Paint Correction",
];

// Ceramic Coating page body: the price (with the photo), then why it is worth it.
const CeramicPricing = ({ service }: { service: ServicePackage }) => (
  <>
    <section id="pricing" className="scroll-mt-24 bg-transparent py-24" aria-labelledby="pricing-title">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Ceramic Coating Price"
          description="One clear price, finished at your home or workplace. Final price depends on vehicle size and condition."
        />
        <span id="pricing-title" className="sr-only">
          Ceramic Coating price
        </span>

        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <img
            src={garagePhoto}
            alt="White Porsche Macan with a deep gloss finish, reflecting the hexagon lights in a detailing garage"
            loading="lazy"
            decoding="async"
            className="aspect-[5/4] h-full w-full rounded-xl border border-border object-cover object-[50%_58%]"
          />

          <div className="flex flex-col rounded-xl border border-white/40 bg-white/10 p-8 text-white lg:p-10">
            <p className="text-sm uppercase tracking-wider text-white/60">Starting from</p>
            <p className="mt-1 text-7xl font-semibold tracking-tight">${service.price}</p>
            <p className="mt-2 text-base text-white/70">{service.duration}</p>

            <ul className="mb-10 mt-8 space-y-6 border-t border-white/20 pt-8">
              {POINTS.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-1.5 h-6 w-6 shrink-0 text-white" />
                  <span className="text-2xl font-medium leading-snug tracking-tight text-white">{feature}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="mt-auto h-14 w-full text-lg" asChild>
              <Link to={`/book?package=${service.packageValue}`}>Book Ceramic Coating →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-transparent py-24" aria-labelledby="ceramic-purpose-title">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <SectionHeading title="What is ceramic coating for?" className="mb-0" />
          <span id="ceramic-purpose-title" className="sr-only">
            The purpose of ceramic coating
          </span>
          <div className="space-y-6 text-xl leading-relaxed text-white/85">
            <p>
              Ceramic and graphene coatings are long-term paint protection. They bond to your paintwork and form a
              durable, water-repelling layer that boosts gloss while protecting against UV damage, chemicals, dirt and
              environmental contamination.
            </p>
            <p>
              Waxes and sealants last weeks or months. A coating lasts years, so your car stays cleaner for longer,
              washing is easier, and your paint keeps its gloss with less risk of premature wear.
            </p>
            <p>
              Coatings go on best over properly prepared paint. They don't hide defects, which is why paint correction
              is often recommended first to lock in the finish at its best.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default CeramicPricing;
