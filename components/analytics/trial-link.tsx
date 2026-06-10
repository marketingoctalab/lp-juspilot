"use client"

import type { ComponentProps } from "react"
import { trackLead } from "@/components/analytics/pixel-events"
import { trackCTAClick } from "@/lib/analytics"
import { getTrialUrl } from "@/lib/app-url"
import { cn } from "@/lib/utils"

interface TrialLinkProps extends ComponentProps<"a"> {
  source: string
  ctaName?: string
}

/**
 * Link para o trial com tracking Meta Lead + dataLayer.
 * Usar em todos os CTAs primários de conversão da LP.
 */
export function TrialLink({
  source,
  ctaName = "trial",
  href,
  onClick,
  className,
  children,
  ...props
}: TrialLinkProps) {
  const destination = href ?? getTrialUrl()

  return (
    <a
      href={destination}
      className={cn(className)}
      onClick={(e) => {
        trackLead(source)
        trackCTAClick({
          cta_name: ctaName,
          cta_location: source,
          cta_href: destination,
        })
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </a>
  )
}
