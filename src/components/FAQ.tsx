const FAQ = () => {
  const faqs = [
    {
      q: "Do you come to my home or office?",
      a: "Yes — we’re a mobile detailing service and bring everything needed.",
    },
    {
      q: "How long does a detail take?",
      a: "Between 1–3 hours depending on the package and car condition.",
    },
    {
      q: "Do I need to supply water or power?",
      a: "No, we are fully self-sufficient.",
    },
    {
      q: "What areas do you service?",
      a: "Ryde, North Ryde, Meadowbank, Gladesville, Macquarie Park, and nearby suburbs.",
    },
    {
      q: "What payment methods do you accept?",
      a: "Card, Apple Pay, Google Pay.",
    },
    {
      q: "Do you remove stains and pet hair?",
      a: "Yes — included in the Interior Deep Clean package.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-secondary/30">
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