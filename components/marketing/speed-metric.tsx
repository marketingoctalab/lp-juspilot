import { cn } from "@/lib/utils"

interface SpeedMetricProps {
  before: string
  after: string
  label: string
  className?: string
}

export function SpeedMetric({ before, after, label, className }: SpeedMetricProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-6 max-w-full">
        <span className="type-title-sm sm:text-lg text-body-muted line-through decoration-coral/40 text-center">{before}</span>
        <span className="text-coral type-caption sm:hidden" aria-hidden>↓</span>
        <span className="hidden sm:inline text-coral type-caption" aria-hidden>→</span>
        <span className="type-display-sm text-ink text-center">{after}</span>
      </div>
      <p className="type-caption text-body-muted mt-3 text-pretty px-1">{label}</p>
    </div>
  )
}
