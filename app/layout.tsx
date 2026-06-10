import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
  ConsentModeDefaults,
  ConsentBanner,
} from "@/components/analytics"
import { sans, display, mono } from "@/lib/fonts"
import "./globals.css"

const BASE_URL = "https://lp.juspilot.ai"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Juspilot: infraestrutura de produção jurídica com IA",
    template: "%s | Juspilot",
  },
  description:
    "Análise de processos com milhares de páginas em segundos. Resumo Analítico, Linha do Tempo, Riscos, Jurisprudência Correlata, peças e jurimetria. Teste 7 dias grátis.",
  keywords: [
    "análise de processos com IA",
    "resumo analítico processo",
    "jurisprudência correlata",
    "jurimetria jurídica",
    "elaboração de peças jurídicas",
    "inteligência artificial jurídica",
    "software jurídico Brasil",
    "gestão de casos jurídicos",
    "IA para advogados",
    "automação jurídica",
    "jurisprudência STJ STF",
    "minutas com IA",
    "departamento jurídico",
    "LegalTech Brasil",
    "LGPD jurídico",
    "Juspilot",
  ],
  authors: [{ name: "Juspilot", url: BASE_URL }],
  creator: "Juspilot",
  publisher: "Juspilot",
  alternates: {
    canonical: BASE_URL,
    languages: {
      "pt-BR": BASE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "Juspilot",
    title: "Juspilot: infraestrutura de produção jurídica com IA",
    description:
      "Resumo Analítico, Linha do Tempo, Riscos da Demanda, Jurisprudência Correlata, peças e jurimetria. Milhares de páginas em segundos.",
    images: [
      {
        url: "/screenshots/hero.png",
        width: 1200,
        height: 630,
        alt: "Juspilot: elaboração de peças e análise de processos com IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Juspilot: infraestrutura de produção jurídica",
    description:
      "Análise de processos, elaboração de peças e jurimetria. De 2–3 horas para minutos. Complementa seu ERP.",
    images: ["/screenshots/hero.png"],
    creator: "@juspilot",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
  other: {
    "facebook-domain-verification": "0Oo169782sb7eb0ijlpc8mnwoixari",
  },
  verification: {
    // google: "SEU_CÓDIGO_GOOGLE_SEARCH_CONSOLE", // TODO: adicionar após verificar no GSC
  },
  category: "technology",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f7f4",
}

// Schema.org JSON-LD — SoftwareApplication + Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#software`,
      name: "Juspilot",
      url: BASE_URL,
      description:
        "Plataforma de inteligência artificial jurídica brasileira para gestão de casos, minutas, contratos, jurisprudência e automação de workflows.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
        description: "Teste grátis de 7 dias",
      },
      featureList: [
        "Gestão de casos jurídicos com Kanban",
        "Chat com IA contextualizado por caso",
        "Geração de minutas e contratos com IA",
        "Pesquisa de jurisprudência STJ, STF e TST",
        "Automação de workflows jurídicos",
        "Conformidade LGPD nativa",
      ],
      inLanguage: "pt-BR",
      availableLanguage: "Portuguese",
      creator: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Juspilot",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon.svg`,
      },
      description:
        "Empresa brasileira de LegalTech especializada em inteligência artificial para o mercado jurídico.",
      foundingLocation: {
        "@type": "Place",
        addressCountry: "BR",
      },
      sameAs: [
        "https://juspilot.ai",
        "https://app.juspilot.com.br",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Juspilot: agentes de IA para seu jurídico",
      description:
        "Plataforma jurídica com IA para gestão de casos, minutas, contratos, jurisprudência e automação. Conformidade LGPD. Para escritórios e departamentos jurídicos.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      inLanguage: "pt-BR",
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Juspilot",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "pt-BR",
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Como é feita a implementação em uma operação de grande porte?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cada cliente enterprise recebe um gerente de implementação dedicado. O processo inclui mapeamento da operação atual, configuração de workflows, migração de dados e treinamento do time jurídico, com cronograma definido e SLA de go-live.",
          },
        },
        {
          "@type": "Question",
          name: "Qual é o modelo de segurança e conformidade com LGPD?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Arquitetura multi-tenant com Row Level Security nativo, criptografia em repouso e em trânsito, audit logs completos e controle de acesso granular por perfil. Seus documentos não alimentam nenhum modelo externo.",
          },
        },
        {
          "@type": "Question",
          name: "Juspilot se integra com os sistemas que já usamos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. API REST documentada, suporte a SSO (SAML/OIDC), integração com ERPs e sistemas de gestão documental. Nossa equipe de integração trabalha junto com seu time de TI.",
          },
        },
        {
          "@type": "Question",
          name: "Como funciona o suporte para clientes enterprise?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SLA dedicado com tempo de resposta garantido, gerente de conta exclusivo e canal de suporte prioritário. Clientes enterprise têm acesso ao roadmap de produto e participam do programa de early access para novos módulos.",
          },
        },
        {
          "@type": "Question",
          name: "É possível customizar a plataforma para a nossa operação?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. Templates de documentos, workflows, campos customizados e integrações são configuráveis. Para operações de maior escala, oferecemos desenvolvimento de módulos específicos sob contrato.",
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://app.juspilot.ai" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConsentModeDefaults />
      </head>
      <body className="font-sans antialiased bg-page text-ink">
        <GoogleTagManager />
        <GoogleTagManagerNoScript />
        <ConsentBanner />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
