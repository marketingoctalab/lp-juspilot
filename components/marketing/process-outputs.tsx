import { cn } from "@/lib/utils"

interface ProcessOutput {
  title: string
  desc: string
}

interface ProcessOutputsProps {
  items: readonly ProcessOutput[]
  className?: string
}

export function ProcessOutputs({ items, className }: ProcessOutputsProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}>
      {items.map((item, index) => (
        <div
          key={item.title}
          className="rounded-xl border border-hairline bg-canvas p-5 sm:p-8 flex flex-col gap-2.5 sm:gap-3"
        >
          <span className="type-caption text-coral font-mono">0{index + 1}</span>
          <h3 className="type-title-md text-ink">{item.title}</h3>
          <p className="type-body-sm text-body-muted">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
