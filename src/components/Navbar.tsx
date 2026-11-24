import { useEffect, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { WORKSHOP_INFO, getWhatsAppUrl } from '../data/workshop';

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Promoções', href: '#promocoes' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Unidades', href: '#unidades' },
  { label: 'Contato', href: '#contato' },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const whatsappHref = getWhatsAppUrl();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b surface-glass ${
        scrolled || menuOpen ? 'border-hairline' : 'border-hairline/60'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-[68px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#inicio"
          onClick={() => setMenuOpen(false)}
          className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 group"
          aria-label="HL Pneus — Ir para o início"
        >
          <img
            src={WORKSHOP_INFO.logoSrc}
            alt="Logotipo HL Pneus"
            width={36}
            height={36}
            loading="eager"
            decoding="async"
            className="w-9 h-9 rounded-full object-cover shrink-0 border border-hairline"
          />
          <span className="font-display text-xl font-bold tracking-wider uppercase text-ice group-hover:text-pepperoni transition-colors duration-200 whitespace-nowrap shrink-0">
            HL Pneus
          </span>
        </a>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-steel"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 hover:text-ice transition-colors duration-200 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[2px] after:w-0 after:bg-[hsl(var(--accent))] hover:after:w-full after:transition-all after:duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] bg-pepperoni text-ice text-sm font-semibold tracking-wide transition-colors duration-200 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Conversar no WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-ice border border-hairline surface-panel hover:border-pepperoni transition-colors duration-200"
          >
            {menuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Menu móvel"
          className="md:hidden border-t border-hairline surface-canvas px-4 py-5 space-y-1"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center min-h-[44px] px-3 text-base font-medium text-ice hover:text-pepperoni border-b border-hairline/60 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full min-h-[48px] px-5 py-3 bg-pepperoni text-ice text-sm font-semibold tracking-wide"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Conversar no WhatsApp</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
