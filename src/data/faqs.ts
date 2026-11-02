// Single source of truth for FAQ content. FAQ.tsx renders this list on the
// page; src/lib/schema.ts turns the same list into the JSON-LD `FAQPage`
// node. Edit the questions/answers here — do NOT edit them separately in
// FAQ.tsx or in index.html, that's what caused the two to drift apart.
//
// NOTE: customers supply water and power (see Terms §5) — keep every answer
// here consistent with that.

export type Faq = {
  q: string;
  a: string;
};

export const FAQS: Faq[] = [
  {
    q: "What areas do you service?",
    a: "We’re based in Ryde and service Ryde and surrounding Sydney suburbs. Travel fees may apply for locations outside our standard service area. Please ensure power and water are accessible at your dedicated location.",
  },
  {
    q: "How do I book a detail?",
    a: "Simply fill out our booking form or contact our mobile number with your vehicle make/model, suburb, the service you’re interested in and a few photos of the car. We’ll confirm availability, provide a quote and organise a suitable time to come to you.",
  },
  {
    q: "Do I need to be home while you work?",
    a: "No. As long as we have access to the vehicle and a suitable place to work, with power and water accessible, you can leave us to take care of the rest. We'll let you know when your vehicle is ready and be on our way!",
  },
  {
    q: "Can I send photos before getting a quote?",
    a: "Yes, and we actually recommend it. Photos of the interior and exterior help us understand the vehicle's condition and provide a more accurate quote before your appointment. This is also a common approach among professional mobile detailers.",
  },
  {
    q: "What happens if it rains on the day?",
    a: "If weather conditions prevent us from safely completing the service, we'll contact you to reschedule. An undercover area such as a garage or carport can often allow the service to go ahead.",
  },
  {
    q: "What happens if you find something that needs extra work?",
    a: "We'll always discuss additional work with you before doing it. There are no surprise charges — if something requires extra time or a specialised treatment, we'll explain the options and price first.",
  },
  {
    q: "Will my car look brand new after a detail?",
    a: "A professional detail can make a significant difference to your vehicle's appearance, but results depend on its age, condition and existing damage. We aim to restore the vehicle as much as safely possible rather than promising unrealistic results.",
  },
  {
    q: "What should I do after my detail?",
    a: "We'll provide any relevant aftercare advice based on the services performed. Following the recommended washing and maintenance methods will help keep your vehicle looking its best and extend the results of your detail.",
  },
  {
    q: "How do I keep my car looking this good?",
    a: "The best way to maintain your vehicle after a detail is with regular professional maintenance. Our maintenance plans make it easy to keep your car clean, protected and looking its best year-round, while reducing the need for expensive deep details later on. Ask us about our maintenance options when booking your detail.",
  },
  {
    q: "Will paint correction remove every scratch?",
    a: "No, paint correction does not remove all scratches. It depends on how deep the scratch is:\n\nLight swirl marks and wash scratches: usually removable.\nLight clear-coat scratches: often removed or significantly reduced.\nDeeper scratches that catch your fingernail: usually cannot be fully removed by polishing.\nScratches through the clear coat into the colour or primer: cannot be safely polished out.\nDeep damage exposing bare metal: needs touch-up or paint repair, not paint correction.",
  },
];
