import type { Metadata } from "next"
import { cookies } from "next/headers"
import { AdminLeads, type LeadRow } from "@/components/admin/admin-leads"
import { AdminLogin } from "@/components/admin/admin-login"
import {
  ADMIN_COOKIE,
  isAdminConfigured,
  verifySessionToken,
} from "@/lib/admin-auth"
import { createAdminClient } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin · Leads",
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value

  if (!verifySessionToken(token)) {
    return <AdminLogin configured={isAdminConfigured()} />
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("lp_juspilot_leads")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-xl font-semibold">Erro ao carregar leads</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </main>
    )
  }

  return <AdminLeads leads={(data ?? []) as LeadRow[]} />
}
