'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { cn } from '@/lib/utils';
import type { Locale, Translations } from '@/lib/i18n';

interface HeaderProps {
  locale?: Locale
  t?: Translations['nav']
  onCtaClick?: () => void
  onMobileCtaClick?: () => void
}

const EXTERNAL_NAV = [
  { key: 'platform' as const, href: 'https://juspilot.ai/plataforma' },
  { key: 'products' as const, href: 'https://juspilot.ai/produtos' },
  { key: 'pricing' as const, href: 'https://juspilot.ai/pricing' },
  { key: 'blog' as const, href: 'https://juspilot.ai/blog' },
];

const PAGE_SECTIONS = [
  { key: 'analysis' as const, href: '#analise' },
  { key: 'jurimetria' as const, href: '#jurimetria' },
  { key: 'platform' as const, href: '#plataforma' },
  { key: 'faq' as const, href: '#faq' },
] as const;

export function Header({ locale = 'pt', t, onCtaClick, onMobileCtaClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const navLabels = t ?? {
    platform: 'Plataforma',
    products: 'Produtos',
    pricing: 'Planos',
    blog: 'Blog',
    cta: 'Testar grátis',
    ctaShort: 'Testar',
    switchLang: locale === 'pt' ? 'English' : 'Português',
    menuTitle: 'Menu',
    onPage: 'Nesta página',
    external: 'Juspilot',
    sections: {
      analysis: 'Análise de processos',
      jurimetria: 'Jurimetria',
      platform: 'Plataforma',
      faq: 'Dúvidas',
    },
  };

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener('keydown', handleKey);
    };
  }, [mobileMenuOpen, closeMenu]);

  const externalNav = EXTERNAL_NAV.map((item) => ({
    name: navLabels[item.key],
    href: item.href,
  }));

  const sectionNav = PAGE_SECTIONS.map((item) => ({
    name: navLabels.sections[item.key],
    href: item.href,
  }));

  function handleDesktopCta() {
    onCtaClick?.();
  }

  function handleMobileCta() {
    closeMenu();
    (onMobileCtaClick ?? onCtaClick)?.();
  }

  function scrollToSection(href: string) {
    const target = document.querySelector(href);
    if (!target) return;

    const headerOffset = window.matchMedia('(min-width: 640px)').matches ? 72 : 64;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function handleSectionLink(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith('#')) {
      closeMenu();
      return;
    }
    e.preventDefault();
    closeMenu();
    window.setTimeout(() => scrollToSection(href), 200);
  }

  const mobileMenu = mobileMenuOpen && mounted
    ? createPortal(
        <div className="lg:hidden fixed inset-0 z-[90]" role="presentation">
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200"
            onClick={closeMenu}
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={navLabels.menuTitle}
            className="absolute inset-x-0 bottom-0 z-[1] max-h-[min(560px,88dvh)] overflow-y-auto overscroll-contain rounded-t-2xl border-t border-hairline bg-canvas shadow-soft-lift safe-bottom animate-in slide-in-from-bottom duration-300"
          >
            <div className="mx-auto max-w-lg px-4 pt-3 pb-6">
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-hairline" />

              <p className="type-caption text-slate px-3 mb-2">{navLabels.onPage}</p>
              <div className="space-y-0.5 mb-4">
                {sectionNav.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center min-h-[48px] px-3 rounded-lg type-nav-link text-ink hover:bg-soft-stone/60 active:bg-soft-stone"
                    onClick={(e) => handleSectionLink(e, item.href)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <p className="type-caption text-slate px-3 mb-2 pt-2 border-t border-hairline">
                {navLabels.external}
              </p>
              <div className="space-y-0.5">
                {externalNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center min-h-[48px] px-3 rounded-lg type-nav-link text-ink hover:bg-soft-stone/60 active:bg-soft-stone"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-hairline flex flex-col gap-2">
                <LanguageSwitcher
                  currentLocale={locale}
                  label={navLabels.switchLang ?? (locale === 'pt' ? 'English' : 'Português')}
                  className="w-full text-center min-h-[48px] flex items-center justify-center rounded-lg type-nav-link text-body-muted hover:bg-soft-stone/60 active:bg-soft-stone transition-colors"
                />
                <Button className="w-full min-h-[48px] text-base" onClick={handleMobileCta}>
                  {navLabels.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-[100] transition-[background,border-color] duration-200 safe-top',
          isScrolled || mobileMenuOpen
            ? 'bg-page border-b border-hairline'
            : 'bg-page/90 border-b border-transparent',
          !mobileMenuOpen && isScrolled && 'backdrop-blur-md',
        )}
      >
        <nav
          className="mx-auto flex h-14 sm:h-16 max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6 md:px-8"
          aria-label="Principal"
        >
          <Link href={`/${locale}`} aria-label="Juspilot" className="flex items-center shrink-0 min-w-0">
            <Logo size="sm" variant="dark" />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {externalNav.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'type-nav-link transition-colors whitespace-nowrap',
                    active ? 'text-ink' : 'text-body-muted hover:text-ink',
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher
              currentLocale={locale}
              label={navLabels.switchLang ?? (locale === 'pt' ? 'English' : 'Português')}
              className="type-nav-link text-body-muted hover:text-ink transition-colors"
            />
            <Button size="sm" onClick={handleDesktopCta} className="min-h-[40px]">
              {navLabels.cta}
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <Button
              size="sm"
              onClick={handleMobileCta}
              className="min-h-[40px] px-3 text-xs sm:text-sm sm:px-4"
            >
              <span className="sm:hidden">{navLabels.ctaShort}</span>
              <span className="hidden sm:inline">{navLabels.cta}</span>
            </Button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Fechar menu' : navLabels.menuTitle}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-2.5 text-body-muted hover:text-ink min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg active:bg-soft-stone/80"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>
      {mobileMenu}
    </>
  );
}
