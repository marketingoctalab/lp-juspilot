import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CtaBandProps {
  eyebrow?: string
  heading: string
  subline?: string
  primaryLabel: string
  secondaryLabel?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  tone?: "light" | "dark"
  className?: string
}

export function CtaBand({
  eyebrow,
  heading,
  subline,
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  tone = "light",
  className,
}: CtaBandProps) {
  const isDark = tone === "dark"

  return (
    <section className="container-page pb-section">
      <div
        className={cn(
          "flex flex-col items-center gap-6 rounded-xl px-6 py-12 sm:px-12 sm:py-16 text-center",
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
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant={isDark ? "secondary" : "default"}
            size="lg"
            className={isDark ? "bg-canvas text-ink border-transparent hover:bg-canvas/90" : ""}
            onClick={onPrimaryClick}
          >
            {primaryLabel}
          </Button>
          {secondaryLabel ? (
            <Button
              variant="ghost"
              size="lg"
              className={isDark ? "text-on-dark hover:bg-white/10" : ""}
              onClick={onSecondaryClick}
            >
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
