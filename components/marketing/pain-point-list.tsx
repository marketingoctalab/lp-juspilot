import { cn } from "@/lib/utils"

interface PainPoint {
  title: string
  desc: string
  highlight?: boolean
}

interface PainPointListProps {
  items: readonly PainPoint[]
  className?: string
}

export function PainPointList({ items, className }: PainPointListProps) {
  return (
    <div className={cn("space-y-0 divide-y divide-hairline border border-hairline rounded-xl bg-canvas overflow-hidden", className)}>
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            "flex gap-5 sm:gap-6 px-5 sm:px-8 py-6 sm:py-7 border-l-4",
            item.highlight ? "border-l-coral bg-soft-stone/50" : "border-l-hairline",
          )}
        >
          <div className="min-w-0 flex-1">
            <h3 className="type-title-sm text-ink mb-2">{item.title}</h3>
            <p className="type-body-sm text-body-muted">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
