import type { Translations } from "./pt"

export const en: Translations = {
  meta: {
    title: "Juspilot — AI Agents for Your Legal Team",
    description:
      "Juspilot is Brazil's legal AI platform. Case management, AI-drafted documents, STJ, STF and TST case law, contracts and workflows in one place. Native LGPD compliance.",
  },
  nav: {
    platform: "Platform",
    products: "Products",
    pricing: "Pricing",
    blog: "Blog",
    cta: "Schedule a call",
  },
  hero: {
    badge: "Legal intelligence for high-volume operations",
    h1: "The legal infrastructure that Brazil's largest operations choose.",
    sub: "Legal departments at Fortune 500 companies and elite law firms use AI to operate with precision, speed, and full control — without compromising security.",
    cta: "Schedule a call with a specialist",
  },
  logos: {
    label: "Connected to the courts and agencies you use",
  },
  metrics: {
    headline1: "Legal operations that",
    headline2: "never stop",
    sub: "Results from legal departments that chose to operate without compromise.",
    items: [
      { label: "REDUCTION IN OPERATIONAL TIME", value: "60%", desc: "in contracts and due diligence" },
      { label: "DOCUMENTS PROCESSED", value: "1M+", desc: "by active departments" },
      { label: "LGPD COMPLIANCE", value: "100%", desc: "audit trail and traceability" },
      { label: "GUARANTEED UPTIME", value: "99.9%", desc: "enterprise SLA with dedicated support" },
    ],
  },
  differential: {
    tag: "WHY JUSPILOT",
    headline: "Built for those who won't settle\nfor generic solutions.",
    sub: "Large legal operations demand infrastructure that matches their scale. Juspilot was designed for departments that operate under pressure, volume, and constant scrutiny.",
    items: [
      {
        title: "Full governance and traceability",
        desc: "Complete audit logs, granular access control, and native LGPD compliance. Every action recorded, every decision traceable. Ready for internal and external audits.",
      },
      {
        title: "AI that responds with evidence",
        desc: "RAG over your document base. Hybrid semantic search across STJ, STF, and TST. No answer without a verifiable source. Zero tolerance for hallucination in a corporate environment.",
      },
      {
        title: "Integration with your stack",
        desc: "Enterprise API, SSO, and integration with ERPs and management systems. Juspilot fits into your operation without requiring you to abandon what already works.",
      },
    ],
  },
  platform: {
    tag: "THE PLATFORM",
    headline1: "One platform.",
    headline2: "The entire operation.",
    sub: "High-volume legal departments cannot rely on fragmented tools. Juspilot unifies contracts, litigation, compliance, and legal intelligence into a single infrastructure.",
    features: [
      {
        title: "Litigation and Case Management",
        desc: "Full visibility into your legal portfolio. Phase-based Kanban, automatic SLA, risk assessment, and deadline alerts for teams managing hundreds of cases simultaneously.",
      },
      {
        title: "Legal AI with document context",
        desc: "Not a generic chatbot. Intelligence trained on your document base, with RAG over contracts, legal opinions, and internal precedents. Auditable, source-backed answers.",
      },
      {
        title: "Contracts and Documents at scale",
        desc: "AI-powered contract generation, review, and versioning. Corporate template library, approval workflows, and export in any format. No bottlenecks in legal.",
      },
      {
        title: "Case Law Intelligence",
        desc: "Continuous monitoring of STJ, STF, and TST. Automatic alerts when relevant precedents change, so your legal strategy is never caught off guard.",
      },
      {
        title: "Legal Process Automation",
        desc: "Configurable workflows for your department's most critical processes. Approvals, notifications, escalations, and integrations without depending on IT for every change.",
      },
    ],
  },
  faq: {
    tag: "FREQUENTLY ASKED QUESTIONS",
    headline1: "What large operations",
    headline2: "need to know",
    sub: "Direct answers to the questions General Counsels and CIOs ask before deciding.",
    items: [
      {
        question: "How is implementation handled for a large-scale operation?",
        answer: "Each enterprise client receives a dedicated implementation manager. The process includes mapping your current operation, configuring workflows, migrating data, and training the legal team — with a defined timeline and go-live SLA.",
      },
      {
        question: "What is the security and LGPD compliance model?",
        answer: "Multi-tenant architecture with native Row Level Security, encryption at rest and in transit, complete audit logs, and granular role-based access control. Your documents do not feed any external model. Compliance reports available for audits.",
      },
      {
        question: "Does Juspilot integrate with the systems we already use?",
        answer: "Yes. Documented REST API, SSO support (SAML/OIDC), integration with ERPs, document management systems, and corporate communication tools. Our integration team works directly with your IT team.",
      },
      {
        question: "How does enterprise support work?",
        answer: "Dedicated SLA with guaranteed response times, exclusive account manager, and priority support channel. Enterprise clients have access to the product roadmap and participate in the early access program for new modules.",
      },
      {
        question: "Can the platform be customized for our operation?",
        answer: "Yes. Document templates, workflows, custom fields, and integrations are all configurable. For larger-scale operations, we offer development of specific modules under contract.",
      },
    ],
  },
  cta: {
    badge: "For operations that accept no half-measures",
    headline: "Your legal operation deserves infrastructure that matches its scale.",
    sub: "Schedule a call with our team. We'll understand your operation and show you how Juspilot fits in. No generic pitch, no canned demo.",
    primary: "Schedule a call with a specialist",
    secondary: "See use cases from large departments",
  },
  footer: {
    tagline: "The AI-powered legal cockpit. Cases, contracts, documents, and case law in one platform.",
    available: "Available in Brazil",
    columns: {
      product: "Product",
      resources: "Resources",
      company: "Company",
    },
    links: {
      product: [
        { name: "Platform", href: "https://juspilot.ai/plataforma" },
        { name: "Case Management", href: "https://juspilot.ai/produtos/board" },
        { name: "Contracts", href: "https://juspilot.ai/produtos/signature" },
        { name: "AI Drafting", href: "https://juspilot.ai/produtos/drafts" },
        { name: "Case Law", href: "https://juspilot.ai/produtos/analyze" },
      ],
      resources: [
        { name: "Documentation", href: "https://juspilot.ai/docs/introducao" },
        { name: "Blog", href: "https://juspilot.ai/blog" },
        { name: "Compare", href: "https://juspilot.ai/comparar" },
        { name: "Pricing", href: "https://juspilot.ai/pricing" },
        { name: "FAQ", href: "https://juspilot.ai/faq" },
      ],
      company: [
        { name: "About", href: "https://juspilot.ai/sobre" },
        { name: "Contact", href: "https://juspilot.ai/contato" },
        { name: "Terms of Use", href: "https://juspilot.ai/termos-de-uso" },
        { name: "Privacy Policy", href: "https://juspilot.ai/politica-de-privacidade" },
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
    title: "Schedule a call with a specialist",
    subtitle: "Our team will reach out within 1 business day.",
    close: "Close",
    success: {
      title: "We received your request.",
      body: "A Juspilot specialist will contact you within 1 business day to schedule the call.",
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
    submit: "Request a call with a specialist",
    submitting: "Sending...",
    lgpd: "Your data is handled with confidentiality, in compliance with LGPD.",
  },
}
