import { cn } from "@/lib/utils"

interface ValueHighlightProps {
  text: string
  className?: string
}

export function ValueHighlight({ text, className }: ValueHighlightProps) {
  return (
    <section className={cn("container-page py-10 sm:py-12", className)}>
      <div className="rounded-xl border border-coral/25 bg-soft-stone px-6 py-8 sm:px-10 sm:py-10 text-center">
        <p className="type-display-sm text-balance text-ink max-w-3xl mx-auto leading-snug">
          {text}
        </p>
      </div>
    </section>
  )
}
