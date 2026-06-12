"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type LeadRow = {
  id: string
  created_at: string
  updated_at: string
  nome: string
  email: string
  telefone: string
  cargo: string
  empresa: string
  uf: string
  locale: string | null
  form_name: string
  lead_source: string | null
  page_hostname: string | null
  page_path: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  fbclid: string | null
  gclid: string | null
  status: string
  metadata: unknown
}

// Ordem e rótulos das colunas (espelha o schema da tabela lp_juspilot_leads).
const COLUMNS: { key: keyof LeadRow; label: string }[] = [
  { key: "created_at", label: "Criado em" },
  { key: "nome", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "telefone", label: "Telefone" },
  { key: "cargo", label: "Cargo" },
  { key: "empresa", label: "Empresa" },
  { key: "uf", label: "UF" },
  { key: "status", label: "Status" },
  { key: "form_name", label: "Formulário" },
  { key: "lead_source", label: "Origem (lead_source)" },
  { key: "locale", label: "Locale" },
  { key: "utm_source", label: "utm_source" },
  { key: "utm_medium", label: "utm_medium" },
  { key: "utm_campaign", label: "utm_campaign" },
  { key: "utm_term", label: "utm_term" },
  { key: "utm_content", label: "utm_content" },
  { key: "fbclid", label: "fbclid" },
  { key: "gclid", label: "gclid" },
  { key: "page_hostname", label: "Hostname" },
  { key: "page_path", label: "Path" },
  { key: "updated_at", label: "Atualizado em" },
  { key: "id", label: "ID" },
  { key: "metadata", label: "Metadata" },
]

/** Valor cru para exportação/cópia (sem formatação de data/locale). */
function rawValue(row: LeadRow, key: keyof LeadRow): string {
  const value = row[key]
  if (value === null || value === undefined) return ""
  if (key === "metadata") return JSON.stringify(value)
  return String(value)
}

/** Valor formatado para exibição na tabela. */
function displayValue(row: LeadRow, key: keyof LeadRow): string {
  const value = row[key]
  if (value === null || value === undefined) return "—"
  if (key === "created_at" || key === "updated_at") {
    const d = new Date(String(value))
    return Number.isNaN(d.getTime())
      ? String(value)
      : d.toLocaleString("pt-BR")
  }
  if (key === "metadata") {
    const json = JSON.stringify(value)
    return json === "{}" ? "—" : json
  }
  return String(value)
}

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`
  return value
}

function todayStamp(): string {
  return new Date().toISOString().slice(0, 10)
}

export function AdminLeads({ leads }: { leads: LeadRow[] }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return leads
    return leads.filter((row) =>
      COLUMNS.some((c) => rawValue(row, c.key).toLowerCase().includes(q)),
    )
  }, [leads, query])

  function flash(id: string) {
    setCopied(id)
    setTimeout(() => setCopied((prev) => (prev === id ? null : prev)), 1500)
  }

  async function copyText(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text)
      flash(id)
    } catch {
      // fallback silencioso
    }
  }

  function buildTsv(rows: LeadRow[]): string {
    const header = COLUMNS.map((c) => c.key).join("\t")
    const body = rows
      .map((row) => COLUMNS.map((c) => rawValue(row, c.key)).join("\t"))
      .join("\n")
    return `${header}\n${body}`
  }

  function copyAll() {
    void copyText(buildTsv(filtered), "all")
  }

  function copyRow(row: LeadRow) {
    const text = COLUMNS.map((c) => `${c.label}: ${rawValue(row, c.key)}`).join(
      "\n",
    )
    void copyText(text, row.id)
  }

  function exportCsv() {
    const header = COLUMNS.map((c) => c.key).join(",")
    const body = filtered
      .map((row) => COLUMNS.map((c) => escapeCsv(rawValue(row, c.key))).join(","))
      .join("\r\n")
    const csv = `﻿${header}\r\n${body}`
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-juspilot-${todayStamp()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.refresh()
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink">Leads</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} de {leads.length} lead
            {leads.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Buscar em qualquer coluna…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-64"
          />
          <Button variant="secondary" size="sm" onClick={copyAll}>
            {copied === "all" ? "Copiado!" : "Copiar tudo"}
          </Button>
          <Button size="sm" onClick={exportCsv}>
            Exportar CSV
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            Sair
          </Button>
        </div>
      </header>

      <div className="rounded-lg border border-hairline">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-canvas">Ações</TableHead>
              {COLUMNS.map((c) => (
                <TableHead key={c.key}>{c.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length + 1}
                  className="py-10 text-center text-muted-foreground"
                >
                  Nenhum lead encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="sticky left-0 bg-canvas">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyRow(row)}
                    >
                      {copied === row.id ? "Copiado!" : "Copiar"}
                    </Button>
                  </TableCell>
                  {COLUMNS.map((c) => (
                    <TableCell
                      key={c.key}
                      className="max-w-[280px] truncate"
                      title={rawValue(row, c.key)}
                    >
                      {displayValue(row, c.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
