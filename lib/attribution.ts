/**
 * Atribuição de origem — UTM, referrer, fbclid, gclid
 * Cookie no root domain (.juspilot.ai) para signup no app.
 */

export const ATTRIBUTION_COOKIE = "juspilot_attr"
export const ATTRIBUTION_MAX_AGE_SECONDS = 60 * 60 * 24 * 90

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

export const CLICK_ID_KEYS = ["gclid", "fbclid", "msclkid", "ttclid"] as const

export type AttributionTouch = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
  ttclid?: string
  referrer?: string
  landing_path?: string
  captured_at: string
}

export type AttributionPayload = {
  first: AttributionTouch
  last: AttributionTouch
}

export function extractAttributionFromUrl(
  url: URL,
  referrer?: string | null,
): AttributionTouch | null {
  const data: Record<string, string> = {}
  for (const k of UTM_KEYS) {
    const v = url.searchParams.get(k)
    if (v) data[k] = v
  }
  for (const k of CLICK_ID_KEYS) {
    const v = url.searchParams.get(k)
    if (v) data[k] = v
  }

  if (Object.keys(data).length === 0) {
    if (!referrer) return null
    try {
      const refUrl = new URL(referrer)
      if (refUrl.hostname.endsWith("juspilot.ai")) return null
      data.utm_source = refUrl.hostname
      data.utm_medium = "referral"
    } catch {
      return null
    }
  }

  return {
    ...data,
    referrer: referrer || undefined,
    landing_path: url.pathname,
    captured_at: new Date().toISOString(),
  }
}

export function parseAttributionCookie(
  raw: string | undefined | null,
): AttributionPayload | null {
  if (!raw) return null
  try {
    return JSON.parse(decodeURIComponent(raw)) as AttributionPayload
  } catch {
    return null
  }
}

export function serializeAttributionCookie(payload: AttributionPayload): string {
  return encodeURIComponent(JSON.stringify(payload))
}

export function mergeAttribution(
  existing: AttributionPayload | null,
  incoming: AttributionTouch,
): AttributionPayload {
  if (!existing) return { first: incoming, last: incoming }
  return { first: existing.first, last: incoming }
}
