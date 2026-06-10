'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Locale, Translations } from '@/lib/i18n';

interface HeaderProps {
  locale?: Locale
  t?: Translations['nav']
  onCtaClick?: () => void
  onMobileCtaClick?: () => void
}

const DEFAULT_NAV = [
  { key: 'platform' as const, href: 'https://juspilot.ai/plataforma' },
  { key: 'products' as const, href: 'https://juspilot.ai/produtos' },
  { key: 'pricing' as const, href: 'https://juspilot.ai/pricing' },
  { key: 'blog' as const, href: 'https://juspilot.ai/blog' },
];

export function Header({ locale = 'pt', t, onCtaClick, onMobileCtaClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const navLabels = t ?? {
    platform: 'Plataforma',
    products: 'Produtos',
    pricing: 'Planos',
    blog: 'Blog',
    cta: 'Testar grátis',
    switchLang: locale === 'pt' ? 'English' : 'Português',
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navigation = DEFAULT_NAV.map((item) => ({
    name: navLabels[item.key],
    href: item.href,
  }));

  function handleDesktopCta() {
    onCtaClick?.();
  }

  function handleMobileCta() {
    setMobileMenuOpen(false);
    (onMobileCtaClick ?? onCtaClick)?.();
  }

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-[background,border-color,backdrop-filter] duration-200 safe-top',
        isScrolled || mobileMenuOpen
          ? 'bg-page/90 backdrop-blur-md border-b border-hairline'
          : 'bg-page/80 backdrop-blur-sm border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-14 sm:h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-6 sm:gap-10 min-w-0">
          <Link href={`/${locale}`} aria-label="Juspilot" className="flex items-center shrink-0">
            <Logo size="sm" variant="dark" />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'type-nav-link transition-colors',
                    active ? 'text-ink' : 'text-body-muted hover:text-ink',
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher
            currentLocale={locale}
            label={navLabels.switchLang ?? (locale === 'pt' ? 'English' : 'Português')}
            className="type-nav-link text-body-muted hover:text-ink transition-colors"
          />
          <Button size="sm" onClick={handleDesktopCta} className="min-h-[40px]">
            {navLabels.cta}
          </Button>
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          className="lg:hidden p-2.5 -mr-1 text-body-muted hover:text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fechar menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 top-14 sm:top-16 bg-black/30 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="lg:hidden fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-hairline bg-canvas shadow-soft-lift safe-bottom"
            >
              <div className="mx-auto max-w-lg px-4 pt-3 pb-6">
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-hairline" />
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center min-h-[48px] px-3 rounded-lg type-nav-link text-ink hover:bg-soft-stone/60 active:bg-soft-stone"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="pt-4 mt-2 border-t border-hairline flex flex-col gap-2">
                  <LanguageSwitcher
                    currentLocale={locale}
                    label={navLabels.switchLang ?? (locale === 'pt' ? 'English' : 'Português')}
                    className="w-full text-center min-h-[48px] flex items-center justify-center rounded-lg type-nav-link text-body-muted hover:bg-soft-stone/60 transition-colors"
                  />
                  <Button className="w-full min-h-[48px] text-base" onClick={handleMobileCta}>
                    {navLabels.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
