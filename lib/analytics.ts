/**
 * Analytics utilities — dataLayer events for GTM (LP)
 */

export interface AnalyticsEvent {
  event: string
  event_id?: string
  [key: string]: unknown
}

function isAnalyticsAvailable(): boolean {
  return typeof window !== "undefined" && Array.isArray(window.dataLayer)
}

export function trackEvent(event: AnalyticsEvent): void {
  if (!isAnalyticsAvailable()) {
    if (process.env.NODE_ENV === "development") {
      console.warn("📊 [Analytics - Dev]", event)
    }
    return
  }

  window.dataLayer.push(event)

  if (process.env.NODE_ENV === "development") {
    console.warn("📊 [Analytics]", event)
  }
}

export function trackCTAClick(params: {
  cta_name: string
  cta_location: string
  cta_href?: string
}): void {
  trackEvent({
    event: "cta_click",
    cta_name: params.cta_name,
    cta_location: params.cta_location,
    cta_href: params.cta_href,
    page_hostname: typeof window !== "undefined" ? window.location.hostname : undefined,
  })
}

export function trackFormStart(params: {
  form_name: string
  form_location?: string
}): void {
  trackEvent({
    event: "form_start",
    form_name: params.form_name,
    form_location: params.form_location,
    page_hostname: typeof window !== "undefined" ? window.location.hostname : undefined,
  })
}

export function trackFormSubmit(params: {
  form_name: string
  form_destination?: string
  form_location?: string
}): void {
  trackEvent({
    event: "form_submit",
    form_name: params.form_name,
    form_destination: params.form_destination,
    form_location: params.form_location,
    page_hostname: typeof window !== "undefined" ? window.location.hostname : undefined,
  })
}

export function trackOutboundClick(params: {
  link_url: string
  link_text?: string
  link_location?: string
}): void {
  trackEvent({
    event: "outbound_click",
    link_url: params.link_url,
    link_text: params.link_text,
    link_location: params.link_location,
    page_hostname: typeof window !== "undefined" ? window.location.hostname : undefined,
  })
}
