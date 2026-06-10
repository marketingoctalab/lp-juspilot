import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { MonoLabel } from "@/components/ui/mono-label"

interface PlatformFeature {
  title: string
  desc: string
  bullets?: readonly string[]
  badge?: string
  featured?: boolean
}

interface PlatformShowcaseProps {
  featured: readonly PlatformFeature[]
  modules: readonly { title: string; desc: string }[]
  supportHeadline?: string
  supportSub?: string
  className?: string
}

export function PlatformShowcase({
  featured,
  modules,
  supportHeadline,
  supportSub,
  className,
}: PlatformShowcaseProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((item) => (
          <div
            key={item.title}
            className={cn(
              "relative flex flex-col gap-3 sm:gap-4 rounded-xl border p-5 sm:p-8",
              item.featured
                ? "border-coral bg-canvas shadow-soft-lift"
                : "border-hairline bg-canvas",
            )}
          >
            {item.badge ? (
              <MonoLabel
                tone="coral"
                className="self-start rounded-full border border-coral/30 bg-soft-stone px-2 py-0.5 sm:absolute sm:top-4 sm:right-4 sm:self-auto"
              >
                {item.badge}
              </MonoLabel>
            ) : null}
            <div>
              <h3 className="type-title-md text-ink sm:pr-16">{item.title}</h3>
              <p className="type-body-sm text-body-muted mt-2">{item.desc}</p>
            </div>
            {item.bullets && item.bullets.length > 0 ? (
              <ul className="space-y-2 mt-auto">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 type-caption text-ink">
                    <Check className="w-4 h-4 text-coral shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      {supportHeadline ? (
        <div className="pt-2">
          <h3 className="type-title-sm text-ink mb-1">{supportHeadline}</h3>
          {supportSub ? (
            <p className="type-body-sm text-body-muted mb-4">{supportSub}</p>
          ) : null}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {modules.map((mod) => (
          <div
            key={mod.title}
            className="rounded-lg border border-hairline bg-soft-stone/60 px-5 py-4"
          >
            <h4 className="type-title-sm text-ink mb-1">{mod.title}</h4>
            <p className="type-caption text-body-muted">{mod.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
