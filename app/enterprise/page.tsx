"use client"

import { EnterpriseNavbar } from "@/components/enterprise/navbar"
import { EnterpriseForm } from "@/components/enterprise/form"

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
    quote: "A segurança e a conformidade com LGPD foram determinantes na nossa decisão. Não abrimos mão de soberania de dados — e o Juspilot entende isso.",
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
    desc: "Gestão de portfólio jurídico com centenas de casos simultâneos. Kanban por fases, SLA automático, risk assessment e alertas de prazo — visibilidade total para o GC.",
  },
  {
    title: "Contratos sem gargalo",
    desc: "Geração, revisão e versionamento de contratos com IA. Fluxo de aprovação configurável, biblioteca de templates corporativos e export para qualquer formato.",
  },
  {
    title: "Inteligência de jurisprudência",
    desc: "Monitoramento contínuo de STJ, STF e TST. Alertas automáticos quando precedentes relevantes mudam — para que sua estratégia nunca seja surpreendida.",
  },
  {
    title: "Automação de processos",
    desc: "Workflows configuráveis para os processos mais críticos. Aprovações, notificações, escalações e integrações — sem depender de TI para cada mudança.",
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
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <EnterpriseNavbar />

      {/* HERO */}
      <section className="flex flex-col items-center justify-center px-4 md:px-6 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="max-w-[900px] w-full mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 text-[10px] md:text-[11px] text-[#9ca3af] mb-8 md:mb-10 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] flex-shrink-0" />
            Juspilot Enterprise
          </div>

          <h1 className="font-serif font-bold text-[32px] leading-[1.1] sm:text-[48px] md:text-[64px] lg:text-[80px] text-white mb-6 md:mb-8 text-balance">
            Os departamentos jurídicos que operam em escala escolhem o Juspilot.
          </h1>

          <p className="text-[#9ca3af] text-sm md:text-lg max-w-[560px] mx-auto mb-10 md:mb-12 leading-relaxed">
            Agentes de IA para contencioso, contratos e inteligência jurídica —
            com dados em soberania nacional e segurança de nível institucional.
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-[#D97757] hover:bg-[#c66747] text-white font-semibold text-sm md:text-base px-6 py-3.5 md:px-8 md:py-4 rounded-xl transition-colors duration-200 mb-10 md:mb-12"
          >
            Solicitar apresentação →
          </button>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-[#6b7280]">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#9ca3af] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              LGPD nativa
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/10" />
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#9ca3af] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              AES-256
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/10" />
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#9ca3af] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Dados em soberania nacional
            </span>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="border-y border-white/5 py-12 md:py-14 px-4 md:px-6">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-center text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#9ca3af] mb-8 md:mb-10">
            Confiado por departamentos jurídicos de grandes empresas
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 border-l border-t border-white/5">
            {LOGOS.map((name, i) => (
              <div key={i} className="border-r border-b border-white/5 flex items-center justify-center px-4 py-8 md:px-6 md:py-10">
                <span className="text-xs md:text-sm font-medium text-[#4b5563] tracking-wide">[ {name} ]</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-20 px-4 md:px-6 border-b border-white/5">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-center text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#9ca3af] mb-3 md:mb-4">
            Quem já opera no próximo nível
          </p>
          <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[44px] font-medium text-white text-center mb-10 md:mb-14 text-balance">
            Líderes jurídicos que pararam de improvisar.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="border border-white/10 rounded-2xl p-6 md:p-7 flex flex-col gap-4 md:gap-5 hover:border-white/20 transition-colors duration-200">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#D97757]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#9ca3af] text-sm leading-relaxed flex-1">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-[#6b7280]">{t.role} · {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-20 px-4 md:px-6 border-b border-white/5">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-center text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#9ca3af] mb-3 md:mb-4">
            Capacidades
          </p>
          <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[44px] font-medium text-white text-center mb-10 md:mb-14 text-balance">
            Construída para operações que não aceitam meio-termo.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="border border-white/10 rounded-2xl p-6 md:p-7 hover:border-white/20 transition-colors duration-200">
                <h3 className="font-serif text-base md:text-lg text-white mb-2 md:mb-3">{f.title}</h3>
                <p className="text-xs md:text-sm text-[#9ca3af] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="formulario" className="py-16 md:py-20 px-4 md:px-6 border-b border-white/5">
        <div className="max-w-[600px] w-full mx-auto">
          <p className="text-center text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#9ca3af] mb-3 md:mb-4">
            Contato enterprise
          </p>
          <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[44px] font-medium text-white text-center mb-3 md:mb-4 text-balance">
            Solicitar apresentação.
          </h2>
          <p className="text-center text-[#9ca3af] text-sm mb-10 md:mb-12 leading-relaxed">
            Nossa equipe entra em contato em até 1 dia útil para agendar uma apresentação personalizada para a sua operação.
          </p>
          <EnterpriseForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="relative bg-[#1c1917]"
        style={{ borderTop: '1px solid rgba(205,194,177,0.08)' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 pt-14 md:pt-20 pb-8 md:pb-10">
          <div className="mb-10 md:mb-20 overflow-hidden">
            <p
              className="select-none font-semibold"
              style={{ fontSize: 'clamp(56px, 14vw, 220px)', lineHeight: 0.9, color: 'rgba(205,194,177,0.12)' }}
              aria-hidden
            >
              Juspilot
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 pb-10 md:pb-14">
            <div className="col-span-2 md:col-span-4">
              <div className="flex items-center gap-1 mb-4">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px]" aria-hidden>
                  <rect x="4.5" y="3.5" width="23" height="25" rx="3.5" stroke="#D97757" strokeWidth="2.8" fill="none" />
                  <path d="M11 10.5H21" stroke="#D97757" strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M16 10.5V19C16 20.933 14.433 22.5 12.5 22.5" stroke="#D97757" strokeWidth="2.8" strokeLinecap="round" />
                </svg>
                <span className="tracking-[-0.028em] font-semibold leading-none text-[20px] text-white">Juspilot</span>
              </div>
              <p className="text-[14px] md:text-[15px] leading-[1.55] max-w-[280px] mb-5" style={{ color: 'rgba(245,245,244,0.8)' }}>
                O cockpit jurídico com IA. Casos, contratos, minutas e jurisprudência em uma única plataforma.
              </p>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em]"
                style={{ background: 'rgba(168,162,158,0.15)', color: '#a8a29e' }}
              >
                Disponível no Brasil
              </span>
            </div>

            <div className="col-span-1 md:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] mb-4" style={{ color: '#a8a29e' }}>Produto</p>
              <ul className="space-y-2.5">
                {[
                  { name: 'Plataforma', href: 'https://juspilot.ai/plataforma' },
                  { name: 'Gestão de Casos', href: 'https://juspilot.ai/produtos/board' },
                  { name: 'Contratos', href: 'https://juspilot.ai/produtos/signature' },
                  { name: 'Minutas com IA', href: 'https://juspilot.ai/produtos/drafts' },
                  { name: 'Jurisprudência', href: 'https://juspilot.ai/produtos/analyze' },
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[13px] md:text-[14px] leading-[1.43] transition-colors hover:text-[#f5f5f4]" style={{ color: 'rgba(245,245,244,0.75)' }}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] mb-4" style={{ color: '#a8a29e' }}>Recursos</p>
              <ul className="space-y-2.5">
                {[
                  { name: 'Documentação', href: 'https://juspilot.ai/docs/introducao' },
                  { name: 'Blog', href: 'https://juspilot.ai/blog' },
                  { name: 'Comparar', href: 'https://juspilot.ai/comparar' },
                  { name: 'Planos', href: 'https://juspilot.ai/pricing' },
                  { name: 'FAQ', href: 'https://juspilot.ai/faq' },
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[13px] md:text-[14px] leading-[1.43] transition-colors hover:text-[#f5f5f4]" style={{ color: 'rgba(245,245,244,0.75)' }}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] mb-4" style={{ color: '#a8a29e' }}>Empresa</p>
              <ul className="space-y-2.5">
                {[
                  { name: 'Sobre', href: 'https://juspilot.ai/sobre' },
                  { name: 'Contato', href: 'https://juspilot.ai/contato' },
                  { name: 'Termos de Uso', href: 'https://juspilot.ai/termos-de-uso' },
                  { name: 'Privacidade', href: 'https://juspilot.ai/politica-de-privacidade' },
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[13px] md:text-[14px] leading-[1.43] transition-colors hover:text-[#f5f5f4]" style={{ color: 'rgba(245,245,244,0.75)' }}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(205,194,177,0.08)' }}
          >
            <p className="text-[12px] md:text-[13px]" style={{ color: 'rgba(245,245,244,0.6)' }}>
              &copy; {new Date().getFullYear()} Juspilot. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 md:gap-5 text-[12px] md:text-[13px]">
              {[
                { href: 'https://juspilot.ai/termos-de-uso', label: 'Termos' },
                { href: 'https://juspilot.ai/politica-de-privacidade', label: 'Privacidade' },
                { href: 'https://juspilot.ai/contato', label: 'Contato' },
              ].map((l) => (
                <a key={l.href} href={l.href} className="transition-colors hover:text-[#f5f5f4]" style={{ color: 'rgba(245,245,244,0.6)' }}>
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
