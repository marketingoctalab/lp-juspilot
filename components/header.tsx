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
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparent = !isScrolled && !mobileMenuOpen;

  const navigation = DEFAULT_NAV.map((item) => ({
    name: navLabels[item.key],
    href: item.href,
  }));

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-[background,border-color,backdrop-filter] duration-300',
        transparent
          ? 'bg-transparent border-b border-transparent'
          : 'bg-[#0B0C0F]/85 backdrop-blur-xl border-b border-white/10'
      )}
    >
      <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-9">
          <Link href={`/${locale}`} aria-label="Juspilot" className="flex items-center shrink-0">
            <Logo size="sm" variant="light" />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'notion-nav transition-colors',
                    active ? 'text-white font-semibold' : 'text-white/65 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher
            currentLocale={locale}
            label={navLabels.switchLang ?? (locale === 'pt' ? 'English' : 'Português')}
            className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
          />
          <Button
            size="sm"
            className="bg-[#D97757] text-white hover:bg-[#c66747] border-0"
            onClick={() => window.dispatchEvent(new CustomEvent('juspilot:open-contact'))}
          >
            {navLabels.cta}
          </Button>
        </div>

        <button
          type="button"
          aria-label="Menu"
          className="lg:hidden p-2 text-white/65 hover:text-white"
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
            className="lg:hidden absolute left-4 right-4 top-[calc(100%+4px)] rounded-[12px] bg-white border border-black/[0.08] shadow-card p-5 space-y-1"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-[5px] notion-nav text-ink hover:bg-black/[0.04]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-black/[0.06] flex flex-col gap-2">
              <LanguageSwitcher
                currentLocale={locale}
                label={navLabels.switchLang ?? (locale === 'pt' ? 'English' : 'Português')}
                className="w-full text-center px-4 py-2 rounded-lg border border-black/10 text-sm text-ink/70 hover:bg-black/[0.04] transition-colors"
              />
              <Button
                className="w-full bg-[#D97757] text-white hover:bg-[#c66747] border-0"
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
