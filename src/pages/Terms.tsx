import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { buildPageSchema } from "@/lib/schema";
import { TERMS_SECTIONS as sections } from "@/data/terms";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms & Conditions | Ryde Car Detailing";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={buildPageSchema("/terms", "Terms & Conditions | Ryde Car Detailing")} />
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Ryde Car Detailing – Terms &amp; Conditions
              </h1>
              <p className="text-sm text-muted-foreground mb-8">Effective Date: 1st July 2026</p>

              <p className="text-muted-foreground leading-relaxed mb-10">
                These Terms &amp; Conditions apply to all services provided by Ryde Car Detailing. By requesting,
                booking or accepting our services, you agree to these Terms &amp; Conditions.
              </p>

              <div className="space-y-10">
                {sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">{section.heading}</h2>
                    {section.intro && (
                      <p className="text-muted-foreground leading-relaxed mb-3">{section.intro}</p>
                    )}
                    {section.items && (
                      <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {section.outro && (
                      <p className="text-muted-foreground leading-relaxed mt-3">{section.outro}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
