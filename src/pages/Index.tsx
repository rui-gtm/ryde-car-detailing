import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import ExtraServices from "@/components/ExtraServices";
import Standards from "@/components/Standards";
import HowItWorks from "@/components/HowItWorks";
import ServiceArea from "@/components/ServiceArea";
import Gallery from "@/components/Gallery";
import Testimonial from "@/components/Testimonial";
import ReadingSection from "@/components/ReadingSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { buildHomepageSchema } from "@/lib/schema";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: "smooth" });
      navigate(location.pathname, { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen">
      <JsonLd data={buildHomepageSchema("Mobile Car Detailing Ryde NSW | Ryde Car Detailing")} />
      <Header />
      <main>
        {/* Ordered by the questions a first-time customer asks, in order:
            1. What is it, where, and can I trust it at a glance?  Hero
            2. What can I book and what does it cost?              Services + add-ons
            3. Do you come to me, and is there a travel fee?       Service area (completes the price)
            4. Is the work any good?                               Before/after, then reviews
            5. Why you, and what's it like to book?                Why us, how it works
            6. Anything else I'm unsure about?                     FAQ
            7. (Researchers) I want to read more first             Guides
            8. Ready.                                              Final call to action */}
        <Hero />
        <Services fade />
        <ExtraServices />
        <ServiceArea />
        <Gallery />
        <Testimonial />
        <Standards />
        <HowItWorks tone="plain" />
        <FAQ tone="plain" />
        <ReadingSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
