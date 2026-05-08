'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

interface LanguageSwitcherProps {
  currentLocale: Locale
  label: string
  className?: string
}

export function LanguageSwitcher({ currentLocale, label, className }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const targetLocale: Locale = currentLocale === 'pt' ? 'en' : 'pt'

  // Replace current locale prefix with target
  const targetPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`) || `/${targetLocale}`

  return (
    <Link
      href={targetPath}
      className={className}
      aria-label={`Switch to ${targetLocale === 'en' ? 'English' : 'Português'}`}
    >
      {label}
    </Link>
  )
}
