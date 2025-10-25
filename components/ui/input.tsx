import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // same structure as your earlier preferred version
        "w-full rounded-lg border bg-white/60 px-3 py-2 text-base transition-all outline-none md:text-sm",
        // colors
        "border-border/30 text-heading placeholder:text-accent-secondary-hover",
        // focus and interaction
        "focus:ring-accent/60 focus:border-accent hover:border-accent/40 focus:ring-2",
        // disabled & invalid
        "aria-invalid:border-destructive disabled:bg-gray-100 disabled:text-gray-500",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
