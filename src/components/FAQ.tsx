import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS, type Faq } from "@/data/faqs";
import { BUSINESS } from "@/data/business";

const FAQ = ({
  tone = "muted",
  faqs = FAQS,
  title = "Frequently asked questions",
  description = (
    <>
      If your question is not here, call{" "}
      <a href={BUSINESS.phoneHref} className="text-primary">
        {BUSINESS.phoneDisplay}
      </a>
      .
    </>
  ),
}: {
  tone?: "muted" | "plain";
  faqs?: Faq[];
  title?: string;
  description?: ReactNode;
}) => {
  return (
    <section
      id="faq"
      className={`py-20 scroll-mt-24 ${tone === "muted" ? "bg-secondary/30" : "bg-background"}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg">{description}</p>
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
