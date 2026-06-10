"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { trackOutboundClick } from "@/lib/analytics"

interface SegmentCardProps {
  title: string
  description: string
  href: string
  learnMoreLabel?: string
  className?: string
}

export function SegmentCard({
  title,
  description,
  href,
  learnMoreLabel = "Saiba mais",
  className,
}: SegmentCardProps) {
  return (
    <Link
      href={href}
      onClick={() =>
        trackOutboundClick({
          link_url: href,
          link_text: title,
          link_location: "segments",
        })
      }
      className={cn(
        "group flex flex-col gap-4 rounded-lg border border-hairline bg-canvas p-8 transition-colors hover:border-whisper-strong hover:bg-canvas-soft",
        className,
      )}
    >
      <h3 className="type-title-md text-ink">{title}</h3>
      <p className="type-body-md text-body-muted flex-1">{description}</p>
      <span className="inline-flex items-center gap-2 type-caption text-coral group-hover:gap-3 transition-all">
        {learnMoreLabel}
        <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  )
}
