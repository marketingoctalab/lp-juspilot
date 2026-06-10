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
}

const DEFAULT_NAV = [
  { key: 'platform' as const, href: 'https://juspilot.ai/plataforma' },
  { key: 'products' as const, href: 'https://juspilot.ai/produtos' },
  { key: 'pricing' as const, href: 'https://juspilot.ai/pricing' },
  { key: 'blog' as const, href: 'https://juspilot.ai/blog' },
];

export function Header({ locale = 'pt', t }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLabels = t ?? {
    platform: 'Plataforma',
    products: 'Produtos',
    pricing: 'Planos',
    blog: 'Blog',
    cta: 'Agendar conversa',
    switchLang: locale === 'pt' ? 'English' : 'Português',
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = DEFAULT_NAV.map((item) => ({
    name: navLabels[item.key],
    href: item.href,
  }));

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-[background,border-color,backdrop-filter] duration-200',
        isScrolled || mobileMenuOpen
          ? 'bg-page/85 backdrop-blur-md border-b border-hairline'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-10">
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
          <Button
            size="sm"
            onClick={() => window.dispatchEvent(new CustomEvent('juspilot:open-contact'))}
          >
            {navLabels.cta}
          </Button>
        </div>

        <button
          type="button"
          aria-label="Menu"
          className="lg:hidden p-2 text-body-muted hover:text-ink"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden absolute left-4 right-4 top-[calc(100%+8px)] rounded-lg border border-hairline bg-canvas p-4 space-y-1 shadow-lg"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md type-nav-link text-ink hover:bg-soft-stone/60"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-hairline flex flex-col gap-2">
              <LanguageSwitcher
                currentLocale={locale}
                label={navLabels.switchLang ?? (locale === 'pt' ? 'English' : 'Português')}
                className="w-full text-center px-4 py-2 rounded-md type-nav-link text-body-muted hover:bg-soft-stone/60 transition-colors"
              />
              <Button
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('juspilot:open-contact'));
                }}
              >
                {navLabels.cta}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
