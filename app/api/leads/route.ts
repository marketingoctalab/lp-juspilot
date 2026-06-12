import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { parseAttributionCookie } from "@/lib/attribution"
import { sendLeadToColmeia } from "@/lib/colmeia"
import { submitLeadSchema } from "@/lib/leads"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = submitLeadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados do formulário inválidos." },
        { status: 400 },
      )
    }

    const data = parsed.data
    const attrRaw = request.cookies.get("juspilot_attr")?.value
    const attribution = parseAttributionCookie(attrRaw)
    const touch = attribution?.last ?? attribution?.first

    const supabase = createAdminClient()
    const { data: inserted, error } = await supabase
      .from("lp_juspilot_leads")
      .insert({
        nome: data.nome,
        email: data.email.toLowerCase(),
        telefone: data.telefone,
        cargo: data.cargo,
        empresa: data.empresa,
        uf: data.uf,
        locale: data.locale ?? null,
        form_name: data.form_name,
        lead_source: data.lead_source ?? null,
        page_hostname: request.headers.get("host") ?? "lp.juspilot.ai",
        page_path: data.page_path ?? null,
        utm_source: touch?.utm_source ?? null,
        utm_medium: touch?.utm_medium ?? null,
        utm_campaign: touch?.utm_campaign ?? null,
        utm_term: touch?.utm_term ?? null,
        utm_content: touch?.utm_content ?? null,
        fbclid: touch?.fbclid ?? null,
        gclid: touch?.gclid ?? null,
        metadata: {
          user_agent: request.headers.get("user-agent"),
          referer: request.headers.get("referer"),
          landing_path: touch?.landing_path ?? null,
        },
      })
      .select("id")
      .single()

    if (error) {
      console.error("[api/leads] insert error:", error)
      return NextResponse.json(
        { error: "Não foi possível salvar o lead." },
        { status: 500 },
      )
    }

    void sendLeadToColmeia({
      nome: data.nome,
      email: data.email.toLowerCase(),
      telefone: data.telefone,
      cargo: data.cargo,
      empresa: data.empresa,
      uf: data.uf,
      lead_source: data.lead_source,
      form_name: data.form_name,
      utm: touch,
    }).catch((e) => console.error("[api/leads] colmeia webhook falhou:", e))

    return NextResponse.json({ id: inserted.id }, { status: 201 })
  } catch (error) {
    console.error("[api/leads] unexpected error:", error)

    const message = error instanceof Error ? error.message : ""
    const missingSupabase =
      message.includes("Supabase server credentials are not configured")

    if (missingSupabase && process.env.NODE_ENV === "development") {
      return NextResponse.json(
        {
          error:
            "Supabase não configurado localmente. Crie .env.local com SUPABASE_SERVICE_ROLE_KEY e reinicie o servidor.",
        },
        { status: 503 },
      )
    }

    return NextResponse.json(
      { error: "Erro interno ao processar o formulário." },
      { status: 500 },
    )
  }
}
