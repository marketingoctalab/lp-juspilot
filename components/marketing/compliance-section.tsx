import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComplianceColumn {
  title: string
  items: readonly string[]
}

interface ComplianceSectionProps {
  columns: readonly ComplianceColumn[]
  className?: string
}

export function ComplianceSection({ columns, className }: ComplianceSectionProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {columns.map((col) => (
        <div
          key={col.title}
          className="rounded-xl border border-hairline bg-canvas px-4 py-6 sm:px-8 sm:py-8"
        >
          <h3 className="type-title-md text-ink mb-6">{col.title}</h3>
          <ul className="space-y-3">
            {col.items.map((item) => (
              <li key={item} className="flex items-start gap-3 type-body-sm text-body-muted">
                <Check className="w-4 h-4 text-coral shrink-0 mt-0.5" strokeWidth={2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
