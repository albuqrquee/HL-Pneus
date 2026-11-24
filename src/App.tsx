import { useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromotionsSection } from './components/PromotionsSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { BRANCH_UNITS, SERVICES } from './data/workshop';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].title);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(BRANCH_UNITS[0].id);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const contactEl = document.getElementById('contato');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);
  };

  const handleSelectUnitForMap = (unitId: string) => {
    setSelectedUnitId(unitId);
    const contactEl = document.getElementById('contato');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen surface-canvas text-ice flex flex-col font-body">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-pepperoni focus:text-ice focus:text-sm focus:font-semibold"
        >
          Ir para o conteúdo principal
        </a>

        <Navbar />

        <main id="conteudo-principal" className="flex-1">
          <Hero />
          <PromotionsSection />
          <ServicesSection onSelectServiceForContact={handleSelectServiceForContact} />
          <AboutSection
            selectedUnitId={selectedUnitId}
            onSelectUnitForMap={handleSelectUnitForMap}
          />
          <FaqSection />
          <ContactSection
            selectedService={selectedService}
            selectedUnitId={selectedUnitId}
            onSelectUnit={setSelectedUnitId}
            nameInputRef={nameInputRef}
          />
        </main>

        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </MotionConfig>
  );
}
