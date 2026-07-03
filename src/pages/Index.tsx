import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import ExtraServices from "@/components/ExtraServices";
import ServiceArea from "@/components/ServiceArea";
import Gallery from "@/components/Gallery";
import Testimonial from "@/components/Testimonial";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <ExtraServices />
        <ServiceArea />
        <Gallery />
        <Testimonial />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
