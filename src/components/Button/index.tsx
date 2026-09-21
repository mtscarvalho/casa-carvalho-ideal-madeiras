import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex gap-2 items-center justify-center transition-colors duration-300 cursor-pointer rounded-md  disabled:pointer-events-none",
  variants: {
    size: {
      md: "px-6 py-3 min-h-[38px]",
      sm: "py-2 px-3 min-h-[30px]",
      icon: "p-4",
    },
    width: {
      full: "w-full max-w-full justify-start text-left",
    },
    variant: {
      primary: "bg-primary text-white hover:bg-brand-primary-hover disabled:bg-disabled disabled:text-on-disabled",
      secondary: "bg-secondary text-white hover:bg-brand-secondary-hover disabled:bg-disabled disabled:text-on-disabled",
      outline: " border-primary border text-primary hover:bg-secondary disabled:bg-disabled disabled:border-disabled disabled:border disabled:text-on-disabled",
      subtle: "hover:bg-dune-800/15 hover:text-secondary disabled:text-on-disabled",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function ButtonOld({ className, variant, width, size, asChild = false, ...props }: ButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const classes = buttonVariants({ size, variant, width, className });
  const Comp = asChild ? Slot : "button";

  return <Comp className={classes} ref={ref} {...props} />;
}

const ForwardedButton = React.forwardRef(ButtonOld);

export { ForwardedButton as ButtonOld };
