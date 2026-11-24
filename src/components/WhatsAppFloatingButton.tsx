import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../data/workshop';

const DEFAULT_SERVICES_INQUIRY =
  'Olá, equipe HL Pneus! Gostaria de solicitar informações e orçamento sobre os serviços automotivos.';

export function WhatsAppFloatingButton() {
  const whatsappHref = getWhatsAppUrl(DEFAULT_SERVICES_INQUIRY);

  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp sobre serviços da HL Pneus (abre em nova aba)"
      title="Conversar no WhatsApp"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center justify-center gap-2.5 w-12 h-12 sm:w-auto sm:h-12 sm:px-5 bg-pepperoni text-ice border border-ice/20 shadow-[0_14px_30px_-8px_rgba(0,0,0,0.85),0_0_22px_-6px_hsl(351_81%_49%/0.45)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[hsl(var(--text-primary))] whitespace-nowrap shrink-0"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline text-sm font-semibold tracking-wide whitespace-nowrap">
        WhatsApp
      </span>
    </motion.a>
  );
}
