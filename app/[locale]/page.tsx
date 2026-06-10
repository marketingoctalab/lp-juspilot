"use client"

import { useCallback, useEffect, useRef, useState, use } from "react"
import { ChevronDown } from "lucide-react"
import { HeroSection } from "@/components/ui/hero-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactModal } from "@/components/contact-modal"
import { SectionHeading } from "@/components/marketing/section-heading"
import { DarkFeatureBand } from "@/components/marketing/dark-feature-band"
import { CtaBand } from "@/components/marketing/cta-band"
import { MonoLabel } from "@/components/ui/mono-label"
import { ValueHighlight } from "@/components/marketing/value-highlight"
import { ProcessOutputs } from "@/components/marketing/process-outputs"
import { SpeedMetric } from "@/components/marketing/speed-metric"
import { PainPointList } from "@/components/marketing/pain-point-list"
import { ImpactBand } from "@/components/marketing/impact-band"
import { PlatformShowcase } from "@/components/marketing/platform-showcase"
import { ComplianceSection } from "@/components/marketing/compliance-section"
import { getTranslations, locales } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"
import { LpPageTracker } from "@/components/analytics/lp-page-tracker"
import { trackCTAClick } from "@/lib/analytics"

const HERO_AVATARS = [
  { src: "", alt: "Usuário 1", fallback: "JS" },
  { src: "", alt: "Usuário 2", fallback: "MC" },
  { src: "", alt: "Usuário 3", fallback: "AL" },
  { src: "", alt: "Usuário 4", fallback: "RB" },
  { src: "", alt: "Usuário 5", fallback: "TP" },
]

export default function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)

  if (!locales.includes(locale as Locale)) notFound()

  const t = getTranslations(locale as Locale)

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [leadSource, setLeadSource] = useState("hero")
  const observerRef = useRef<IntersectionObserver>(null)

  const openContact = useCallback((source: string, ctaName?: string) => {
    setLeadSource(source)
    trackCTAClick({
      cta_name: ctaName ?? source,
      cta_location: source,
    })
    setModalOpen(true)
  }, [])

  useEffect(() => {
    const handler = () => openContact("global_event", "global_contact")
    window.addEventListener("juspilot:open-contact", handler)
    return () => window.removeEventListener("juspilot:open-contact", handler)
  }, [openContact])

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

  return (
    <div className="relative min-h-screen bg-page text-ink overflow-x-hidden">
      <LpPageTracker />
      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        locale={locale as Locale}
        leadSource={leadSource}
        t={t.modal}
      />
      <Header
        locale={locale as Locale}
        t={t.nav}
        onCtaClick={() => openContact("header", "header_cta")}
        onMobileCtaClick={() => openContact("header_mobile", "header_cta_mobile")}
      />

      <main id="conteudo-principal" className="pt-16 safe-bottom">
        <HeroSection
          aria-label="Hero"
          badge={t.hero.badge}
          title={t.hero.h1}
          animatedTexts={t.hero.animatedTexts}
          subtitle={t.hero.sub}
          ctaButtonText={t.hero.cta}
          socialProofText={t.hero.socialProof}
          avatars={HERO_AVATARS}
          onCtaClick={() => openContact("hero", "hero_primary")}
        />

        <ValueHighlight text={t.valueHighlight.text} />

        <section id="analise" aria-label="Análise de processos" className="container-page section-y animate-on-scroll">
          <SectionHeading
            eyebrow={t.processAnalysis.eyebrow}
            heading={t.processAnalysis.headline}
            description={t.processAnalysis.sub}
            className="mb-8 sm:mb-10"
          />
          <div className="mb-10 sm:mb-12 rounded-xl border border-hairline bg-soft-stone/60 px-6 py-8 sm:px-10">
            <SpeedMetric
              before={t.processAnalysis.speed.before}
              after={t.processAnalysis.speed.after}
              label={t.processAnalysis.speed.label}
            />
          </div>
          <ProcessOutputs items={t.processAnalysis.outputs} />
        </section>

        <section className="relative py-10 sm:py-12 border-y border-hairline bg-page overflow-hidden">
          <MonoLabel tone="muted" className="block text-center mb-6 sm:mb-8 px-4">
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
        </section>

        <section id="dores" aria-label="Dores do dia a dia" className="container-page section-y animate-on-scroll">
          <SectionHeading
            eyebrow={t.painPoints.eyebrow}
            heading={t.painPoints.headline}
            description={t.painPoints.sub}
            className="mb-8 sm:mb-10"
          />
          <PainPointList items={t.painPoints.items} />
        </section>

        <section id="impacto" aria-label="Impacto no escritório" className="container-page section-y animate-on-scroll">
          <SectionHeading
            align="center"
            eyebrow={t.impact.eyebrow}
            heading={t.impact.headline}
            className="mb-8 sm:mb-10 mx-auto"
          />
          <ImpactBand
            metrics={t.impact.metrics}
            premises={t.impact.premises}
            disclaimer={t.impact.disclaimer}
          />
        </section>

        <DarkFeatureBand
          eyebrow={t.jurisprudence.eyebrow}
          heading={t.jurisprudence.headline}
          body={t.jurisprudence.sub}
        >
          <div className="flex flex-wrap gap-2">
            {t.jurisprudence.chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 type-caption text-on-dark-soft"
              >
                {chip}
              </span>
            ))}
          </div>
        </DarkFeatureBand>

        <DarkFeatureBand
          id="jurimetria"
          tone="navy"
          eyebrow={t.jurimetria.eyebrow}
          heading={t.jurimetria.headline}
          body={t.jurimetria.sub}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {t.jurimetria.pillars.map((pillar) => (
              <div key={pillar.title} className="border-t border-white/15 pt-5">
                <h3 className="type-title-sm text-on-dark mb-2">{pillar.title}</h3>
                <p className="type-body-sm text-on-dark-soft">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </DarkFeatureBand>

        <section id="plataforma" aria-label="Plataforma completa" className="container-page section-y animate-on-scroll">
          <SectionHeading
            eyebrow={t.platform.eyebrow}
            heading={t.platform.headline}
            description={t.platform.sub}
            className="mb-8 sm:mb-10"
          />
          <PlatformShowcase
            featured={t.platform.featured.map((item) => ({
              ...item,
              badge: item.badge || undefined,
            }))}
            modules={t.platform.modules}
            supportHeadline={t.platform.supportHeadline}
            supportSub={t.platform.supportSub}
          />
        </section>

        <section id="conformidade" aria-label="Conformidade e segurança" className="container-page section-y animate-on-scroll">
          <SectionHeading
            eyebrow={t.compliance.eyebrow}
            heading={t.compliance.headline}
            description={t.compliance.sub}
            className="mb-8 sm:mb-10"
          />
          <ComplianceSection columns={t.compliance.columns} />
        </section>

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
            className="mb-10 sm:mb-12 mx-auto"
          />

          <div className="max-w-[800px] mx-auto space-y-3">
            {t.faq.items.map((faq, i) => (
              <div
                key={i}
                className="border border-hairline bg-canvas rounded-lg overflow-hidden transition-colors hover:border-whisper-strong"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left min-h-[56px]"
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
                  <p className="px-4 sm:px-6 pb-4 sm:pb-6 type-body-sm text-body-muted">{faq.answer}</p>
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
          onPrimaryClick={() => openContact("cta_section", "cta_section_primary")}
          secondaryLabel={t.cta.secondary}
          secondaryHref={t.cta.secondaryHref}
        />
      </main>

      <Footer locale={locale as Locale} t={t.footer} />
    </div>
  )
}
