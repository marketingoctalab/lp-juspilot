import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "./lib/i18n"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip non-page routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next()
  }

  // Already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect root to default locale
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|favicon.ico|.*\\..*).*)"],
}

// Next.js 16 alias
export { proxy as middleware }
