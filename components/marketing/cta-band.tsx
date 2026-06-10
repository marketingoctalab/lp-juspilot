"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { trackInitiateCheckout } from "@/components/analytics/pixel-events"
import { trackCTAClick } from "@/lib/analytics"

interface CtaBandProps {
  eyebrow?: string
  heading: string
  subline?: string
  primaryLabel: string
  onPrimaryClick?: () => void
  secondaryLabel?: string
  secondaryHref?: string
  tone?: "light" | "dark"
  className?: string
}

export function CtaBand({
  eyebrow,
  heading,
  subline,
  primaryLabel,
  onPrimaryClick,
  secondaryLabel,
  secondaryHref,
  tone = "light",
  className,
}: CtaBandProps) {
  const isDark = tone === "dark"

  return (
    <section className="container-page pb-section">
      <div
        className={cn(
          "flex flex-col items-center gap-4 sm:gap-6 rounded-xl px-4 py-8 sm:px-12 sm:py-16 text-center",
          isDark ? "bg-primary text-on-dark" : "bg-soft-stone text-ink",
          className,
        )}
      >
        {eyebrow ? (
          <span className={cn("type-mono-label", isDark ? "text-on-dark-soft" : "text-slate")}>
            {eyebrow}
          </span>
        ) : null}
        <h2 className="type-display-sm text-balance max-w-2xl">{heading}</h2>
        {subline ? (
          <p className={cn("type-body-md max-w-xl", isDark ? "text-on-dark-soft" : "text-body-muted")}>
            {subline}
          </p>
        ) : null}
        <div className="mt-1 sm:mt-2 flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none">
          <Button
            size="lg"
            variant={isDark ? "secondary" : "default"}
            className={cn(
              "w-full sm:w-auto min-h-[48px] text-base",
              isDark ? "bg-canvas text-ink border-transparent hover:bg-canvas/90" : "",
            )}
            onClick={onPrimaryClick}
          >
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref ? (
            <Button
              asChild
              size="lg"
              variant="ghost"
              className={cn("w-full sm:w-auto min-h-[48px]", isDark ? "text-on-dark hover:bg-white/10" : "")}
            >
              <a
                href={secondaryHref}
                onClick={() => {
                  trackInitiateCheckout("pricing")
                  trackCTAClick({
                    cta_name: "cta_section_pricing",
                    cta_location: "cta_section",
                    cta_href: secondaryHref,
                  })
                }}
              >
                {secondaryLabel}
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
