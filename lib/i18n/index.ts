import { pt } from "./pt"
import { en } from "./en"
import type { Translations } from "./pt"

export type Locale = "pt" | "en"
export const locales: Locale[] = ["pt", "en"]
export const defaultLocale: Locale = "pt"

export const translations: Record<Locale, Translations> = { pt, en }

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[defaultLocale]
}

export type { Translations }
