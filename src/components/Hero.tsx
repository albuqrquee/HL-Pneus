import { motion } from 'framer-motion';
import { ArrowDownRight, MessageCircle, Phone } from 'lucide-react';
import { WORKSHOP_INFO, getWhatsAppUrl } from '../data/workshop';

export function Hero() {
  const whatsappHref = getWhatsAppUrl(
    'Olá, equipe HL Pneus! Preciso de atendimento para o meu veículo.'
  );

  return (
    <section
      id="inicio"
      aria-label="Apresentação HL Pneus"
      className="relative min-h-[90svh] flex flex-col justify-between pt-[68px] overflow-hidden surface-canvas border-b border-hairline"
    >
      {/* Full-bleed Workshop Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={WORKSHOP_INFO.images.hero}
          alt="Técnico da HL Pneus inspecionando disco de freio e conjunto da roda na oficina"
          width={1600}
          height={838}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[68%_center] md:object-center"
        />
        {/* Measured scrim preserving workshop visibility on the right & >= 8:1 contrast on the left */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hero-scrim-horizontal"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hero-scrim-vertical"
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-12 md:pt-24 md:pb-16 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          {/* Quiet unboxed kicker metadata */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-medium tracking-wider uppercase text-steel mb-5">
            <span className="text-pepperoni font-semibold">HL Pneus</span>
            <span aria-hidden="true">·</span>
            <span>Mecânica Automotiva</span>
            <span aria-hidden="true">·</span>
            <span>7 Unidades em MG</span>
          </div>

          <h1
            className="font-display font-bold uppercase text-ice tracking-tight leading-[0.96]"
            style={{
              fontSize: 'clamp(2.65rem, 5.6vw, 4.9rem)',
              textWrap: 'balance',
            }}
          >
            Precisão mecânica em cada quilômetro.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-steel leading-relaxed max-w-xl">
            {WORKSHOP_INFO.subheadline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] bg-pepperoni text-ice text-sm sm:text-base font-semibold tracking-wide transition-transform duration-200 active:scale-[0.98] whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Conversar no WhatsApp</span>
            </a>

            <a
              href="#promocoes"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] border border-strong text-ice hover:border-ice text-sm sm:text-base font-medium transition-colors duration-200 whitespace-nowrap"
            >
              <span>Ver promoções em destaque</span>
              <ArrowDownRight className="w-4 h-4 text-pepperoni shrink-0" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Architectural Anchor Strip peeking at bottom edge */}
      <div className="relative z-10 border-t border-hairline bg-[hsl(var(--bg-canvas)/0.9)] backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-steel">
          <div className="flex items-center gap-6">
            <a
              href={`tel:+${WORKSHOP_INFO.phoneDigits}`}
              className="inline-flex items-center gap-2 text-ice hover:text-pepperoni transition-colors tabular-nums font-medium whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-pepperoni shrink-0" aria-hidden="true" />
              <span>{WORKSHOP_INFO.phoneDisplay}</span>
            </a>
            <a
              href="#unidades"
              className="text-steel hover:text-ice transition-colors whitespace-nowrap"
            >
              Ver 7 unidades em MG
            </a>
          </div>

          <a
            href="#promocoes"
            className="hidden md:inline-flex items-center gap-1.5 text-ash hover:text-ice transition-colors whitespace-nowrap"
          >
            <span>Rolar para promoções</span>
            <ArrowDownRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
