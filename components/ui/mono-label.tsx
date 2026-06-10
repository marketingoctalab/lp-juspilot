import * as React from "react"
import { cn } from "@/lib/utils"

interface MonoLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "muted" | "on-dark" | "coral"
  as?: "span" | "div" | "p"
}

export function MonoLabel({
  className,
  tone = "default",
  as: Tag = "span",
  ...props
}: MonoLabelProps) {
  const toneClass = {
    default: "text-ink",
    muted: "text-slate",
    "on-dark": "text-on-dark-soft",
    coral: "text-coral",
  }[tone]

  return <Tag className={cn("type-mono-label", toneClass, className)} {...props} />
}
