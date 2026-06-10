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
      <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
        <span className="type-title-md text-body-muted line-through decoration-coral/40">{before}</span>
        <span className="hidden sm:inline text-coral type-caption">→</span>
        <span className="type-display-sm text-ink">{after}</span>
      </div>
      <p className="type-caption text-body-muted mt-3">{label}</p>
    </div>
  )
}
