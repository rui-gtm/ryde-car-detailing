import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

const checklist = [
  {
    title: "Vehicle Information",
    description: "I have provided accurate information and recent photos of my vehicle (where requested).",
  },
  {
    title: "Vehicle Access",
    description: "My vehicle will be available at the agreed location and time.",
  },
  {
    title: "Water, Power & Workspace",
    description:
      "Water, power and a safe, suitable work area will be available, unless alternative arrangements have been agreed in advance.",
  },
  {
    title: "Valuables Removed",
    description: "I have removed all valuables and personal belongings from the vehicle.",
  },
  {
    title: "Pricing",
    description:
      "I understand the final price may be adjusted if the actual condition of my vehicle differs materially from the information or photographs provided.",
  },
  {
    title: "Service Duration",
    description:
      "I understand the time required to complete the service will vary depending on the selected package and the condition of my vehicle.",
  },
];

const Book = () => {
  const [searchParams] = useSearchParams();
  const defaultPackage = searchParams.get("package") ?? undefined;

  useEffect(() => {
    document.title = "Book Your Detail | Ryde Car Detailing";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Book Your Detail</h1>
              <p className="text-muted-foreground text-lg">
                Fill out the form below and we'll contact you to confirm your appointment.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto items-start">
              {/* Left: Before You Confirm Your Booking */}
              <div className="order-2 lg:order-1">
                <div className="bg-secondary/30 rounded-xl p-6 md:p-8 lg:sticky lg:top-28">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    Before You Confirm Your Booking
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">Please confirm the following:</p>

                  <ul className="space-y-4">
                    {checklist.map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">{item.title}</p>
                          <p className="text-sm text-muted-foreground leading-snug">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border mt-6 pt-6 space-y-3">
                    <p className="text-sm text-muted-foreground leading-snug">
                      By submitting this booking, I confirm that the information I have provided is accurate and
                      complete, and that I have read and agree to the{" "}
                      <a href="/terms" className="text-primary underline underline-offset-4">
                        Ryde Car Detailing Terms &amp; Conditions
                      </a>
                      .
                    </p>
                    <a
                      href="tel:+61411666174"
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Prefer to book by phone? Call 0411 666 174
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Booking Form */}
              <div className="order-1 lg:order-2 bg-card rounded-xl p-6 md:p-8">
                <BookingForm defaultPackage={defaultPackage} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Book;
