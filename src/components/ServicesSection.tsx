import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { SERVICES, WORKSHOP_INFO, getWhatsAppUrl } from '../data/workshop';
import { PrecisionImage } from './PrecisionImage';
import {
  MOTION_EASE,
  RevealBlock,
  RevealHeader,
  VIEWPORT_CONFIG,
  headerItemVariants,
  serviceCardContainerVariants,
  serviceCardVariants,
} from './ScrollReveal';

interface ServicesSectionProps {
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceForContact }: ServicesSectionProps) {
  const flagshipServices = SERVICES.slice(0, 2);
  const technicalServices = SERVICES.slice(2);
  const [activeTechId, setActiveTechId] = useState<string>(technicalServices[0].id);

  const activeService =
    technicalServices.find((item) => item.id === activeTechId) || technicalServices[0];

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="py-24 md:py-32 surface-canvas border-b border-hairline"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header — Editorial Asymmetric Split */}
        <RevealHeader className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-12 border-b border-hairline">
          <div className="lg:col-span-7">
            <motion.p
              variants={headerItemVariants}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-pepperoni mb-3"
            >
              Especialidades da oficina
            </motion.p>
            <motion.h2
              id="servicos-heading"
              variants={headerItemVariants}
              className="font-display font-bold uppercase text-ice tracking-tight leading-[0.98]"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.35rem)',
                textWrap: 'balance',
              }}
            >
              Seis frentes de precisão para rodar seguro.
            </motion.h2>
          </div>

          <motion.div variants={headerItemVariants} className="lg:col-span-5">
            <p className="text-base text-steel leading-relaxed">
              Do conjunto de rodagem à eletrônica de bordo, cada serviço segue medição
              técnica e orçamento claro antes da execução.
            </p>
          </motion.div>
        </RevealHeader>

        {/* Band 1: Asymmetric Bento Pair for Flagship Tire & 3D Alignment Services (01 & 02) */}
        <motion.div
          variants={serviceCardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Flagship Photo & Service 01 (7 cols) */}
          <motion.article
            variants={serviceCardVariants}
            whileHover={{
              scale: 1.012,
              transition: { duration: 0.18, ease: MOTION_EASE },
            }}
            className="lg:col-span-7 surface-panel border border-hairline flex flex-col justify-between service-card-glow"
          >
            <PrecisionImage
              src={WORKSHOP_INFO.images.alignment}
              alt="Técnico realizando balanceamento e calibração de roda em estação computadorizada na HL Pneus"
              width={1200}
              height={803}
              aspectClass="aspect-[16/10]"
              imgClassName="hover:scale-[1.02]"
            />

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold uppercase text-ice tracking-tight">
                    <span className="text-pepperoni tabular-nums mr-2">
                      {flagshipServices[0].number}
                    </span>
                    {flagshipServices[0].title}
                  </h3>
                </div>
                <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed max-w-2xl">
                  {flagshipServices[0].summary}
                </p>

                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-hairline text-xs sm:text-sm text-steel">
                  {flagshipServices[0].deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 text-pepperoni shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={getWhatsAppUrl(
                    `Olá, HL Pneus! Gostaria de um orçamento para ${flagshipServices[0].whatsappTopic}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-pepperoni text-ice text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Orçar alinhamento 3D</span>
                </a>
                <button
                  type="button"
                  onClick={() => onSelectServiceForContact(flagshipServices[0].title)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-3 text-sm font-medium text-steel hover:text-ice transition-colors whitespace-nowrap"
                >
                  <span>Preencher formulário</span>
                  <ArrowUpRight className="w-4 h-4 text-pepperoni" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.article>

          {/* Architectural Feature Block for Service 02 (5 cols) */}
          <motion.article
            variants={serviceCardVariants}
            whileHover={{
              scale: 1.012,
              transition: { duration: 0.18, ease: MOTION_EASE },
            }}
            className="lg:col-span-5 surface-elevated border border-hairline p-6 sm:p-8 flex flex-col justify-between bg-calibration-grid service-card-glow"
          >
            <div>
              <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
                <span className="font-display text-4xl font-bold text-pepperoni tabular-nums">
                  {flagshipServices[1].number}
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-steel font-medium">
                  Rodagem · Montagem
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold uppercase text-ice tracking-tight">
                {flagshipServices[1].title}
              </h3>

              <p className="mt-4 text-base text-steel leading-relaxed">
                {flagshipServices[1].summary}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-6 border-t border-hairline pt-6">
                <ul className="space-y-4 flex-1">
                  {flagshipServices[1].deliverables.map((detail, idx) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-sm sm:text-base text-ice/90"
                    >
                      <span className="font-display text-sm text-pepperoni tabular-nums mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="w-36 sm:w-40 shrink-0 self-center">
                  <img
                    src={WORKSHOP_INFO.images.tires}
                    alt="Pneus novos e roda de liga leve disponíveis na HL Pneus"
                    width={400}
                    height={520}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.65)]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-hairline flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={getWhatsAppUrl(
                  `Olá, HL Pneus! Gostaria de consultar medidas e orçamento para ${flagshipServices[1].whatsappTopic}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] border border-pepperoni bg-pepperoni/10 text-ice hover:bg-pepperoni text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Consultar medidas de pneus</span>
              </a>
              <button
                type="button"
                onClick={() => onSelectServiceForContact(flagshipServices[1].title)}
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 text-sm font-medium text-steel hover:text-ice transition-colors whitespace-nowrap"
              >
                <span>Solicitar por aqui</span>
                <ArrowUpRight className="w-4 h-4 text-pepperoni" aria-hidden="true" />
              </button>
            </div>
          </motion.article>
        </motion.div>

        {/* Band 2: Inverted Interactive Technical Split for Services 03 to 06 */}
        <div className="mt-16 pt-16 border-t border-hairline grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left: Interactive Technical Service Selector (03-06) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <RevealHeader>
                <motion.p
                  variants={headerItemVariants}
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-steel mb-6"
                >
                  Mecânica sob o capô e chassi · Selecione para inspecionar
                </motion.p>
              </RevealHeader>

              <motion.div
                variants={serviceCardContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_CONFIG}
                role="tablist"
                aria-label="Serviços mecânicos 03 a 06"
                className="divide-y divide-hairline border-y border-hairline"
              >
                {technicalServices.map((service) => {
                  const isActive = service.id === activeService.id;
                  return (
                    <motion.button
                      key={service.id}
                      id={`tab-${service.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="tech-service-panel"
                      variants={serviceCardVariants}
                      onClick={() => setActiveTechId(service.id)}
                      className={`w-full text-left py-5 px-4 flex items-start justify-between gap-4 min-h-[68px] service-row-hover ${
                        isActive
                          ? 'surface-elevated text-ice'
                          : 'bg-transparent text-steel hover:surface-panel hover:text-ice'
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-display text-xl font-bold tabular-nums shrink-0 ${
                            isActive ? 'text-pepperoni' : 'text-ash'
                          }`}
                        >
                          {service.number}
                        </span>
                        <div>
                          <span className="font-display text-xl sm:text-2xl font-semibold uppercase tracking-tight block">
                            {service.title}
                          </span>
                          <span className="text-sm text-steel mt-1 block">
                            {service.summary}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        className={`w-5 h-5 shrink-0 mt-1 transition-transform duration-200 ${
                          isActive ? 'text-pepperoni translate-x-0.5 -translate-y-0.5' : 'text-ash'
                        }`}
                        aria-hidden="true"
                      />
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* Active Service Inspection Panel */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeService.id}
                id="tech-service-panel"
                role="tabpanel"
                aria-labelledby={`tab-${activeService.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.22, ease: MOTION_EASE }}
                className="mt-6 surface-panel border border-hairline p-6 service-card-glow"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-ice">
                    O que verificamos em {activeService.title}
                  </h3>
                </div>
                <ul className="space-y-2.5 text-sm text-steel">
                  {activeService.deliverables.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 text-pepperoni shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-hairline flex flex-wrap items-center gap-4">
                  <a
                    href={getWhatsAppUrl(
                      `Olá, HL Pneus! Quero agendar ou orçar ${activeService.whatsappTopic}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-pepperoni text-ice text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Conversar no WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onSelectServiceForContact(activeService.title)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] px-3 text-sm font-medium text-steel hover:text-ice transition-colors whitespace-nowrap"
                  >
                    <span>Usar no formulário de orçamento</span>
                    <ArrowUpRight className="w-4 h-4 text-pepperoni" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Precision Torque / Brakes / Suspension Documentary Photo */}
          <RevealBlock
            y={22}
            delay={0.1}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <PrecisionImage
              src={WORKSHOP_INFO.images.brakes}
              alt="Mecânico utilizando torquímetro em conjunto de disco de freio ventilado e suspensão na HL Pneus"
              width={1200}
              height={800}
              aspectClass="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[480px]"
              imgClassName="hover:scale-[1.02]"
              caption="Inspeção de torque em freios e suspensão automotiva"
            />
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
