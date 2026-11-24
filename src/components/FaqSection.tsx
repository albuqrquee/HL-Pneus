import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Minus, Plus } from 'lucide-react';
import { FAQ_ITEMS, getWhatsAppUrl } from '../data/workshop';
import {
  RevealHeader,
  RevealItem,
  RevealStagger,
  headerItemVariants,
} from './ScrollReveal';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="duvidas"
      aria-labelledby="faq-heading"
      className="py-24 md:py-32 surface-canvas border-b border-hairline"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Sticky Header */}
          <RevealHeader className="lg:col-span-4 lg:sticky lg:top-28">
            <motion.p
              variants={headerItemVariants}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-pepperoni mb-3"
            >
              Perguntas frequentes
            </motion.p>
            <motion.h2
              id="faq-heading"
              variants={headerItemVariants}
              className="font-display font-bold uppercase text-ice tracking-tight leading-[0.98]"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3.15rem)',
                textWrap: 'balance',
              }}
            >
              Dúvidas sobre revisão e pneus.
            </motion.h2>
            <motion.p
              variants={headerItemVariants}
              className="mt-5 text-base text-steel leading-relaxed"
            >
              Respostas diretas sobre manutenção preventiva, desgaste de rodagem e
              cuidados essenciais antes de pegar a estrada.
            </motion.p>

            <div className="mt-8 pt-6 border-t border-hairline">
              <p className="text-sm text-steel mb-4">
                Ficou com alguma dúvida sobre a medida do pneu ou sintoma do seu carro?
              </p>
              <a
                href={getWhatsAppUrl(
                  'Olá, HL Pneus! Tenho uma dúvida sobre revisão ou troca de pneus.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[46px] border border-pepperoni bg-pepperoni/10 text-ice hover:bg-pepperoni text-sm font-semibold tracking-wide transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Tirar dúvida no WhatsApp</span>
              </a>
            </div>
          </RevealHeader>

          {/* Right Column: Industrial Hairline Accordion */}
          <RevealStagger
            staggerDelay={0.055}
            delayChildren={0.06}
            className="lg:col-span-8 divide-y divide-hairline border-y border-hairline"
          >
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              const triggerId = `faq-trigger-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <RevealItem key={item.id} y={14} className="surface-canvas">
                  <h3 className="m-0">
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full text-left py-6 px-3 sm:px-5 min-h-[64px] flex items-center justify-between gap-4 transition-colors duration-200 cursor-pointer ${
                        isOpen
                          ? 'surface-panel text-ice'
                          : 'hover:surface-panel text-ice/90 hover:text-ice'
                      }`}
                    >
                      <span className="flex items-baseline gap-4 pr-2">
                        <span
                          className={`font-display text-lg sm:text-xl font-bold tabular-nums shrink-0 transition-colors ${
                            isOpen ? 'text-pepperoni' : 'text-ash'
                          }`}
                        >
                          {item.number}
                        </span>
                        <span className="font-display text-lg sm:text-2xl font-semibold uppercase tracking-tight leading-snug">
                          {item.question}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className={`w-9 h-9 shrink-0 flex items-center justify-center border transition-colors duration-200 ${
                          isOpen
                            ? 'border-pepperoni bg-pepperoni text-ice'
                            : 'border-hairline text-steel'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="surface-panel"
                      >
                        <div className="px-3 sm:px-5 pb-6 pl-11 sm:pl-14 pr-6">
                          <p className="text-sm sm:text-base text-steel leading-relaxed max-w-3xl">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
