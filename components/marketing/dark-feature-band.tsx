import * as React from "react"
import { cn } from "@/lib/utils"
import { MonoLabel } from "@/components/ui/mono-label"

interface DarkFeatureBandProps {
  tone?: "green" | "navy"
  eyebrow?: string
  heading: React.ReactNode
  body?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function DarkFeatureBand({
  tone = "green",
  eyebrow,
  heading,
  body,
  children,
  className,
}: DarkFeatureBandProps) {
  const toneClass = tone === "green" ? "bg-deep-green" : "bg-dark-navy"

  return (
    <section className="container-page pb-section">
      <div
        className={cn(
          "rounded-xl px-6 py-16 sm:px-12 sm:py-20 md:px-20 md:py-24",
          toneClass,
          "text-on-dark",
          className,
        )}
      >
        <div className="flex flex-col gap-6 max-w-3xl">
          {eyebrow ? <MonoLabel tone="on-dark">{eyebrow}</MonoLabel> : null}
          <h2 className="type-display-md text-balance">{heading}</h2>
          {body ? <p className="type-body-md text-on-dark-soft max-w-2xl">{body}</p> : null}
        </div>
        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  )
}
