"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { trackOutboundClick } from "@/lib/analytics"

interface ModuleCardProps {
  title: string
  description: string
  href: string
  className?: string
}

export function ModuleCard({ title, description, href, className }: ModuleCardProps) {
  return (
    <Link
      href={href}
      onClick={() =>
        trackOutboundClick({
          link_url: href,
          link_text: title,
          link_location: "modules",
        })
      }
      className={cn(
        "group flex flex-col gap-3 rounded-lg border border-hairline bg-canvas p-6 transition-colors hover:border-whisper-strong",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="type-title-sm text-ink">{title}</h3>
        <ArrowUpRight className="w-4 h-4 text-slate shrink-0 group-hover:text-coral transition-colors" />
      </div>
      <p className="type-body-sm text-body-muted">{description}</p>
    </Link>
  )
}
