import * as React from "react"
import { cn } from "@/lib/utils"
import { MonoLabel } from "@/components/ui/mono-label"

interface SectionHeadingProps {
  eyebrow?: string
  heading: React.ReactNode
  description?: React.ReactNode
  align?: "start" | "center"
  size?: "md" | "lg"
  tone?: "light" | "on-dark"
  className?: string
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "start",
  size = "md",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left"
  const headingClass = size === "lg" ? "type-display-lg" : "type-display-md"
  const bodyToneClass = tone === "on-dark" ? "text-on-dark-soft" : "text-body-muted"

  return (
    <div className={cn("flex flex-col gap-3 sm:gap-5 max-w-2xl", alignment, className)}>
      {eyebrow ? (
        <MonoLabel tone={tone === "on-dark" ? "on-dark" : "muted"}>{eyebrow}</MonoLabel>
      ) : null}
      <h2 className={cn(headingClass, "text-balance", tone === "on-dark" ? "text-on-dark" : "text-ink")}>
        {heading}
      </h2>
      {description ? (
        <p className={cn("type-body-md max-w-xl", bodyToneClass)}>{description}</p>
      ) : null}
    </div>
  )
}
