import type { Translations } from "./pt"

export const en: Translations = {
  meta: {
    title: "Juspilot: legal production infrastructure with AI",
    description:
      "Case analysis with thousands of pages in seconds. Analytical Summary, Timeline, Case Risks, Correlated Case Law, drafting and jurimetrics. Try free for 7 days.",
  },
  nav: {
    platform: "Platform",
    products: "Products",
    pricing: "Pricing",
    blog: "Blog",
    cta: "Try free",
    switchLang: "Português",
  },
  hero: {
    badge: "Legal production infrastructure",
    h1: "Legal drafting and case analysis",
    animatedTexts: [
      "with thousands of pages in seconds.",
      "from 2–3 hours to minutes.",
      "with jurimetrics to decide with data.",
      "in your firm's voice.",
    ],
    sub: "AI that produces legal work: analyzes voluminous cases, delivers Analytical Summary, Timeline, Case Risks and Correlated Case Law, and speeds up drafting. Complements your ERP, doesn't replace it.",
    cta: "Try 7 days free",
    socialProof: "Brazilian firms already produce more in less time",
  },
  valueHighlight: {
    text: "Legal drafting and case analysis, surfacing critical points from cases with thousands of pages in seconds.",
  },
  processAnalysis: {
    eyebrow: "Case analysis",
    headline: "Ready deliverables, not just search",
    sub: "AI reads the case file and returns tangible outputs you use in strategy and drafting.",
    speed: {
      before: "2–3 hours of manual reading",
      after: "Minutes with AI",
      label: "Thousands of pages with critical points in seconds",
    },
    outputs: [
      {
        title: "Analytical Summary",
        desc: "Structured synthesis of facts, claims, evidence and decision points. The essence of the case without reading page by page.",
      },
      {
        title: "Timeline",
        desc: "Automatic procedural chronology with milestones, deadlines and relevant filings in clear order.",
      },
      {
        title: "Case Risks",
        desc: "Mapping of procedural risks, argumentative vulnerabilities and attention points for strategy.",
      },
      {
        title: "Correlated Case Law",
        desc: "AI brings precedents for your case automatically. You don't search: it correlates relevant rulings with clickable sources.",
      },
    ],
  },
  logos: {
    label: "Research connected to the courts and agencies you use",
  },
  painPoints: {
    eyebrow: "Legal production",
    headline: "AI that produces legal work",
    sub: "Analysis, drafting and strategy at the center. Management and ERP stay in the background.",
    items: [
      {
        title: "Voluminous case analysis",
        desc: "Analytical Summary, Timeline, Case Risks and Correlated Case Law. Thousands of pages in seconds, not hours.",
        highlight: true,
      },
      {
        title: "Legal drafting",
        desc: "Petitions, answers and appeals in your firm's voice. From draft to reviewable brief in minutes, not hours.",
        highlight: true,
      },
      {
        title: "Jurimetrics",
        desc: "Success probability by thesis, judge profiles and court trends. Strategy backed by real data.",
        highlight: true,
      },
      {
        title: "Correlated case law",
        desc: "Precedents brought automatically for your case. No invented sources, no scattered manual search.",
        highlight: false,
      },
      {
        title: "Your own knowledge base",
        desc: "AI trained on your firm's documents and patterns. Your briefs become the team's reference.",
        highlight: false,
      },
    ],
  },
  jurisprudence: {
    eyebrow: "Correlated case law",
    headline: "AI brings the precedents for your case.",
    sub: "Unlike generic search: Juspilot automatically correlates rulings relevant to the analyzed case. Clickable sources, precedent status and no hallucination. No source, no citation.",
    chips: ["Case-correlated", "STJ", "STF", "State courts", "Clickable source", "No hallucination"],
  },
  jurimetria: {
    eyebrow: "New in Juspilot",
    headline: "Jurimetrics: decide with data, not intuition.",
    sub: "New feature and one of Juspilot's biggest differentiators. Crosses thousands of rulings to show success rates, judge patterns and court trends before you invest hours in the case.",
    pillars: [
      {
        title: "Success probability",
        desc: "Historical rates by thesis, chamber and court to ground your strategy.",
      },
      {
        title: "Judge profiles",
        desc: "Decision patterns and trends from the judge or rapporteur on your case.",
      },
      {
        title: "Court intelligence",
        desc: "Average timelines, outcomes by practice area and comparable scenarios.",
      },
    ],
  },
  impact: {
    eyebrow: "Results",
    headline: "The impact on your firm",
    metrics: [
      {
        value: "492.8h",
        label: "Hours saved/month",
        detail: "35.2h per lawyer",
      },
      {
        value: "R$ 98,560",
        label: "Value generated/month",
        detail: "Based on R$ 200/hour",
      },
      {
        value: "19.7x",
        label: "Return on investment",
        detail: "1,871% ROI",
      },
    ],
    premises:
      "Assumptions: 14 lawyers · 176h/month each · 40% of time on drafting and research · Conservative 50% reduction · R$ 200/hour average",
    disclaimer:
      "Conservative estimate. Firms that intensively use their own knowledge base report even higher gains.",
  },
  platform: {
    eyebrow: "Legal production",
    headline: "What Juspilot does differently",
    sub: "Case analysis, drafting and jurimetrics at the center. Management and integrations complement your ERP.",
    supportHeadline: "Operational support",
    supportSub: "Complements Astrea, Projuris and other ERPs. Juspilot is the intelligence layer, not another management system.",
    featured: [
      {
        title: "Case Analysis",
        desc: "Thousands of pages in seconds. AI delivers the outputs you use in strategy and drafting.",
        bullets: [
          "Analytical Summary",
          "Timeline",
          "Case Risks",
          "Correlated Case Law",
        ],
        badge: "",
        featured: true,
      },
      {
        title: "Legal Drafting",
        desc: "Petitions, answers and appeals in your firm's voice. Accelerated production with mandatory human review.",
        bullets: [
          "Your firm's tone and standards",
          "Templates and versioning",
          "PDF and DOCX export",
          "Integrated with case analysis",
        ],
        badge: "",
        featured: true,
      },
      {
        title: "Jurimetrics",
        desc: "Case strategy with real data. Know your success probability before investing time in the case.",
        bullets: [
          "Success rate by thesis and chamber",
          "Judge decision profiles",
          "Trends by court and practice area",
        ],
        badge: "NEW",
        featured: true,
      },
      {
        title: "Personalized Knowledge Base",
        desc: "AI learns your firm's style, argumentation and formatting.",
        bullets: [
          "Firm briefs as reference",
          "Consistent tone across the team",
        ],
        badge: "EXCLUSIVE",
        featured: true,
      },
    ],
    modules: [
      { title: "Case Management", desc: "Kanban and deadlines. Complements your ERP" },
      { title: "REST API", desc: "Integration with Astrea, Projuris and others" },
      { title: "Workflows", desc: "No-code automations" },
      { title: "Contracts", desc: "Generation and e-signature" },
      { title: "Data Room", desc: "Secure repository" },
      { title: "Legal Portal", desc: "Client acquisition" },
    ],
  },
  compliance: {
    eyebrow: "Trust",
    headline: "Compliance and security your firm requires",
    sub: "AI as a lawyer's tool, with data protection and professional secrecy.",
    columns: [
      {
        title: "Bar compliance",
        items: [
          "AI as assistant, not a replacement for the lawyer",
          "Transparency about use of artificial intelligence",
          "Mandatory human review on all briefs",
          "Professional secrecy preserved in every interaction",
        ],
      },
      {
        title: "Data security",
        items: [
          "AWS with encryption in transit and at rest",
          "Data isolated per firm (secure multi-tenant)",
          "Daily backup with 30-day retention",
          "3-level permission control",
          "LGPD compliance",
        ],
      },
    ],
  },
  faq: {
    tag: "FAQ",
    headline1: "Before you",
    headline2: "start",
    sub: "Straight answers about case analysis, drafting and data security.",
    items: [
      {
        question: "What is Juspilot's Jurimetrics?",
        answer: "Statistical analysis of court decisions to estimate success probability, identify judge patterns and trends by court. You ground case strategy in real data, integrated with research and drafting.",
      },
      {
        question: "What deliverables does case analysis produce?",
        answer: "Analytical Summary, Timeline, Case Risks and Correlated Case Law. AI reads thousands of pages in seconds and returns outputs ready for strategy and drafting. What took 2–3 hours of manual reading becomes minutes.",
      },
      {
        question: "Does Juspilot replace my ERP (Astrea, Projuris)?",
        answer: "No. Juspilot is the intelligence layer for legal production: analysis, drafting and jurimetrics. Case management and integrations complement your existing ERP via API.",
      },
      {
        question: "Does Juspilot replace the lawyer's work?",
        answer: "No. The platform speeds up analysis, research and drafting, but legal judgment and final review are always human, in line with bar requirements.",
      },
      {
        question: "Can the AI invent case law?",
        answer: "No. The agent only cites what was retrieved from STJ, STF, TCU, CARF and state courts, with clickable sources and precedent status. No source, no citation.",
      },
      {
        question: "Are my data used to train public AI?",
        answer: "No. Your documents stay segregated per firm, with encryption at rest and in transit. AI providers operate with zero retention for training.",
      },
      {
        question: "How does the 7-day trial work?",
        answer: "You get the full plan for 7 days. Sign up in about 1 minute. Cancel anytime, with no penalty and no hassle.",
      },
    ],
  },
  cta: {
    badge: "Next steps",
    headline: "Stop losing hours on voluminous cases.",
    sub: "Try 7 days free. Case analysis, legal drafting and jurimetrics. Complements the ERP you already use.",
    primary: "Try 7 days free",
    secondary: "See pricing",
    secondaryHref: "https://juspilot.ai/pricing",
  },
  footer: {
    tagline: "Legal production infrastructure: case analysis, drafting and jurimetrics with AI.",
    columns: {
      product: "Product",
      resources: "Resources",
      company: "Company",
    },
    links: {
      product: [
        { name: "Platform", href: "https://juspilot.ai/plataforma" },
        { name: "Case Management", href: "https://juspilot.ai/produtos/board" },
        { name: "AI Drafting", href: "https://juspilot.ai/produtos/drafts" },
        { name: "Case Law", href: "https://juspilot.ai/produtos/analyze" },
        { name: "Contracts", href: "https://juspilot.ai/produtos/signature" },
      ],
      resources: [
        { name: "Documentation", href: "https://juspilot.ai/docs/introducao" },
        { name: "Data Coverage", href: "https://juspilot.ai/cobertura" },
        { name: "Blog", href: "https://juspilot.ai/blog" },
        { name: "Compare", href: "https://juspilot.ai/comparar" },
        { name: "Pricing", href: "https://juspilot.ai/pricing" },
      ],
      company: [
        { name: "About", href: "https://juspilot.ai/sobre" },
        { name: "Contact", href: "https://juspilot.ai/contato" },
        { name: "Security", href: "https://juspilot.ai/security" },
        { name: "Privacy", href: "https://juspilot.ai/politica-de-privacidade" },
      ],
    },
    legal: [
      { label: "Terms", href: "https://juspilot.ai/termos-de-uso" },
      { label: "Privacy", href: "https://juspilot.ai/politica-de-privacidade" },
      { label: "Contact", href: "https://juspilot.ai/contato" },
    ],
    copyright: "All rights reserved.",
    switchLang: "Português",
  },
  modal: {
    title: "Try 7 days free",
    subtitle: "Fill out the form and our team will enable your access within 1 business day.",
    close: "Close",
    success: {
      title: "We received your request.",
      body: "Choose how you'd like to continue: book a full demo with our team or access the platform now.",
      demoCta: "Book a demo on WhatsApp",
      loginCta: "Log in and start your trial",
      close: "Close",
    },
    fields: {
      name: "Full name",
      email: "Corporate email",
      phone: "Phone",
      role: "Role",
      company: "Company",
      state: "State (UF)",
      rolePlaceholder: "Select your role",
      statePlaceholder: "Select",
      namePlaceholder: "Ana Souza",
      emailPlaceholder: "ana@company.com",
      phonePlaceholder: "(11) 99999-9999",
      companyPlaceholder: "Company name",
    },
    submit: "Start free trial",
    submitting: "Sending...",
    lgpd: "Your data is handled with confidentiality, in compliance with LGPD.",
  },
}
