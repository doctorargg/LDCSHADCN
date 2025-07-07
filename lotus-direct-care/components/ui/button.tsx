import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transform-gpu",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[oklch(0.62_0.18_180)] to-[oklch(0.55_0.17_180)] text-primary-foreground shadow-md hover:shadow-lg hover:from-[oklch(0.58_0.17_180)] hover:to-[oklch(0.52_0.16_180)] hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2 border-[oklch(0.62_0.18_180_/_0.3)] bg-background shadow-sm hover:bg-[oklch(0.62_0.18_180_/_0.05)] hover:border-[oklch(0.62_0.18_180_/_0.5)] hover:shadow-md dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-gradient-to-r from-[oklch(0.75_0.15_75)] to-[oklch(0.70_0.14_75)] text-white shadow-md hover:shadow-lg hover:from-[oklch(0.72_0.14_75)] hover:to-[oklch(0.68_0.13_75)] hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "hover:bg-[oklch(0.62_0.18_180_/_0.08)] hover:text-[oklch(0.45_0.16_180)] dark:hover:bg-accent/50",
        link: "text-[oklch(0.62_0.18_180)] underline-offset-4 hover:underline hover:text-[oklch(0.55_0.17_180)]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
