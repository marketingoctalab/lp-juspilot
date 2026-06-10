import { z } from "zod"

export const leadFormNames = ["contact_modal", "enterprise_lead"] as const

export const submitLeadSchema = z.object({
  nome: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  telefone: z.string().trim().min(8).max(30),
  cargo: z.string().trim().min(1).max(120),
  empresa: z.string().trim().min(1).max(200),
  uf: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/),
  locale: z.enum(["pt", "en"]).optional(),
  form_name: z.enum(leadFormNames),
  lead_source: z.string().trim().max(80).optional(),
  page_path: z.string().trim().max(500).optional(),
})

export type SubmitLeadInput = z.infer<typeof submitLeadSchema>

export async function submitLead(payload: SubmitLeadInput): Promise<{ id: string }> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      page_path:
        payload.page_path ??
        (typeof window !== "undefined" ? window.location.pathname : undefined),
    }),
  })

  const data = (await response.json().catch(() => null)) as
    | { id?: string; error?: string }
    | null

  if (!response.ok) {
    throw new Error(data?.error ?? "Não foi possível enviar o formulário.")
  }

  if (!data?.id) {
    throw new Error("Resposta inválida do servidor.")
  }

  return { id: data.id }
}
