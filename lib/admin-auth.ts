import { createHmac, timingSafeEqual } from "node:crypto"

/**
 * Autenticação simples por senha única para o painel /admin.
 * O cookie guarda um token derivado (HMAC) da senha — não a senha em si —
 * então não dá pra forjar sem conhecer ADMIN_PASSWORD.
 */

export const ADMIN_COOKIE = "juspilot_admin"
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8 // 8 horas

const TOKEN_SUBJECT = "juspilot-admin-session-v1"

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD)
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

/** Token determinístico derivado da senha; é o valor gravado no cookie. */
export function getSessionToken(): string {
  const password = process.env.ADMIN_PASSWORD
  if (!password) throw new Error("ADMIN_PASSWORD não configurada")
  return createHmac("sha256", password).update(TOKEN_SUBJECT).digest("hex")
}

export function verifyPassword(input: unknown): boolean {
  const password = process.env.ADMIN_PASSWORD
  if (!password || typeof input !== "string") return false
  return safeEqual(input, password)
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) return false
  return safeEqual(token, getSessionToken())
}
