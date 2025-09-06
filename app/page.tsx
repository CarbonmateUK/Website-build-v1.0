import HeroSection from "./components/hero-section";
import FeaturesSection from "./components/features-section";
import LeadCaptureSection from "./components/lead-capture-section";
import FAQSection from "./components/faq-section";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <LeadCaptureSection />
      <FAQSection />
    </main>
  );
}