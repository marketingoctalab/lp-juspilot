"use client"

import { useEffect, useRef, useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Scale, FileText, MessageSquare, Search, Workflow, ChevronDown } from "lucide-react"
import { HeroPreview } from "@/components/hero-preview"
import { Header } from "@/components/header"
import { ContactModal } from "@/components/contact-modal"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getTranslations, locales } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import { notFound } from "next/navigation"

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
    <div className="text-8xl" ref={ref}>
      {displayValue}
    </div>
  )
}

export default function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)

  if (!locales.includes(locale as Locale)) notFound()

  const t = getTranslations(locale as Locale)

  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [dashboardScrollOffset, setDashboardScrollOffset] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)

  useEffect(() => {
    const handler = () => setModalOpen(true)
    window.addEventListener("juspilot:open-contact", handler)
    return () => window.removeEventListener("juspilot:open-contact", handler)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (dashboardRef.current) {
        const dashboardRect = dashboardRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const rotationStart = viewportHeight * 0.8
        const rotationEnd = viewportHeight * 0.2

        if (dashboardRect.top >= rotationStart) {
          setDashboardScrollOffset(0)
        } else if (dashboardRect.top <= rotationEnd) {
          setDashboardScrollOffset(15)
        } else {
          const scrollRange = rotationStart - rotationEnd
          const currentProgress = rotationStart - dashboardRect.top
          const rotationProgress = currentProgress / scrollRange
          setDashboardScrollOffset(rotationProgress * 15)
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

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
    <div className="relative min-h-screen bg-[#0B0C0F] text-[#F2F3F5] overflow-x-hidden">
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} locale={locale as Locale} t={t.modal} />
      <Header locale={locale as Locale} t={t.nav} />

      <main id="conteudo-principal">
        {/* Hero */}
        <section
          aria-label="Hero"
          ref={heroRef}
          className={`relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isLoaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
          style={{
            backgroundImage: `url('/mario-gogh-VBLHICVh-lI-unsplash.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              backgroundImage: `url('/mario-gogh-VBLHICVh-lI-unsplash.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-[#0B0C0F]/70 to-transparent pointer-events-none" />

          <div
            className="max-w-[1120px] w-full mx-auto relative z-10"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 glass-pill px-4 py-2 rounded-full mb-8 text-xs md:text-sm text-[#A7ABB3] stagger-reveal border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                {t.hero.badge}
              </div>
              <h1 className="font-serif font-light text-[36px] leading-[1.1] sm:text-[52px] md:text-[72px] lg:text-[88px] md:leading-[1.05] mb-6 text-balance stagger-reveal">
                {t.hero.h1}
              </h1>
              <p
                className="text-[#A7ABB3] text-base md:text-lg max-w-[560px] mx-auto mb-10 leading-relaxed stagger-reveal text-white"
                style={{ animationDelay: "180ms" }}
              >
                {t.hero.sub}
              </p>
              <div className="stagger-reveal flex flex-col items-center gap-4" style={{ animationDelay: "270ms" }}>
                <Button
                  onClick={() => setModalOpen(true)}
                  className="glass-button px-10 py-6 text-base rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white"
                >
                  {t.hero.cta}
                </Button>
              </div>
            </div>

            <div className="mt-12 md:mt-20 stagger-reveal" style={{ animationDelay: "360ms" }} ref={dashboardRef}>
              <div style={{ perspective: "1200px" }}>
                <div
                  className="relative rounded-[24px] overflow-hidden"
                  style={{
                    transform: `rotateX(${dashboardScrollOffset}deg)`,
                    transformStyle: "preserve-3d",
                    transition: "transform 0.05s linear",
                  }}
                >
                  <HeroPreview />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logo marquee */}
        <section className="relative py-12 border-y border-white/5 bg-[#0B0C0F] overflow-hidden md:py-8 md:pt-8 md:pb-4">
          <div className="w-full">
            <p className="text-center text-xs md:text-sm uppercase tracking-[0.2em] text-[#A7ABB3] mb-8">
              {t.logos.label}
            </p>
            <div className="logo-marquee">
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
                      className="h-8 md:h-10 w-auto object-contain opacity-50 hover:opacity-70 transition-all duration-300 brightness-0 invert"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section id="resultados" aria-label="Resultados e métricas" className="relative py-20 md:py-32 px-4 animate-on-scroll md:pt-24 md:pb-20">
          <div className="max-w-[1120px] w-full mx-auto">
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 md:mb-8 text-center text-balance">
              {t.metrics.headline1}{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.metrics.headline2}
              </span>
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base mb-12 md:mb-16 text-center max-w-[600px] mx-auto leading-relaxed">
              {t.metrics.sub}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[800px] mx-auto">
              {t.metrics.items.map((metric, i) => (
                <div key={i} className="p-6 md:p-10 text-center border border-white/10 border-t-0 border-b border-l-0 border-r-0 md:py-10 md:pb-20">
                  <div className={`text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-4 flex items-center justify-center gap-2`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? "bg-pink-400/60" : "bg-purple-400/60"}`} />
                    {metric.label}
                  </div>
                  <div className="font-serif text-[48px] md:text-[72px] leading-none font-medium">
                    <AnimatedCounter value={metric.value} />
                  </div>
                  <div className="text-[11px] md:text-xs text-[#A7ABB3] mt-3">{metric.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentials */}
        <section id="diferenciais" aria-label="Por que Juspilot" className="relative py-20 md:py-32 animate-on-scroll bg-[#0B0C0F]">
          <div className="text-center mb-12 md:mb-16 px-4">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              {t.differential.tag}
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance whitespace-pre-line">
              {t.differential.headline}
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
              {t.differential.sub}
            </p>
          </div>
          <div className="max-w-[1120px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.differential.items.map((item, i) => (
              <div key={i} className="p-6 md:p-8 border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300">
                <div className={`w-1.5 h-1.5 rounded-full mb-4 ${i % 2 === 0 ? "bg-pink-400/60" : "bg-purple-400/60"}`} />
                <h3 className="font-serif text-lg md:text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-[#A7ABB3] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Platform */}
        <section id="plataforma" aria-label="A plataforma Juspilot" className="relative py-20 md:py-32 px-4 animate-on-scroll">
          <div className="max-w-[1120px] w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
              <div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                  {t.platform.tag}
                </div>
                <h2 className="font-serif text-[36px] leading-[1.15] md:text-[56px] md:leading-[1.1] font-medium mb-8 text-balance">
                  {t.platform.headline1}{" "}
                  <span
                    className="inline-block"
                    style={{
                      background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {t.platform.headline2}
                  </span>
                </h2>
                <p className="text-[#A7ABB3] text-base md:text-lg leading-relaxed">
                  {t.platform.sub}
                </p>
              </div>

              <div className="space-y-5">
                {t.platform.features.map((feature, i) => {
                  const Icon = FEATURE_ICONS[i]
                  return (
                    <div key={i} className="flex gap-4 items-start p-5 border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300">
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink-400/70" />
                      <div>
                        <h3 className="text-sm md:text-base font-medium mb-1">{feature.title}</h3>
                        <p className="text-xs md:text-sm text-[#A7ABB3] leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-label="Perguntas frequentes" className="relative py-20 md:py-32 px-4 animate-on-scroll">
          <div className="max-w-[800px] w-full mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                {t.faq.tag}
              </div>
              <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
                {t.faq.headline1}{" "}
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #d9a7c7 0%, #fffcdc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.faq.headline2}
                </span>
              </h2>
              <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
                {t.faq.sub}
              </p>
            </div>

            <div className="space-y-4">
              {t.faq.items.map((faq, i) => (
                <div key={i} className="border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-base md:text-lg font-medium pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 text-[#A7ABB3] transition-transform duration-300 ${openFaqIndex === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-6 pb-6 text-sm md:text-base text-[#A7ABB3] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="cta"
          aria-label="Agendar conversa"
          className="relative py-24 md:py-40 px-4 animate-on-scroll overflow-hidden pt-0"
          style={{
            backgroundImage: `url('/praca-3-poderes-14.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundAttachment: "scroll",
          }}
        >
          <div className="absolute inset-0 bg-[#0B0C0F]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-transparent to-[#0B0C0F]/60 pointer-events-none" />

          <div className="max-w-[800px] w-full mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 glass-pill px-4 py-2 rounded-full mb-8 text-xs md:text-sm text-[#A7ABB3]">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              {t.cta.badge}
            </div>

            <h2 className="font-serif text-[40px] leading-[1.15] md:text-[64px] md:leading-[1.1] font-medium mb-6 text-balance">
              {t.cta.headline}
            </h2>
            <p className="text-[#A7ABB3] text-base md:text-lg mb-10 leading-relaxed max-w-[560px] mx-auto">
              {t.cta.sub}
            </p>

            <div className="flex flex-col items-center gap-5">
              <Button
                onClick={() => setModalOpen(true)}
                className="glass-button text-base rounded-full bg-white/5 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 text-white px-8 py-6"
              >
                {t.cta.primary}
              </Button>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/80 border border-white/20 rounded-full px-5 py-2.5 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                {t.cta.secondary}
                <span className="text-pink-400">→</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-[#1c1917]" style={{ borderTop: "1px solid rgba(205,194,177,0.08)" }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-20 pb-10">
          <div className="mb-14 md:mb-20">
            <p
              className="select-none font-semibold"
              style={{ fontSize: "clamp(80px, 16vw, 220px)", lineHeight: 0.9, color: "rgba(205,194,177,0.12)" }}
              aria-hidden
            >
              Juspilot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-14">
            <div className="md:col-span-4">
              <div className="flex items-center gap-1 mb-4">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px]" aria-hidden>
                  <rect x="4.5" y="3.5" width="23" height="25" rx="3.5" stroke="#D97757" strokeWidth="2.8" fill="none" />
                  <path d="M11 10.5H21" stroke="#D97757" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M16 10.5V19C16 20.933 14.433 22.5 12.5 22.5" stroke="#D97757" strokeWidth="2.8" strokeLinecap="round" />
                </svg>
                <span className="tracking-[-0.028em] font-semibold leading-none text-[20px] text-white">Juspilot</span>
              </div>
              <p className="text-[15px] leading-[1.55] max-w-[280px] mb-5" style={{ color: "rgba(245,245,244,0.8)" }}>
                {t.footer.tagline}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em]"
                  style={{ background: "rgba(168,162,158,0.15)", color: "#a8a29e" }}
                >
                  {t.footer.available}
                </span>
                <LanguageSwitcher
                  currentLocale={locale as Locale}
                  label={t.footer.switchLang}
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors hover:text-white cursor-pointer"
                  style={{ background: "rgba(168,162,158,0.15)", color: "#a8a29e" } as React.CSSProperties}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] mb-4" style={{ color: "#a8a29e" }}>
                {t.footer.columns.product}
              </p>
              <ul className="space-y-2.5">
                {t.footer.links.product.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[14px] leading-[1.43] transition-colors hover:text-[#f5f5f4]" style={{ color: "rgba(245,245,244,0.75)" }}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] mb-4" style={{ color: "#a8a29e" }}>
                {t.footer.columns.resources}
              </p>
              <ul className="space-y-2.5">
                {t.footer.links.resources.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[14px] leading-[1.43] transition-colors hover:text-[#f5f5f4]" style={{ color: "rgba(245,245,244,0.75)" }}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] mb-4" style={{ color: "#a8a29e" }}>
                {t.footer.columns.company}
              </p>
              <ul className="space-y-2.5">
                {t.footer.links.company.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[14px] leading-[1.43] transition-colors hover:text-[#f5f5f4]" style={{ color: "rgba(245,245,244,0.75)" }}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(205,194,177,0.08)" }}>
            <p className="text-[13px]" style={{ color: "rgba(245,245,244,0.6)" }}>
              &copy; {new Date().getFullYear()} Juspilot. {t.footer.copyright}
            </p>
            <div className="flex items-center gap-5 text-[13px]">
              {t.footer.legal.map((l) => (
                <a key={l.href} href={l.href} className="transition-colors hover:text-[#f5f5f4]" style={{ color: "rgba(245,245,244,0.6)" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
