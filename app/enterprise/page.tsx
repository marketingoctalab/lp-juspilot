"use client"

import { EnterpriseNavbar } from "@/components/enterprise/navbar"
import { EnterpriseForm } from "@/components/enterprise/form"
import { SectionHeading } from "@/components/marketing/section-heading"
import { FeatureCard } from "@/components/marketing/feature-card"
import { MonoLabel } from "@/components/ui/mono-label"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { HeroBackground } from "@/components/marketing/hero-background"
import { LpPageTracker } from "@/components/analytics/lp-page-tracker"
import { trackCTAClick } from "@/lib/analytics"

const LOGOS = [
  "Empresa A", "Empresa B", "Empresa C",
  "Empresa D", "Empresa E", "Empresa F",
]

const TESTIMONIALS = [
  {
    quote: "O Juspilot transformou a forma como nosso departamento jurídico opera. Reduzimos o tempo de análise contratual em mais de 60% no primeiro trimestre.",
    name: "Carlos Mendes",
    role: "General Counsel",
    company: "Grupo Industrial Brasileiro",
  },
  {
    quote: "A segurança e a conformidade com LGPD foram determinantes na nossa decisão. Não abrimos mão de soberania de dados, e o Juspilot entende isso.",
    name: "Fernanda Lopes",
    role: "Diretora Jurídica",
    company: "Holding Financeira Nacional",
  },
  {
    quote: "Finalmente uma plataforma construída para o direito brasileiro de verdade. A inteligência de jurisprudência do STJ e STF é precisa e auditável.",
    name: "Ricardo Alves",
    role: "Chief Legal Officer",
    company: "Conglomerado de Energia",
  },
]

const FEATURES = [
  {
    title: "Contencioso em escala",
    desc: "Gestão de portfólio jurídico com centenas de casos simultâneos. Kanban por fases, SLA automático, risk assessment e alertas de prazo com visibilidade total para o GC.",
  },
  {
    title: "Contratos sem gargalo",
    desc: "Geração, revisão e versionamento de contratos com IA. Fluxo de aprovação configurável, biblioteca de templates corporativos e export para qualquer formato.",
  },
  {
    title: "Inteligência de jurisprudência",
    desc: "Monitoramento contínuo de STJ, STF e TST. Alertas automáticos quando precedentes relevantes mudam, para que sua estratégia nunca seja surpreendida.",
  },
  {
    title: "Automação de processos",
    desc: "Workflows configuráveis para os processos mais críticos. Aprovações, notificações, escalações e integrações, sem depender de TI para cada mudança.",
  },
  {
    title: "Segurança institucional",
    desc: "Multi-tenancy com Row Level Security, criptografia AES-256, audit logs completos e conformidade LGPD nativa. Dados em soberania nacional.",
  },
  {
    title: "Integração com sua stack",
    desc: "API REST documentada, SSO (SAML/OIDC), integração com ERPs e sistemas de gestão documental. Juspilot entra na sua operação sem ruptura.",
  },
]

