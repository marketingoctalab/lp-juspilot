import type { AttributionTouch } from "@/lib/attribution"

/**
 * Colmeia — webhook de entrada com ação "Criar negócio".
 * Cada lead da LP vira um cliente + oportunidade no pipeline.
 *
 * Disparo em fire-and-forget: falha aqui nunca deve quebrar o fluxo de
 * captura de lead (Supabase é a fonte da verdade).
 */

export type ColmeiaLead = {
  nome: string
  email: string
  telefone: string
  cargo: string
  empresa: string
  uf: string
  lead_source?: string
  form_name: string
  utm?: AttributionTouch | null
}

export async function sendLeadToColmeia(lead: ColmeiaLead): Promise<void> {
  const url = process.env.COLMEIA_WEBHOOK_URL
  const secret = process.env.COLMEIA_WEBHOOK_SECRET

  if (!url) {
    console.warn("[colmeia] COLMEIA_WEBHOOK_URL não configurada, pulando")
    return
  }

  if (!secret) {
    console.warn("[colmeia] COLMEIA_WEBHOOK_SECRET não configurado, pulando")
    return
  }

  const payload = {
    client: {
      full_name: lead.nome,
      email: lead.email,
      mobile_phone: lead.telefone,
    },
    title: `${lead.nome} — ${lead.empresa}`,
    source: lead.lead_source ?? lead.form_name,
    cargo: lead.cargo,
    empresa: lead.empresa,
    uf: lead.uf,
    utm: {
      source: lead.utm?.utm_source ?? null,
      medium: lead.utm?.utm_medium ?? null,
      campaign: lead.utm?.utm_campaign ?? null,
      term: lead.utm?.utm_term ?? null,
      content: lead.utm?.utm_content ?? null,
    },
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Webhook-Secret": secret,
    },
    body: JSON.stringify(payload),
  })

  const detail = await response.text().catch(() => "")

  if (!response.ok) {
    throw new Error(
      `[colmeia] webhook respondeu ${response.status}: ${detail.slice(0, 300)}`,
    )
  }

  // O webhook retorna HTTP 200 mesmo quando a ação falha (ex: pipeline ausente),
  // sinalizando via { success: false, error }. Tratamos isso como falha.
  try {
    const result = JSON.parse(detail) as { success?: boolean; error?: string }
    if (result.success === false) {
      throw new Error(`[colmeia] ação falhou: ${result.error ?? "desconhecido"}`)
    }
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("[colmeia]")) throw e
    // resposta não-JSON com 200: trata como sucesso silencioso
  }
}
