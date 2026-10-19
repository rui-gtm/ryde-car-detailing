import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS, type Faq } from "@/data/faqs";
import { BUSINESS } from "@/data/business";
import SectionHeading from "@/components/SectionHeading";

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
      className={`py-24 scroll-mt-24 ${tone === "muted" ? "bg-transparent" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <SectionHeading
            eyebrow="FAQ" title={title}
            description={description}
            className="mb-0 lg:sticky lg:top-28 lg:self-start"
          />
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
