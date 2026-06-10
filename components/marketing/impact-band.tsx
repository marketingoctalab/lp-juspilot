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
    <div className={cn("rounded-xl bg-primary text-on-dark px-6 py-12 sm:px-12 sm:py-16", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mb-10">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center sm:text-left">
            <p className="type-display-lg text-on-dark mb-2">{metric.value}</p>
            <p className="type-title-sm text-on-dark mb-1">{metric.label}</p>
            <p className="type-caption text-on-dark-soft">{metric.detail}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-6 space-y-2">
        <p className="type-caption text-on-dark-soft">{premises}</p>
        <p className="type-caption text-on-dark-soft/80">{disclaimer}</p>
      </div>
    </div>
  )
}
