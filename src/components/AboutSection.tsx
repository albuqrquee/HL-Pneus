import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import {
  BRANCH_UNITS,
  OPERATIONAL_STATS,
  WORKSHOP_INFO,
  getWhatsAppUrl,
} from '../data/workshop';
import { PrecisionImage } from './PrecisionImage';
import {
  RevealBlock,
  RevealHeader,
  RevealItem,
  RevealStagger,
  headerItemVariants,
} from './ScrollReveal';

interface AboutSectionProps {
  selectedUnitId: string;
  onSelectUnitForMap: (unitId: string) => void;
}

export function AboutSection({
  selectedUnitId,
  onSelectUnitForMap,
}: AboutSectionProps) {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="py-24 md:py-32 surface-panel border-b border-hairline"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Authority Prose, Brand Emblem & Verifiable Operational Stats */}
          <RevealBlock y={22} className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Brand Emblem Lockup & Section Header */}
              <RevealHeader>
                <motion.div
                  variants={headerItemVariants}
                  className="flex items-center gap-4 mb-8"
                >
                  <img
                    src={WORKSHOP_INFO.logoSrc}
                    alt="Emblema oficial HL Pneus"
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 rounded-full object-cover border border-hairline shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pepperoni">
                      Sobre a oficina
                    </p>
                    <p className="text-sm text-steel mt-0.5 font-body">
                      Rede Automotiva HL Pneus · Minas Gerais
                    </p>
                  </div>
                </motion.div>

                <motion.h2
                  id="sobre-heading"
                  variants={headerItemVariants}
                  className="font-display font-bold uppercase text-ice tracking-tight leading-[0.98]"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.35rem)',
                    textWrap: 'balance',
                  }}
                >
                  Diagnóstico claro antes de qualquer chave na roda.
                </motion.h2>
              </RevealHeader>

              <div className="mt-6 space-y-4 font-body text-base sm:text-lg text-steel leading-relaxed max-w-2xl">
                <p>
                  A HL Pneus é especializada em produtos e serviços de qualidade para
                  o universo automotivo, demonstrando há quase 10 anos ser a escolha
                  certa para o seu carro.
                </p>
                <p>
                  Somos um grupo de soluções para esse segmento, com lojas afiliadas em
                  Juiz de Fora, Varginha, Divinópolis, Pouso Alegre e Sorocaba,
                  oferecendo a maior variedade de pneus de diversas marcas para
                  veículos.
                </p>
                <p>
                  Valorizamos a confiança no atendimento e nos serviços prestados por
                  profissionais altamente capacitados, visando sempre fornecer a melhor
                  solução automotiva.
                </p>
              </div>
            </div>

            {/* 4-Column Operational Structure Strip */}
            <div className="mt-12 pt-10 border-t border-hairline">
              <RevealStagger
                staggerDelay={0.06}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
              >
                {OPERATIONAL_STATS.map((stat) => (
                  <RevealItem key={stat.label} y={14} className="flex">
                    <div className="w-full surface-canvas border border-hairline p-5 flex flex-col justify-between">
                      <div>
                        <span className="font-display text-3xl sm:text-4xl font-bold text-pepperoni tabular-nums tracking-tight block">
                          {stat.value}
                        </span>
                        <h3 className="font-display text-base font-semibold uppercase text-ice mt-2 tracking-wide">
                          {stat.label}
                        </h3>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-steel mt-2 leading-relaxed">
                        {stat.detail}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </RevealBlock>

          {/* Right Column: Documentary Workshop Portrait */}
          <RevealBlock y={22} delay={0.1} className="lg:col-span-5">
            <PrecisionImage
              src={WORKSHOP_INFO.images.about}
              alt="Mecânico da HL Pneus ao lado de carrinho de ferramentas e elevadores automotivos na oficina"
              width={896}
              height={1200}
              aspectClass="aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[540px]"
              imgClassName="object-top hover:scale-[1.02]"
              caption="Estrutura técnica da HL Pneus"
            />
          </RevealBlock>
        </div>

        {/* Band 2: 7 Filiais da HL Pneus — Responsive Architectural Grid with Neighborhood Prominence */}
        <div
          id="unidades"
          className="mt-20 pt-16 border-t border-hairline scroll-mt-24"
        >
          <RevealHeader className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <motion.p
                variants={headerItemVariants}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-pepperoni mb-2"
              >
                Nossas filiais · 07 endereços
              </motion.p>
              <motion.h3
                variants={headerItemVariants}
                className="font-display font-bold uppercase text-ice tracking-tight leading-[1]"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
              >
                Endereços por bairro e cidade.
              </motion.h3>
            </div>
            <motion.p
              variants={headerItemVariants}
              className="font-body text-sm text-steel max-w-md"
            >
              Clique em uma filial para destacá-la no mapa interativo ou abra o trajeto
              diretamente no Google Maps.
            </motion.p>
          </RevealHeader>

          <RevealStagger
            staggerDelay={0.05}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsl(var(--border-hairline))] border border-hairline"
          >
            {BRANCH_UNITS.map((unit) => {
              const isSelected = unit.id === selectedUnitId;

              return (
                <RevealItem key={unit.id} y={14} className="flex">
                  <article
                    className={`w-full p-6 flex flex-col justify-between transition-colors duration-200 ${
                      isSelected ? 'surface-elevated' : 'surface-canvas hover:surface-elevated'
                    }`}
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-hairline">
                        <span className="font-display text-sm font-bold text-pepperoni tabular-nums">
                          {unit.number}
                        </span>
                        <span className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-ash">
                          {unit.cityState}
                        </span>
                      </div>

                      {/* Bairro em destaque */}
                      <h4 className="font-display text-2xl font-bold uppercase text-ice tracking-tight mt-4">
                        {unit.district}
                      </h4>

                      <p className="font-body text-sm text-steel mt-2 leading-relaxed tabular-nums">
                        {unit.street}
                      </p>

                      {unit.reference && (
                        <p className="font-body text-xs text-ash mt-1.5">
                          {unit.reference}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectUnitForMap(unit.id)}
                        className={`inline-flex items-center gap-1.5 min-h-[36px] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'text-pepperoni'
                            : 'text-ice hover:text-pepperoni'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{isSelected ? 'No mapa abaixo' : 'Ver no mapa'}</span>
                      </button>

                      <a
                        href={unit.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 min-h-[36px] text-xs font-body text-steel hover:text-ice transition-colors whitespace-nowrap"
                      >
                        <span>Rota</span>
                        <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </RevealItem>
              );
            })}

            {/* 8th Grid Cell: Direct WhatsApp Desk to complete 4x2 Symmetry */}
            <RevealItem y={14} className="flex">
              <div className="w-full surface-elevated p-6 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pepperoni">
                    Atendimento central
                  </p>
                  <h4 className="font-display text-2xl font-bold uppercase text-ice tracking-tight mt-3 leading-tight">
                    Dúvida sobre qual loja fica mais perto?
                  </h4>
                  <p className="font-body text-sm text-steel mt-2.5 leading-relaxed">
                    Fale direto pelo WhatsApp para consultar estoque e agendar na unidade
                    mais próxima.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-hairline">
                  <a
                    href={getWhatsAppUrl(
                      'Olá, HL Pneus! Gostaria de saber qual unidade fica mais próxima e consultar disponibilidade.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full min-h-[44px] px-4 py-2.5 bg-pepperoni text-ice text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
                  >
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Conversar no WhatsApp</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </RevealItem>
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
