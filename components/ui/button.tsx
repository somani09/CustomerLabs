import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent/40 border border-transparent",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40",
        outline:
          "border border-border/50 bg-transparent text-heading hover:bg-glass/40 hover:text-heading focus-visible:ring-border/30",
        secondary:
          "bg-accent-secondary text-heading hover:bg-accent-secondary-hover focus-visible:ring-accent-secondary/40 border border-border/30",
        ghost:
          "bg-transparent text-text-muted hover:text-heading hover:bg-glass/30 border border-transparent focus-visible:ring-border/30",
        link: "text-accent underline-offset-4 hover:underline",
        primary:
          "bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent/40 border border-transparent",
        mint: "bg-accent-secondary text-heading hover:bg-accent-secondary-hover focus-visible:ring-accent-secondary/40 border border-border/30",
      },

      size: {
        default: "h-9 px-4 py-2 text-base",
        sm: "h-8 px-3 py-1.5 text-sm",
        lg: "h-10 px-6 py-3 text-lg shadow-md",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
