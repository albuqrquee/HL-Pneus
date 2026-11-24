import { FormEvent, RefObject, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  BRANCH_UNITS,
  SERVICES,
  WORKSHOP_INFO,
  getWhatsAppUrl,
} from '../data/workshop';
import { LocationMap } from './LocationMap';
import { RevealBlock, RevealHeader, headerItemVariants } from './ScrollReveal';

interface ContactSectionProps {
  selectedService: string;
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  nameInputRef: RefObject<HTMLInputElement | null>;
}

interface FormErrors {
  name?: string;
  phone?: string;
  vehicle?: string;
}

function formatBrazilPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function ContactSection({
  selectedService,
  selectedUnitId,
  onSelectUnit,
  nameInputRef,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [service, setService] = useState(selectedService || SERVICES[0].title);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<'address' | 'phone' | 'summary' | null>(null);

  const selectedUnit =
    BRANCH_UNITS.find((unit) => unit.id === selectedUnitId) || BRANCH_UNITS[0];

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
      setSubmittedMessage(null);
    }
  }, [selectedService]);

  const handleCopy = async (text: string, key: 'address' | 'phone' | 'summary') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 2400);
    } catch {
      // Clipboard blocked in restricted context; ignore silently
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    const trimmedName = name.trim();
    const phoneDigits = phone.replace(/\D/g, '');
    const trimmedVehicle = vehicle.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = 'Informe seu nome para identificação.';
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      nextErrors.phone = 'Informe um telefone ou WhatsApp válido com DDD.';
    }
    if (trimmedVehicle.length < 2) {
      nextErrors.vehicle = 'Informe o modelo do veículo (ex.: Onix 2021).';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      'Olá, equipe HL Pneus! Gostaria de solicitar um orçamento:',
      `Unidade: ${selectedUnit.district} (${selectedUnit.cityState})`,
      `Nome: ${name.trim()}`,
      `Telefone: ${phone.trim()}`,
      `Veículo: ${vehicle.trim()}`,
      `Serviço: ${service}`,
    ];
    if (notes.trim()) {
      lines.push(`Detalhes: ${notes.trim()}`);
    }

    setSubmittedMessage(lines.join('\n'));
  };

  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="py-24 md:py-32 surface-canvas border-b border-hairline scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Selected Unit Coordinates, WhatsApp & Stylized Dark Map */}
          <RevealBlock y={22} className="lg:col-span-5">
            <RevealHeader>
              <motion.p
                variants={headerItemVariants}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-pepperoni mb-3"
              >
                Atendimento e mapa · {selectedUnit.district}
              </motion.p>
              <motion.h2
                id="contato-heading"
                variants={headerItemVariants}
                className="font-display font-bold uppercase text-ice tracking-tight leading-[0.98]"
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                  textWrap: 'balance',
                }}
              >
                Fale direto com a oficina.
              </motion.h2>

              <motion.p
                variants={headerItemVariants}
                className="mt-4 text-base text-steel leading-relaxed"
              >
                Alterne entre as 7 filiais para visualizar a localização no mapa e gerar
                seu orçamento pelo WhatsApp.
              </motion.p>
            </RevealHeader>

            {/* Compact Unit Selector Pills */}
            <div
              className="mt-6 flex flex-wrap gap-1.5"
              role="group"
              aria-label="Selecionar filial no mapa"
            >
              {BRANCH_UNITS.map((unit) => {
                const isActive = unit.id === selectedUnit.id;
                return (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => {
                      onSelectUnit(unit.id);
                      setSubmittedMessage(null);
                    }}
                    aria-pressed={isActive}
                    className={`px-3 py-2 min-h-[38px] text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-pepperoni border-pepperoni text-ice'
                        : 'surface-panel border-hairline text-steel hover:border-ice hover:text-ice'
                    }`}
                  >
                    {unit.name}
                  </button>
                );
              })}
            </div>

            {/* Coordinates List */}
            <div className="mt-7 divide-y divide-hairline border-y border-hairline">
              <div className="py-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-pepperoni shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-ash">
                      Filial selecionada · {selectedUnit.district} ({selectedUnit.cityState})
                    </h3>
                    <p className="text-sm sm:text-base text-ice mt-1 leading-relaxed">
                      {selectedUnit.fullAddress}
                    </p>
                    {selectedUnit.reference && (
                      <p className="text-xs text-steel mt-1">{selectedUnit.reference}</p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <a
                        href={selectedUnit.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pepperoni hover:text-ice transition-colors min-h-[36px]"
                      >
                        <span>Abrir no Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedUnit.fullAddress, 'address')}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-steel hover:text-ice transition-colors min-h-[36px] cursor-pointer"
                      >
                        {copiedKey === 'address' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-pepperoni" aria-hidden="true" />
                            <span>Endereço copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copiar endereço</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-pepperoni shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-ash">
                      Telefone e WhatsApp
                    </h3>
                    <a
                      href={`tel:+${WORKSHOP_INFO.phoneDigits}`}
                      className="font-display text-2xl font-semibold text-ice hover:text-pepperoni transition-colors tabular-nums block mt-1"
                    >
                      {WORKSHOP_INFO.phoneDisplay}
                    </a>
                    <div className="mt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleCopy(WORKSHOP_INFO.phoneDisplay, 'phone')}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-steel hover:text-ice transition-colors min-h-[36px] cursor-pointer"
                      >
                        {copiedKey === 'phone' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-pepperoni" aria-hidden="true" />
                            <span>Número copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copiar telefone</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <a
                href={getWhatsAppUrl(
                  `Olá, equipe HL Pneus! Gostaria de falar com a filial ${selectedUnit.district} (${selectedUnit.cityState}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 min-h-[48px] bg-pepperoni text-ice text-sm sm:text-base font-semibold tracking-wide transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>

            <div className="mt-8">
              <LocationMap unit={selectedUnit} />
            </div>
          </RevealBlock>

          {/* Right Column: Lead Capture Form with Validation & WhatsApp Dispatch */}
          <RevealBlock
            y={22}
            delay={0.1}
            className="lg:col-span-7 surface-panel border border-hairline p-6 sm:p-10"
          >
            {!submittedMessage ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-hairline pb-5">
                  <h3 className="font-display text-2xl font-semibold uppercase text-ice tracking-tight">
                    Solicitar orçamento técnico
                  </h3>
                  <p className="text-sm text-steel mt-1">
                    Preencha os campos abaixo para gerar sua mensagem pronta para o WhatsApp da HL Pneus.
                  </p>
                </div>

                {/* Unidade de preferência */}
                <div>
                  <label
                    htmlFor="contact-unit"
                    className="block text-xs font-semibold uppercase tracking-wider text-steel mb-2"
                  >
                    Unidade de atendimento
                  </label>
                  <select
                    id="contact-unit"
                    name="unit"
                    value={selectedUnitId}
                    onChange={(e) => onSelectUnit(e.target.value)}
                    className="w-full min-h-[46px] px-4 py-2.5 surface-canvas border border-hairline focus:border-ice text-sm text-ice transition-colors"
                  >
                    {BRANCH_UNITS.map((unit) => (
                      <option key={unit.id} value={unit.id} className="surface-canvas text-ice">
                        {unit.number} {unit.district} — {unit.cityState}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-steel mb-2"
                    >
                      Nome completo *
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Seu nome"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      className={`w-full min-h-[46px] px-4 py-2.5 surface-canvas border text-sm text-ice placeholder:text-ash transition-colors ${
                        errors.name
                          ? 'border-pepperoni'
                          : 'border-hairline focus:border-ice'
                      }`}
                    />
                    {errors.name && (
                      <p
                        id="error-name"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-error"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-steel mb-2"
                    >
                      WhatsApp / Telefone *
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatBrazilPhone(e.target.value));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="(32) 99999-9999"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                      className={`w-full min-h-[46px] px-4 py-2.5 surface-canvas border text-sm text-ice tabular-nums placeholder:text-ash transition-colors ${
                        errors.phone
                          ? 'border-pepperoni'
                          : 'border-hairline focus:border-ice'
                      }`}
                    />
                    {errors.phone && (
                      <p
                        id="error-phone"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-error"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Veículo */}
                  <div>
                    <label
                      htmlFor="contact-vehicle"
                      className="block text-xs font-semibold uppercase tracking-wider text-steel mb-2"
                    >
                      Veículo e ano *
                    </label>
                    <input
                      id="contact-vehicle"
                      name="vehicle"
                      type="text"
                      value={vehicle}
                      onChange={(e) => {
                        setVehicle(e.target.value);
                        if (errors.vehicle) setErrors((prev) => ({ ...prev, vehicle: undefined }));
                      }}
                      placeholder="Ex.: Corolla 2020 ou Gol G7"
                      aria-invalid={Boolean(errors.vehicle)}
                      aria-describedby={errors.vehicle ? 'error-vehicle' : undefined}
                      className={`w-full min-h-[46px] px-4 py-2.5 surface-canvas border text-sm text-ice placeholder:text-ash transition-colors ${
                        errors.vehicle
                          ? 'border-pepperoni'
                          : 'border-hairline focus:border-ice'
                      }`}
                    />
                    {errors.vehicle && (
                      <p
                        id="error-vehicle"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-error"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.vehicle}</span>
                      </p>
                    )}
                  </div>

                  {/* Serviço */}
                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-semibold uppercase tracking-wider text-steel mb-2"
                    >
                      Serviço principal
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full min-h-[46px] px-4 py-2.5 surface-canvas border border-hairline focus:border-ice text-sm text-ice transition-colors"
                    >
                      {SERVICES.map((item) => (
                        <option key={item.id} value={item.title} className="surface-canvas text-ice">
                          {item.number} {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label
                    htmlFor="contact-notes"
                    className="block text-xs font-semibold uppercase tracking-wider text-steel mb-2"
                  >
                    Sintoma ou medida do pneu (opcional)
                  </label>
                  <textarea
                    id="contact-notes"
                    name="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex.: Pneu 205/55 R16, vibração acima de 80 km/h ou revisão de freios..."
                    className="w-full px-4 py-3 surface-canvas border border-hairline focus:border-ice text-sm text-ice placeholder:text-ash transition-colors resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] bg-pepperoni text-ice text-sm sm:text-base font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Preparar envio no WhatsApp</span>
                  </button>
                  <span className="text-xs text-ash">
                    Atendimento direto · {WORKSHOP_INFO.phoneDisplay}
                  </span>
                </div>
              </form>
            ) : (
              <div className="space-y-6" role="status" aria-live="polite">
                <div className="flex items-start gap-3 border-b border-hairline pb-5">
                  <CheckCircle2
                    className="w-6 h-6 text-pepperoni shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-semibold uppercase text-ice tracking-tight">
                      Orçamento pronto para envio
                    </h3>
                    <p className="text-sm text-steel mt-1">
                      Clique abaixo para abrir a conversa no WhatsApp da HL Pneus com os dados preenchidos.
                    </p>
                  </div>
                </div>

                <pre className="surface-canvas border border-hairline p-4 text-xs sm:text-sm text-ice font-body whitespace-pre-wrap leading-relaxed">
                  {submittedMessage}
                </pre>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={getWhatsAppUrl(submittedMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] bg-pepperoni text-ice text-sm font-semibold tracking-wide whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Conversar no WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(submittedMessage, 'summary')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] border border-strong text-ice hover:border-ice text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    {copiedKey === 'summary' ? (
                      <>
                        <Check className="w-4 h-4 text-pepperoni" aria-hidden="true" />
                        <span>Mensagem copiada</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>Copiar texto</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedMessage(null)}
                    className="inline-flex items-center justify-center px-4 py-3 min-h-[48px] text-sm font-medium text-steel hover:text-ice transition-colors whitespace-nowrap"
                  >
                    Editar dados
                  </button>
                </div>
              </div>
            )}
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
