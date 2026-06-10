"use client"

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { generateEventId } from "@/lib/meta-event-id"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

function GTMPageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && GTM_ID) {
      window.dataLayer?.push({
        event: "page_view",
        event_id: generateEventId("pv"),
        page_path: pathname,
        page_search: searchParams?.toString() || "",
        page_title: document.title,
        page_hostname: window.location.hostname,
        page_location: window.location.href,
      })
    }
  }, [pathname, searchParams])

  return null
}

export function GoogleTagManager() {
  if (!GTM_ID) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ GTM não configurado. Defina NEXT_PUBLIC_GTM_ID no .env")
    }
    return null
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <Suspense fallback={null}>
        <GTMPageViewTracker />
      </Suspense>
    </>
  )
}

export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    gtag: (...args: unknown[]) => void
  }
}
