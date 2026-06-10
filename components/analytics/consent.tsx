"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

const CONSENT_COOKIE = "juspilot_consent"
const CONSENT_VERSION = "1"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || ".juspilot.ai"
const PRIVACY_URL = "https://juspilot.ai/politica-de-privacidade"

type ConsentValue = "granted" | "denied"

type ConsentState = {
  ad_storage: ConsentValue
  ad_user_data: ConsentValue
  ad_personalization: ConsentValue
  analytics_storage: ConsentValue
  functionality_storage: ConsentValue
  personalization_storage: ConsentValue
  security_storage: ConsentValue
}

const GRANTED: ConsentState = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
  functionality_storage: "granted",
  personalization_storage: "granted",
  security_storage: "granted",
}

const DENIED_EXCEPT_SECURITY: ConsentState = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted",
}

function readConsentCookie(): { version: string; state: ConsentState } | null {
  if (typeof document === "undefined") return null
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`))
  if (!match) return null
  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1]))
  } catch {
    return null
  }
}

function writeConsentCookie(state: ConsentState) {
  if (typeof document === "undefined") return
  const value = encodeURIComponent(
    JSON.stringify({ version: CONSENT_VERSION, state }),
  )
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  const domainAttr = isLocal ? "" : `; domain=${ROOT_DOMAIN}`
  const secureAttr = isLocal ? "" : "; secure"
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${COOKIE_MAX_AGE}${domainAttr}${secureAttr}; samesite=lax`
}

function pushConsentUpdate(state: ConsentState) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: "consent_update",
    ...state,
  })
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", state)
  }
}

export function ConsentModeDefaults() {
  return (
    <Script
      id="consent-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'denied',
            personalization_storage: 'denied',
            security_storage: 'granted',
            wait_for_update: 500
          });
          gtag('set', 'ads_data_redaction', true);
          gtag('set', 'url_passthrough', true);
          try {
            var m = document.cookie.split('; ').find(function(r){return r.indexOf('${CONSENT_COOKIE}=')===0;});
            if (m) {
              var parsed = JSON.parse(decodeURIComponent(m.split('=')[1]));
              if (parsed && parsed.version === '${CONSENT_VERSION}' && parsed.state) {
                gtag('consent', 'update', parsed.state);
              }
            }
          } catch(e){}
        `,
      }}
    />
  )
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = readConsentCookie()
    if (!existing || existing.version !== CONSENT_VERSION) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  function accept() {
    writeConsentCookie(GRANTED)
    pushConsentUpdate(GRANTED)
    setVisible(false)
  }

  function reject() {
    writeConsentCookie(DENIED_EXCEPT_SECURITY)
    pushConsentUpdate(DENIED_EXCEPT_SECURITY)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-2xl rounded-lg border border-hairline bg-canvas p-4 shadow-soft-lift md:left-auto md:right-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="type-body-sm text-body-muted">
          Usamos cookies para melhorar sua experiência e medir o desempenho das
          nossas campanhas. Ao aceitar, você concorda com o uso de cookies
          conforme nossa{" "}
          <a
            href={PRIVACY_URL}
            className="underline underline-offset-2 text-ink hover:text-coral"
          >
            Política de Privacidade
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={reject}
            className="h-9 rounded-md border border-hairline bg-canvas px-4 type-caption text-ink hover:bg-soft-stone/60"
          >
            Rejeitar
          </button>
          <button
            type="button"
            onClick={accept}
            className="h-9 rounded-md bg-primary px-4 type-caption text-on-primary hover:bg-primary-active"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
