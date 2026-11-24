import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { PROMOTIONS, getWhatsAppUrl } from '../data/workshop';
import {
  MOTION_EASE,
  RevealBlock,
  RevealHeader,
  VIEWPORT_CONFIG,
  headerItemVariants,
  serviceCardContainerVariants,
  serviceCardVariants,
} from './ScrollReveal';

export function PromotionsSection() {
  const [heroPromo, ...secondaryPromos] = PROMOTIONS;

  return (
    <section
      id="promocoes"
      aria-labelledby="promocoes-heading"
      className="py-10 md:py-14 surface-panel border-b border-hairline scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Compact Editorial Masthead */}
        <RevealHeader className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 pb-4 border-b border-hairline">
          <div>
            <motion.p
              variants={headerItemVariants}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-pepperoni mb-1"
            >
              Campanha Black November · HL Pneus
            </motion.p>
            <motion.h2
              id="promocoes-heading"
              variants={headerItemVariants}
              className="font-display font-bold uppercase text-ice tracking-tight leading-[0.98]"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                textWrap: 'balance',
              }}
            >
              Promoções em destaque nas lojas.
            </motion.h2>
          </div>

          <motion.p
            variants={headerItemVariants}
            className="text-xs sm:text-sm text-steel max-w-md md:text-right"
          >
            Todas as 05 ofertas ativas. Cobrimos a oferta da concorrência*.
          </motion.p>
        </RevealHeader>

        {/* Single-Viewport Asymmetric Layout: 1 Anchor (Left 4 cols) + 4 Horizontal Splits (Right 8 cols) */}
        <motion.div
          variants={serviceCardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch"
        >
          {/* 01. Anchor Offer */}
          <motion.article
            variants={serviceCardVariants}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.18, ease: MOTION_EASE },
            }}
            className="lg:col-span-4 surface-canvas border border-hairline flex flex-col justify-between service-card-glow"
          >
            <div className="relative h-56 sm:h-64 lg:h-[260px] w-full surface-canvas overflow-hidden border-b border-hairline">
              <img
                src={heroPromo.imageSrc}
                alt={heroPromo.imageAlt}
                width={heroPromo.imageWidth}
                height={heroPromo.imageHeight}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-1.5"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-pepperoni"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-pepperoni"
              />
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-bold uppercase text-ice tracking-tight">
                    <span className="text-pepperoni tabular-nums mr-1.5">
                      {heroPromo.number}
                    </span>
                    {heroPromo.title}
                  </h3>
                  <span className="font-display text-lg font-bold uppercase text-pepperoni tabular-nums whitespace-nowrap">
                    {heroPromo.highlightPrice}
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-steel leading-snug">
                  {heroPromo.details}
                </p>
              </div>

              <a
                href={getWhatsAppUrl(heroPromo.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 min-h-[44px] bg-pepperoni text-ice text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Garantir no WhatsApp</span>
              </a>
            </div>
          </motion.article>

          {/* 02 to 05. Asymmetric 2x2 Editorial Pairings visible simultaneously */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secondaryPromos.map((promo) => (
              <motion.article
                key={promo.id}
                variants={serviceCardVariants}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.18, ease: MOTION_EASE },
                }}
                className="surface-canvas border border-hairline p-3.5 sm:p-4 flex items-stretch gap-3.5 service-card-glow"
              >
                {/* Flyer Preview */}
                <div className="w-20 sm:w-24 aspect-[4/5] shrink-0 surface-panel border border-hairline overflow-hidden relative self-center">
                  <img
                    src={promo.imageSrc}
                    alt={promo.imageAlt}
                    width={promo.imageWidth}
                    height={promo.imageHeight}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-pepperoni/85"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-pepperoni/85"
                  />
                </div>

                {/* Editorial Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-hairline pb-1.5">
                      <span className="font-display text-sm font-bold text-pepperoni tabular-nums">
                        {promo.number}
                      </span>
                      <span className="font-display text-sm sm:text-base font-bold uppercase text-ice tabular-nums whitespace-nowrap">
                        {promo.highlightPrice}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold uppercase text-ice tracking-tight mt-2 leading-tight">
                      {promo.title}
                    </h3>

                    <p className="mt-1 text-xs text-steel leading-snug line-clamp-2">
                      {promo.details}
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-hairline flex items-center justify-between gap-2">
                    <a
                      href={getWhatsAppUrl(promo.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-semibold uppercase tracking-wider text-ice hover:text-pepperoni transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-pepperoni shrink-0" aria-hidden="true" />
                      <span>Quero esta oferta</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-pepperoni shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Compact Legal Line */}
        <RevealBlock y={10} delay={0.2}>
          <p className="mt-4 text-[11px] text-steel">
            *Oferta comprovada. Imagens meramente ilustrativas. Promoções válidas enquanto
            durarem os estoques ou até 30/11/2026 nas lojas participantes.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}
