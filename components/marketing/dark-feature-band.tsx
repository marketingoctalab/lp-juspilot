import * as React from "react"
import { cn } from "@/lib/utils"
import { MonoLabel } from "@/components/ui/mono-label"

interface DarkFeatureBandProps {
  id?: string
  tone?: "green" | "navy"
  eyebrow?: string
  heading: React.ReactNode
  body?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function DarkFeatureBand({
  id,
  tone = "green",
  eyebrow,
  heading,
  body,
  children,
  className,
}: DarkFeatureBandProps) {
  const toneClass = tone === "green" ? "bg-deep-green" : "bg-dark-navy"

  return (
    <section id={id} className="container-page pb-section">
      <div
        className={cn(
          "rounded-xl px-4 py-10 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-20 lg:py-24",
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
        {children ? <div className="mt-8 sm:mt-12">{children}</div> : null}
      </div>
    </section>
  )
}
