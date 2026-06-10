"use client"

import { useEffect, useRef, useState, use } from "react"
import { Scale, FileText, MessageSquare, Search, Workflow, ChevronDown } from "lucide-react"
import { HeroSection } from "@/components/ui/hero-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactModal } from "@/components/contact-modal"
import { SectionHeading } from "@/components/marketing/section-heading"
import { FeatureCard } from "@/components/marketing/feature-card"
import { DarkFeatureBand } from "@/components/marketing/dark-feature-band"
import { CtaBand } from "@/components/marketing/cta-band"
import { MonoLabel } from "@/components/ui/mono-label"
import { getTranslations, locales } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"

const FEATURE_ICONS = [Scale, MessageSquare, FileText, Search, Workflow]

function AnimatedCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numericStr = value.replace(/[^0-9.]/g, "")
          const targetNum = Number.parseFloat(numericStr)
          const unit = value.replace(/[0-9.]/g, "")

          let current = 0
          const increment = targetNum / 60
          const interval = setInterval(() => {
            current += increment
            if (current >= targetNum) {
              setDisplayValue(`${targetNum}${unit}`)
              clearInterval(interval)
            } else {
              setDisplayValue(`${current.toFixed(1)}${unit}`.replace(".0", ""))
            }
          }, 16)

          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="type-display-lg text-ink" ref={ref}>
      {displayValue}
    </div>
  )
}

export default function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)

  if (!locales.includes(locale as Locale)) notFound()

  const t = getTranslations(locale as Locale)

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver>(null)

  useEffect(() => {
    const handler = () => setModalOpen(true)
    window.addEventListener("juspilot:open-contact", handler)
    return () => window.removeEventListener("juspilot:open-contact", handler)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  const openContact = () => setModalOpen(true)

  return (
    <div className="relative min-h-screen bg-page text-ink overflow-x-hidden">
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} locale={locale as Locale} t={t.modal} />
      <Header locale={locale as Locale} t={t.nav} />

      <main id="conteudo-principal" className="pt-16">
        <HeroSection
          aria-label="Hero"
          badge={t.hero.badge}
          title={t.hero.h1}
          animatedTexts={t.hero.animatedTexts}
          subtitle={t.hero.sub}
          ctaButtonText={t.hero.cta}
          socialProofText={t.hero.socialProof}
          avatars={[
            { src: "", alt: "Usuário 1", fallback: "JS" },
            { src: "", alt: "Usuário 2", fallback: "MC" },
            { src: "", alt: "Usuário 3", fallback: "AL" },
            { src: "", alt: "Usuário 4", fallback: "RB" },
            { src: "", alt: "Usuário 5", fallback: "TP" },
          ]}
          onCtaClick={openContact}
        />

        {/* Logo marquee */}
        <section className="relative py-12 border-y border-hairline bg-page overflow-hidden">
          <div className="w-full">
            <MonoLabel tone="muted" className="block text-center mb-8">
              {t.logos.label}
            </MonoLabel>
            <div className="logo-marquee opacity-60 hover:opacity-80 transition-opacity">
              <div className="logo-marquee-content">
                {[
                  { src: "/logo_stj.svg", alt: "STJ" },
                  { src: "/logo-cnj-portal-20-09-1.svg", alt: "CNJ" },
                  { src: "/oab-nc.png", alt: "OAB" },
                  { src: "/receita-federal-logo.png", alt: "Receita Federal" },
                  { src: "/Logotipo_do_Supremo_Tribunal_Federal_P&B.svg", alt: "STF" },
                  { src: "/tse.svg", alt: "TSE" },
                  { src: "/logo_stj.svg", alt: "STJ" },
                  { src: "/logo-cnj-portal-20-09-1.svg", alt: "CNJ" },
                  { src: "/oab-nc.png", alt: "OAB" },
                  { src: "/receita-federal-logo.png", alt: "Receita Federal" },
                  { src: "/Logotipo_do_Supremo_Tribunal_Federal_P&B.svg", alt: "STF" },
                  { src: "/tse.svg", alt: "TSE" },
                ].map((logo, i) => (
                  <div key={i} className="px-6 md:px-10 flex items-center justify-center flex-shrink-0">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section id="resultados" aria-label="Resultados e métricas" className="container-page section-y animate-on-scroll">
          <SectionHeading
            align="center"
            size="lg"
            heading={
              <>
                {t.metrics.headline1}{" "}
                <span className="text-coral">{t.metrics.headline2}</span>
              </>
            }
            description={t.metrics.sub}
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {t.metrics.items.map((metric, i) => (
              <div
                key={i}
                className="p-8 text-center bg-canvas border border-hairline rounded-lg"
              >
                <MonoLabel tone="muted" className="mb-4 block">
                  {metric.label}
                </MonoLabel>
                <AnimatedCounter value={metric.value} />
                <p className="type-caption text-slate mt-3">{metric.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Differentials */}
        <section id="diferenciais" aria-label="Por que Juspilot" className="bg-soft-stone animate-on-scroll">
          <div className="container-page section-y">
            <SectionHeading
              align="center"
              eyebrow={t.differential.tag}
              heading={t.differential.headline}
              description={t.differential.sub}
              className="mb-12 mx-auto"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.differential.items.map((item, i) => (
                <FeatureCard
                  key={i}
                  title={item.title}
                  description={item.desc}
                  surface="canvas"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Platform */}
        <DarkFeatureBand
          eyebrow={t.platform.tag}
          heading={
            <>
              {t.platform.headline1}{" "}
              <span className="text-coral-soft">{t.platform.headline2}</span>
            </>
          }
          body={t.platform.sub}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.platform.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <div
                  key={i}
                  className="flex gap-4 items-start p-5 bg-white/5 border border-white/10 rounded-lg"
                >
                  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-coral-soft" />
                  <div>
                    <h3 className="type-title-sm text-on-dark mb-1">{feature.title}</h3>
                    <p className="type-body-sm text-on-dark-soft">{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </DarkFeatureBand>

        {/* FAQ */}
        <section id="faq" aria-label="Perguntas frequentes" className="container-page section-y animate-on-scroll">
          <SectionHeading
            align="center"
            eyebrow={t.faq.tag}
            heading={
              <>
                {t.faq.headline1}{" "}
                <span className="text-coral">{t.faq.headline2}</span>
              </>
            }
            description={t.faq.sub}
            className="mb-12 mx-auto"
          />

          <div className="max-w-[800px] mx-auto space-y-3">
            {t.faq.items.map((faq, i) => (
              <div
                key={i}
                className="border border-hairline bg-canvas rounded-lg overflow-hidden transition-colors hover:border-whisper-strong"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="type-title-sm pr-4">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 flex-shrink-0 text-slate transition-transform duration-300",
                      openFaqIndex === i && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openFaqIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <p className="px-6 pb-6 type-body-sm text-body-muted">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CtaBand
          eyebrow={t.cta.badge}
          heading={t.cta.headline}
          subline={t.cta.sub}
          primaryLabel={t.cta.primary}
          secondaryLabel={t.cta.secondary}
          onPrimaryClick={openContact}
          onSecondaryClick={openContact}
        />
      </main>

      <Footer locale={locale as Locale} t={t.footer} />
    </div>
  )
}
