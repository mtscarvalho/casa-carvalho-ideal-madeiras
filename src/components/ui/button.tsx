import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center cursor-pointer rounded-lg border border-transparent bg-clip-padding whitespace-nowrap transition-all  select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-primary-hover",
        outline: "border-base bg-elevated text-body hover:bg-subtle hover:text-body aria-expanded:bg-subtle aria-expanded:text-body",
        secondary: "bg-secondary text-on-secondary hover:bg-secondary-hover aria-expanded:bg-secondary aria-expanded:text-on-secondary",
        whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-hover aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "text-body hover:bg-subtle hover:text-body aria-expanded:bg-subtle aria-expanded:text-body",
        destructive: "bg-danger text-on-danger hover:bg-danger/80",
        link: "text-primary underline-offset-4 hover:underline",
      },
      fullwidth: {
        false: "justify-center",
        true: "w-full max-w-full justify-start text-left",
      },
      size: {
        default: "h-10 gap-1.5 px-4 text-base has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullwidth: false,
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  fullwidth,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return <Comp data-slot="button" data-variant={variant} data-size={size} className={cn(buttonVariants({ variant, size, className, fullwidth }))} {...props} />;
}

export { Button, buttonVariants };
