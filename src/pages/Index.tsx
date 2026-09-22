import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import ExtraServices from "@/components/ExtraServices";
import WhyUs from "@/components/WhyUs";
import MobileConvenience from "@/components/MobileConvenience";
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
        <Hero />
        <WhoWeAre />
        <Services />
        <ExtraServices />
        <WhyUs />
        <MobileConvenience />
        <HowItWorks />
        <ServiceArea />
        <Gallery />
        <Testimonial />
        <ReadingSection />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
