"use client"

/**
 * Meta Pixel helpers — dispara fbq (via GTM) + dataLayer com event_id
 * para desduplicação pixel + CAPI.
 */

import { generateEventId } from "@/lib/meta-event-id"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer: Record<string, unknown>[]
  }
}

function pushDataLayer(event: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    page_hostname: window.location.hostname,
    page_path: window.location.pathname,
    ...event,
  })
}

/**
 * Lead — CTAs de trial / conversão na LP.
 * @param source ex: 'hero', 'header', 'cta_section', 'enterprise_form'
 */
export function trackLead(source = "lp") {
  const eventId = generateEventId("lead")

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(
      "track",
      "Lead",
      {
        content_name: "cta_click",
        lead_source: source,
        content_category: "landing_page",
      },
      { eventID: eventId },
    )
  }

  pushDataLayer({
    event: "generate_lead",
    event_id: eventId,
    lead_source: source,
    lead_type: "trial_intent",
  })
}

export function trackViewContent(contentName: string, contentCategory?: string) {
  const eventId = generateEventId("vc")

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(
      "track",
      "ViewContent",
      {
        content_name: contentName,
        content_category: contentCategory,
      },
      { eventID: eventId },
    )
  }

  pushDataLayer({
    event: "view_content",
    event_id: eventId,
    content_name: contentName,
    content_category: contentCategory,
  })
}

export function trackInitiateCheckout(planName?: string) {
  const eventId = generateEventId("ic")

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(
      "track",
      "InitiateCheckout",
      {
        content_name: planName || "pricing",
      },
      { eventID: eventId },
    )
  }

  pushDataLayer({
    event: "initiate_checkout",
    event_id: eventId,
    plan_name: planName,
  })
}
