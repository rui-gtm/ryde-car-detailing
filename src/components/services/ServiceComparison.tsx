import { Check, Minus } from "lucide-react";
import { SERVICES } from "@/data/services";

// Feature x package matrix, derived from each package's `features`/`duration`
// list in src/data/services.ts (see that file for the source copy) so this
// stays a faithful summary rather than a separately-maintained claim list.
const ROWS: { label: string; included: boolean[] }[] = [
  { label: "Hand contact exterior wash", included: [true, false, true, true] },
  { label: "Wheel & tyre cleanse", included: [true, false, true, false] },
  { label: "Streak-free windows", included: [true, true, true, false] },
  { label: "Full interior vacuum", included: [false, true, true, false] },
  { label: "Interior scrub & stain removal", included: [false, true, true, false] },
  { label: "Dash, console & trim detailing", included: [false, true, true, false] },
  { label: "Tyre shine", included: [false, false, true, false] },
  { label: "Paint decontamination & prep", included: [false, false, false, true] },
  { label: "Ceramic coating & UV protection", included: [false, false, false, true] },
];

const ServiceComparison = () => {
  return (
    <section className="py-20 bg-secondary/30 scroll-mt-24" aria-labelledby="comparison-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="comparison-title" className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Service comparison
          </h2>
          <p className="text-muted-foreground text-lg">See exactly what's included before you book.</p>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto bg-background rounded-2xl">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">Comparison of our detailing services</caption>
            <thead>
              <tr className="border-b border-border/40">
                <th scope="col" className="text-left font-semibold text-foreground p-4">
                  Stage
                </th>
                {SERVICES.map((s) => (
                  <th key={s.id} scope="col" className="text-center font-semibold text-foreground p-4">
                    {s.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-border/40">
                  <td className="p-4 text-foreground">{row.label}</td>
                  {row.included.map((yes, i) => (
                    <td key={i} className="p-4 text-center">
                      {yes ? (
                        <Check className="w-4 h-4 text-primary mx-auto" aria-label="Included" />
                      ) : (
                        <Minus className="w-4 h-4 text-muted-foreground/40 mx-auto" aria-label="Not included" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-border/40">
                <td className="p-4 text-foreground font-medium">Typical time</td>
                {SERVICES.map((s) => (
                  <td key={s.id} className="p-4 text-center text-muted-foreground">
                    {s.duration}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-foreground font-medium">From</td>
                {SERVICES.map((s) => (
                  <td key={s.id} className="p-4 text-center font-bold text-foreground">
                    ${s.price}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;
