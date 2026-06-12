import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "./lib/i18n"
import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_MAX_AGE_SECONDS,
  CLICK_ID_KEYS,
  UTM_KEYS,
  extractAttributionFromUrl,
  mergeAttribution,
  parseAttributionCookie,
  serializeAttributionCookie,
} from "./lib/attribution"

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || ".juspilot.ai"

function normalizeHostname(raw: string | null): string {
  if (!raw) return ""
  const first = raw.split(",")[0]?.trim() || ""
  return first.split(":")[0].toLowerCase().trim()
}

function applyAttributionCookie(
  request: NextRequest,
  response: NextResponse,
): NextResponse {
  const accept = request.headers.get("accept") ?? ""
  const isHtml = accept.includes("text/html")
  if (!isHtml) return response

  response.headers.set("Cache-Control", "private, max-age=0, must-revalidate")

  const hostname = normalizeHostname(
    request.headers.get("x-forwarded-host") || request.headers.get("host"),
  )
  const hasAttributionParam = [...UTM_KEYS, ...CLICK_ID_KEYS].some((k) =>
    request.nextUrl.searchParams.has(k),
  )
  const referrer = request.headers.get("referer")
  const hasExternalReferrer = !!referrer && !referrer.includes(hostname)

  if (hasAttributionParam || hasExternalReferrer) {
    const incoming = extractAttributionFromUrl(request.nextUrl, referrer)
    if (incoming) {
      const existing = parseAttributionCookie(
        request.cookies.get(ATTRIBUTION_COOKIE)?.value,
      )
      const merged = mergeAttribution(existing, incoming)
      const isLocal = hostname === "localhost" || hostname === "127.0.0.1"
      response.cookies.set(ATTRIBUTION_COOKIE, serializeAttributionCookie(merged), {
        maxAge: ATTRIBUTION_MAX_AGE_SECONDS,
        path: "/",
        sameSite: "lax",
        secure: !isLocal,
        domain: isLocal ? undefined : ROOT_DOMAIN,
      })
    }
  }

  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname}`
    return applyAttributionCookie(request, NextResponse.redirect(url))
  }

  return applyAttributionCookie(request, NextResponse.next())
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|favicon.ico|.*\\..*).*)"],
}

export { proxy as middleware }
