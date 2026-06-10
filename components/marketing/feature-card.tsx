import * as React from "react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  className?: string
  surface?: "soft-stone" | "pale-green" | "pale-blue" | "canvas"
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
  surface = "soft-stone",
}: FeatureCardProps) {
  const surfaceClass = {
    "soft-stone": "bg-soft-stone text-ink",
    "pale-green": "bg-pale-green text-deep-green",
    "pale-blue": "bg-pale-blue text-ink",
    canvas: "bg-canvas border border-hairline text-ink",
  }[surface]

  return (
    <div className={cn("flex flex-col gap-4 rounded-lg p-8", surfaceClass, className)}>
      {icon ? (
        <div className="text-ink/80" aria-hidden>
          {icon}
        </div>
      ) : null}
      <h3 className="type-title-md">{title}</h3>
      <p className="type-body-md text-body-muted">{description}</p>
    </div>
  )
}
