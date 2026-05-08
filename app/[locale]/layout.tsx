import type React from "react"
import type { Metadata } from "next"
import { getTranslations, locales } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import { notFound } from "next/navigation"

const BASE_URL = "https://lp-juspilot.vercel.app"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) notFound()
  const t = getTranslations(locale as Locale)
  const canonical = locale === "pt" ? BASE_URL : `${BASE_URL}/${locale}`

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical,
      languages: {
        "pt-BR": BASE_URL,
        "en": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: canonical,
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    twitter: {
      title: t.meta.title,
      description: t.meta.description,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) notFound()

  return <>{children}</>
}
