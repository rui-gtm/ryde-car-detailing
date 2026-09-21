import { FAQS } from "@/data/faqs";

const FAQ = () => {
  const faqs = FAQS;

  return (
    <section id="faq" className="py-20 bg-secondary/30 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">FAQ</h2>
          <p className="text-muted-foreground">Answers to common questions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((item) => (
            <div key={item.q} className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
