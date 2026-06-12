import { NextResponse } from "next/server"
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  getSessionToken,
  isAdminConfigured,
  verifyPassword,
} from "@/lib/admin-auth"

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Painel admin não configurado. Defina ADMIN_PASSWORD." },
      { status: 503 },
    )
  }

  const body = (await request.json().catch(() => null)) as
    | { password?: unknown }
    | null

  if (!verifyPassword(body?.password)) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  })
  return response
}