export default function EnterprisePage() {
  function scrollToForm() {
    trackCTAClick({
      cta_name: "enterprise_hero_form",
      cta_location: "enterprise_hero",
    })
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="bg-page text-ink min-h-screen">
      <LpPageTracker contentName="lp_enterprise" />
      <EnterpriseNavbar />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <HeroBackground />
          <div className="container-page relative pt-20 pb-16 md:pt-28 md:pb-24 text-center">
            <MonoLabel tone="coral" className="mb-6 block">
              Juspilot Enterprise
            </MonoLabel>
            <h1 className="type-display-xl text-balance text-[clamp(32px,5vw,64px)] leading-[1.04] tracking-[-0.035em] max-w-[900px] mx-auto mb-6">
              Os departamentos jurídicos que operam em escala escolhem o Juspilot.
            </h1>
            <p className="type-body-md text-body-muted max-w-[560px] mx-auto mb-10">
              Agentes de IA para contencioso, contratos e inteligência jurídica,
              com dados em soberania nacional e segurança de nível institucional.
            </p>
            <Button size="lg" onClick={scrollToForm}>
              Solicitar apresentação →
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-10 type-caption text-slate">
              <span>LGPD nativa</span>
              <span className="hidden sm:block w-px h-4 bg-hairline" />
              <span>AES-256</span>
              <span className="hidden sm:block w-px h-4 bg-hairline" />
              <span>Dados em soberania nacional</span>
            </div>
          </div>
        </section>

        {/* Logos */}
        <section className="border-y border-hairline py-12">
          <div className="container-page">
            <MonoLabel tone="muted" className="block text-center mb-8">
              Confiado por departamentos jurídicos de grandes empresas
            </MonoLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 border border-hairline rounded-lg overflow-hidden">
              {LOGOS.map((name, i) => (
                <div
                  key={i}
                  className="border-r border-b border-hairline last:border-r-0 flex items-center justify-center px-4 py-8 md:py-10 bg-canvas"
                >
                  <span className="type-caption text-slate tracking-wide">[ {name} ]</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container-page section-y">
          <SectionHeading
            align="center"
            eyebrow="Quem já opera no próximo nível"
            heading="Líderes jurídicos que pararam de improvisar."
            className="mb-12 mx-auto"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-canvas border border-hairline rounded-lg p-6 md:p-7 flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-coral" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="type-body-sm text-body-muted flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="type-title-sm">{t.name}</p>
                  <p className="type-caption text-slate">{t.role} · {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-soft-stone">
          <div className="container-page section-y">
            <SectionHeading
              align="center"
              eyebrow="Capacidades"
              heading="Construída para operações que não aceitam meio-termo."
              className="mb-12 mx-auto"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <FeatureCard key={i} title={f.title} description={f.desc} surface="canvas" />
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="formulario" className="container-page section-y">
          <SectionHeading
            align="center"
            eyebrow="Contato enterprise"
            heading="Solicitar apresentação."
            description="Nossa equipe entra em contato em até 1 dia útil para agendar uma apresentação personalizada para a sua operação."
            className="mb-10 mx-auto"
          />
          <div className="max-w-[600px] mx-auto bg-canvas border border-hairline rounded-xl p-6 md:p-8">
            <EnterpriseForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-on-dark-soft">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-16 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-10 pb-12">
            <div className="col-span-2 md:col-span-4">
              <Logo size="md" variant="light" className="mb-5" />
              <p className="type-body-sm text-on-dark-soft max-w-[280px] mb-6">
                O cockpit jurídico com IA. Casos, contratos, minutas e jurisprudência em uma única plataforma.
              </p>
            </div>

            {[
              {
                title: "Produto",
                links: [
                  { name: "Plataforma", href: "https://juspilot.ai/plataforma" },
                  { name: "Gestão de Casos", href: "https://juspilot.ai/produtos/board" },
                  { name: "Contratos", href: "https://juspilot.ai/produtos/signature" },
                  { name: "Minutas com IA", href: "https://juspilot.ai/produtos/drafts" },
                  { name: "Jurisprudência", href: "https://juspilot.ai/produtos/analyze" },
                ],
              },
              {
                title: "Recursos",
                links: [
                  { name: "Documentação", href: "https://juspilot.ai/docs/introducao" },
                  { name: "Blog", href: "https://juspilot.ai/blog" },
                  { name: "Comparar", href: "https://juspilot.ai/comparar" },
                  { name: "Planos", href: "https://juspilot.ai/pricing" },
                  { name: "FAQ", href: "https://juspilot.ai/faq" },
                ],
              },
              {
                title: "Empresa",
                links: [
                  { name: "Sobre", href: "https://juspilot.ai/sobre" },
                  { name: "Contato", href: "https://juspilot.ai/contato" },
                  { name: "Termos de Uso", href: "https://juspilot.ai/termos-de-uso" },
                  { name: "Privacidade", href: "https://juspilot.ai/politica-de-privacidade" },
                ],
              },
            ].map((col) => (
              <div key={col.title} className="md:col-span-2">
                <MonoLabel tone="on-dark" className="mb-4 block">{col.title}</MonoLabel>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="type-body-sm text-on-dark-soft hover:text-on-dark transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/10">
            <p className="type-caption text-on-dark-soft/80">
              &copy; {new Date().getFullYear()} Juspilot. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 type-caption">
              {[
                { href: "https://juspilot.ai/termos-de-uso", label: "Termos" },
                { href: "https://juspilot.ai/politica-de-privacidade", label: "Privacidade" },
                { href: "https://juspilot.ai/contato", label: "Contato" },
              ].map((l) => (
                <a key={l.href} href={l.href} className="text-on-dark-soft/80 hover:text-on-dark transition-colors">
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
