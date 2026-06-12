"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        setError(data?.error ?? "Não foi possível entrar.")
        return
      }
      router.refresh()
    } catch {
      setError("Erro de rede. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl border border-hairline bg-canvas p-8"
      >
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-ink">Admin · Leads</h1>
          <p className="text-sm text-muted-foreground">
            Acesso restrito. Informe a senha.
          </p>
        </div>

        {!configured && (
          <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
            Painel não configurado: defina <code>ADMIN_PASSWORD</code> nas
            variáveis de ambiente.
          </p>
        )}

        <Input
          type="password"
          autoFocus
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading || !configured}
          aria-label="Senha do admin"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button
          type="submit"
          className="w-full"
          disabled={loading || !configured || password.length === 0}
        >
          {loading ? "Entrando…" : "Entrar"}
        </Button>
      </form>
    </main>
  )
}
