"use client"

import { useEffect } from "react"
import { trackViewContent } from "@/components/analytics/pixel-events"

interface LpPageTrackerProps {
  contentName?: string
  contentCategory?: string
}

/**
 * Dispara ViewContent (Meta) na primeira carga da LP.
 * page_view é tratado pelo GTMPageViewTracker.
 */
export function LpPageTracker({
  contentName = "lp_home",
  contentCategory = "landing_page",
}: LpPageTrackerProps) {
  useEffect(() => {
    trackViewContent(contentName, contentCategory)
  }, [contentName, contentCategory])

  return null
}
