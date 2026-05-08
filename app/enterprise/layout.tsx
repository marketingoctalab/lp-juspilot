import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Juspilot Enterprise — Infraestrutura jurídica para grandes operações",
  description:
    "Agentes de IA para contencioso, contratos e inteligência jurídica. Dados em soberania nacional e segurança de nível institucional.",
  robots: { index: false, follow: false },
}

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
