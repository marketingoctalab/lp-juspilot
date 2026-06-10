import { cn } from "@/lib/utils"

interface ImpactMetric {
  value: string
  label: string
  detail: string
}

interface ImpactBandProps {
  metrics: readonly ImpactMetric[]
  premises: string
  disclaimer: string
  className?: string
}

export function ImpactBand({ metrics, premises, disclaimer, className }: ImpactBandProps) {
  return (
    <div className={cn("rounded-xl bg-primary text-on-dark px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-8 mb-8 sm:mb-10">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center sm:text-left py-2 sm:py-0 border-b border-white/10 sm:border-0 last:border-0 pb-6 sm:pb-0 last:pb-0">
            <p className="type-display-lg text-on-dark mb-1.5 sm:mb-2 break-words">{metric.value}</p>
            <p className="type-title-sm text-on-dark mb-1">{metric.label}</p>
            <p className="type-caption text-on-dark-soft">{metric.detail}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-5 sm:pt-6 space-y-2">
        <p className="type-caption text-on-dark-soft text-pretty leading-relaxed">{premises}</p>
        <p className="type-caption text-on-dark-soft/80 text-pretty leading-relaxed">{disclaimer}</p>
      </div>
    </div>
  )
}
