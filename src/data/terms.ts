// Single source of truth for the Terms & Conditions content. Moved out of
// Terms.tsx so other pages (e.g. About.tsx's "what detailing can/cannot do"
// section) can reuse specific sections — like the service exclusions list —
// instead of re-writing the same facts in prose elsewhere.
export type TermsSection = {
  heading: string;
  intro?: string;
  items?: string[];
  outro?: string;
};

export const TERMS_SECTIONS: TermsSection[] = [
  {
    heading: "1. Bookings",
    items: [
      "Bookings may be made online, by phone, email or social media.",
      "A booking is considered confirmed once it has been accepted by Ryde Car Detailing.",
      "We reserve the right to refuse or cancel a booking where it is not commercially or operationally feasible to complete the requested service.",
    ],
  },
  {
    heading: "2. Quotations & Pricing",
    items: [
      "Our quotations are based on the information provided by the customer, including photographs where requested.",
      "To provide an accurate quotation, we may request recent photographs of both the interior and exterior of the vehicle.",
    ],
    intro:
      "If the actual condition of the vehicle differs materially from the information or photographs supplied — for example excessive dirt, mud, sand, pet hair, stains, mould, paint contamination or other conditions requiring substantially more labour, we reserve the right to:",
    outro: "No additional charges will be incurred without discussing them with the customer before work commences.",
  },
  {
    heading: "3. Scope of Service",
    intro:
      "Unless specifically quoted in writing, our detailing services do not include:",
    items: [
      "Paint correction",
      "Scratch removal",
      "Dent repair",
      "Stone chip repair",
      "Rust removal",
      "Upholstery repair",
      "Mould remediation",
      "Mechanical repairs",
      "Electrical repairs",
      "Permanent odour removal",
      "Headlight restoration",
      "Engine detailing",
      "Ceramic coating",
    ],
    outro:
      "These services may be available at an additional cost. While our services significantly improve the appearance of your vehicle, some stains, scratches, paint defects, odours and contamination may not be completely removable.",
  },
  {
    heading: "4. Customer Responsibilities",
    intro: "The customer is responsible for ensuring that:",
    items: [
      "the booking information is accurate;",
      "the vehicle is available at the agreed location and time;",
      "the vehicle can be safely accessed;",
      "all valuables and personal belongings have been removed before the appointment;",
      "any existing mechanical or electrical faults that may affect the service have been disclosed.",
    ],
  },
  {
    heading: "5. Water, Power & Site Access",
    intro: "Unless otherwise agreed in writing, the customer must provide:",
    items: [
      "access to a standard mains water supply;",
      "access to a standard 240V power outlet; and",
      "a safe, suitable and accessible work area.",
    ],
    outro:
      "The work area must comply with any applicable council, strata, body corporate or workplace requirements and must not unreasonably interfere with neighbouring properties. If water, power or suitable site access is unavailable due to circumstances within the customer's control, and no alternative arrangements have been agreed beforehand, Ryde Car Detailing may be unable to perform the service. Where we are unable to commence or complete the service for these reasons, we reserve the right to charge a $100 call-out fee to recover travel costs, technician time and the loss of the scheduled appointment. Where reasonably practicable, we will first attempt to resolve the issue or reschedule the appointment before applying the call-out fee.",
  },
  {
    heading: "6. Additional Charges",
    intro:
      "Additional charges may apply where the vehicle requires substantially more work than reasonably expected, including but not limited to:",
    items: [
      "excessive pet hair;",
      "excessive sand or mud;",
      "heavy staining;",
      "excessive interior contamination;",
      "tree sap;",
      "paint overspray;",
      "excessive bug residue;",
      "biohazards;",
      "mould; or",
      "heavily neglected vehicles.",
    ],
    outro: "Any additional charges will always be discussed and agreed before work commences.",
  },
  {
    heading: "7. Existing Vehicle Condition",
    intro: "Ryde Car Detailing is not responsible for pre-existing damage including, but not limited to:",
    items: [
      "scratches;",
      "dents;",
      "paint defects;",
      "stone chips;",
      "faded trim;",
      "damaged upholstery;",
      "cracked plastics;",
      "worn leather;",
      "faulty switches or electronics;",
      "loose badges, mouldings or accessories.",
    ],
    outro: "Where appropriate, we may photograph the vehicle before commencing work to document its condition.",
  },
  {
    heading: "8. Paint & Surface Risk",
    items: [
      "Older vehicles, previously repaired panels, aftermarket paintwork or deteriorated finishes may be more susceptible to peeling, lifting or further deterioration during washing or decontamination.",
      "Ryde Car Detailing is not responsible for damage resulting from pre-existing paint defects, poor previous repairs or deterioration that becomes apparent during normal detailing processes.",
    ],
  },
  {
    heading: "9. Safety",
    intro:
      "We reserve the right to refuse, suspend or discontinue a service if we reasonably believe the work cannot be carried out safely. Examples include:",
    items: [
      "unsafe working conditions;",
      "aggressive animals;",
      "severe weather;",
      "inadequate lighting;",
      "unsafe access;",
      "hazardous chemicals;",
      "biohazards;",
      "abusive or threatening behaviour.",
    ],
  },
  {
    heading: "10. Customer Belongings",
    items: [
      "Customers should remove all valuables and personal belongings before the appointment.",
      "Ryde Car Detailing accepts no responsibility for loss of or damage to items left inside the vehicle.",
    ],
  },
  {
    heading: "11. Child Restraints",
    items: [
      "Where child seats or booster seats need to be moved to perform the service, Ryde Car Detailing does not reinstall or certify child restraints.",
      "Customers are responsible for ensuring child restraints are correctly reinstalled before transporting children.",
    ],
  },
  {
    heading: "12. Weather",
    items: [
      "As a mobile service, appointments may be affected by adverse weather including heavy rain, hail, strong winds, lightning or extreme temperatures.",
      "Where necessary, appointments may be postponed or rescheduled to protect the safety of our staff and the quality of the finished work.",
    ],
  },
  {
    heading: "13. Cancellations & No-Shows",
    items: [
      "Customers should provide at least 24 hours' notice if they need to cancel or reschedule.",
      "Where a booking is cancelled with less than 24 hours' notice, or where we attend the agreed location and are unable to perform the service due to customer-related circumstances, we reserve the right to charge a $100 cancellation or call-out fee.",
      "We may waive this fee at our discretion.",
    ],
  },
  {
    heading: "14. Payment",
    items: [
      "Unless otherwise agreed in writing, payment is due immediately upon completion of the service.",
      "We currently accept payment by cash or bank transfer. At this time, we are unable to accept credit or debit card payments.",
      "Vehicles may not be released until payment has been received where applicable.",
    ],
  },
  {
    heading: "15. Satisfaction Guarantee",
    items: [
      "Customer satisfaction is important to us.",
      "If you are dissatisfied with any aspect of our service, please notify us within 24 hours of completion.",
      "Where appropriate, we will inspect the issue and, at our discretion, provide a reasonable remedy, which may include re-performing the affected part of the service.",
    ],
  },
  {
    heading: "16. Limitation of Liability",
    items: [
      "To the maximum extent permitted by law, Ryde Car Detailing's liability is limited to the value of the services supplied.",
      "Nothing in these Terms excludes, restricts or modifies any consumer guarantees or rights that cannot legally be excluded under the Australian Consumer Law.",
    ],
  },
  {
    heading: "17. Marketing Photography",
    items: [
      "Unless the customer requests otherwise before the appointment, Ryde Car Detailing may photograph vehicles before and after detailing for quality assurance and marketing purposes.",
      "No personal information or vehicle registration details will be published without the customer's consent.",
    ],
  },
  {
    heading: "18. Privacy",
    items: [
      "Personal information is collected only for the purposes of processing bookings, providing services and communicating with customers.",
      "We do not sell or disclose personal information except where required by law or where necessary to provide our services.",
    ],
  },
  {
    heading: "19. Events Beyond Our Control",
    items: [
      "Ryde Car Detailing is not responsible for delays or inability to perform services caused by events beyond our reasonable control, including severe weather, road closures, vehicle breakdowns, supplier interruptions or other unforeseen circumstances.",
    ],
  },
  {
    heading: "20. Changes to These Terms",
    items: [
      "Ryde Car Detailing may amend these Terms & Conditions from time to time.",
      "The latest version will always be available on our website and will apply to future bookings.",
    ],
  },
];

export const findTermsSection = (headingIncludes: string) =>
  TERMS_SECTIONS.find((s) => s.heading.includes(headingIncludes));
