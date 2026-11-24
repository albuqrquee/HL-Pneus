import { motion } from 'framer-motion';
import { WORKSHOP_INFO, getWhatsAppUrl } from '../data/workshop';
import { MOTION_EASE } from './ScrollReveal';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.55, ease: MOTION_EASE }}
      className="surface-glass border-t border-hairline pt-12 pb-20 md:pt-14 md:pb-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-hairline">
          <div className="flex items-center gap-3.5">
            <img
              src={WORKSHOP_INFO.logoSrc}
              alt="Logotipo HL Pneus"
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              className="w-10 h-10 rounded-full object-cover border border-hairline shrink-0"
            />
            <div>
              <span className="font-display text-lg font-bold uppercase tracking-wider text-ice block">
                HL Pneus
              </span>
              <span className="text-xs text-steel block">
                Mecânica Automotiva · Juiz de Fora, MG
              </span>
            </div>
          </div>

          <nav aria-label="Links do rodapé" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-steel">
            <a href="#inicio" className="hover:text-ice transition-colors whitespace-nowrap">
              Início
            </a>
            <a href="#promocoes" className="hover:text-ice transition-colors whitespace-nowrap">
              Promoções
            </a>
            <a href="#servicos" className="hover:text-ice transition-colors whitespace-nowrap">
              Serviços
            </a>
            <a href="#sobre" className="hover:text-ice transition-colors whitespace-nowrap">
              A Oficina
            </a>
            <a href="#duvidas" className="hover:text-ice transition-colors whitespace-nowrap">
              Dúvidas
            </a>
            <a href="#unidades" className="hover:text-ice transition-colors whitespace-nowrap">
              Unidades
            </a>
            <a href="#contato" className="hover:text-ice transition-colors whitespace-nowrap">
              Contato
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ice hover:text-pepperoni font-medium underline decoration-[hsl(var(--accent))] decoration-2 underline-offset-4 transition-colors whitespace-nowrap"
            >
              WhatsApp
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-steel">
          <p>Juiz de Fora · Varginha · Pouso Alegre · Divinópolis (MG)</p>
          <p className="tabular-nums">
            {WORKSHOP_INFO.phoneDisplay} · © 2026 HL Pneus
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
