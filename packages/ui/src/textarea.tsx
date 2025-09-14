import * as React from "react"

import { cn } from "@repo/lib"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-primary-text ring-offset-background placeholder:text-secondary-text/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-interactive focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

