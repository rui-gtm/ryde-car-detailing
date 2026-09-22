import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/faqs";

const FAQ = () => {
  const faqs = FAQS;

  return (
    <section id="faq" className="py-20 bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently asked questions</h2>
          <p className="text-muted-foreground text-lg">
            If your question is not here, call 0411 666 174.
          </p>
        </div>
        <div className="max-w-2xl mx-auto divide-y divide-border/50">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5 open:pb-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="text-sm text-muted-foreground mt-2">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
