import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { MonoLabel } from "@/components/ui/mono-label"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Locale, Translations } from "@/lib/i18n"

interface FooterProps {
  locale: Locale
  t: Translations["footer"]
}

export function Footer({ locale, t }: FooterProps) {
  return (
    <footer className="relative bg-primary text-on-dark-soft">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 pb-12">
          <div className="col-span-2 md:col-span-4">
            <Link href={`/${locale}`} aria-label="Juspilot" className="inline-flex">
              <Logo size="md" variant="light" className="mb-5" />
            </Link>
            <p className="type-body-sm text-on-dark-soft max-w-[280px] mb-6">
              {t.tagline}
            </p>
            <LanguageSwitcher
              currentLocale={locale}
              label={t.switchLang}
              className="type-mono-label text-on-dark-soft hover:text-on-dark transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <MonoLabel tone="on-dark" className="mb-4 block">
              {t.columns.product}
            </MonoLabel>
            <ul className="space-y-3">
              {t.links.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="type-body-sm text-on-dark-soft hover:text-on-dark transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <MonoLabel tone="on-dark" className="mb-4 block">
              {t.columns.resources}
            </MonoLabel>
            <ul className="space-y-3">
              {t.links.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="type-body-sm text-on-dark-soft hover:text-on-dark transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <MonoLabel tone="on-dark" className="mb-4 block">
              {t.columns.company}
            </MonoLabel>
            <ul className="space-y-3">
              {t.links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="type-body-sm text-on-dark-soft hover:text-on-dark transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/10">
          <p className="type-caption text-on-dark-soft/80">
            &copy; {new Date().getFullYear()} Juspilot. {t.copyright}
          </p>
          <div className="flex items-center gap-6 type-caption">
            {t.legal.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-on-dark-soft/80 hover:text-on-dark transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
