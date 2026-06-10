import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "type-button transition-colors",
    "rounded-md",
    "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus-ring)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-primary-active",
        secondary: "bg-canvas text-ink border border-hairline hover:bg-soft-stone/60",
        ghost: "bg-transparent text-ink hover:bg-black/[0.04]",
        link: "bg-transparent text-action-blue underline-offset-4 hover:underline rounded-none px-0 h-auto",
        brand: "bg-brand text-brand-foreground hover:bg-brand-active",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 px-4",
        lg: "h-11 px-6",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
