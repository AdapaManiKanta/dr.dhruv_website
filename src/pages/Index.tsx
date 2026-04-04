import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutSection from "@/components/AboutSection";
import BentoFeatures from "@/components/BentoFeatures";
import GallerySection from "@/components/GallerySection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <WhyChooseUs />
      <AboutSection />
      <BentoFeatures />
      <GallerySection />
      <TeamSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </main>
    <Footer />
    <FloatingButtons />
  </>
);

export default Index;
