import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-white shadow-glow hover:shadow-premium-hover",
        destructive: "bg-brand-error text-white shadow-md hover:bg-brand-error/90",
        outline: "border border-neutral-300 bg-white hover:bg-neutral-50 hover:text-neutral-900 shadow-card hover:shadow-card-hover",
        secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 shadow-card",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900",
        link: "text-brand-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-primary text-white shadow-glow hover:shadow-premium-hover font-semibold",
        glass: "bg-gradient-glass backdrop-blur-premium border border-neutral-200/60 shadow-premium hover:shadow-premium-hover",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-xl px-8 font-semibold",
        icon: "h-10 w-10",
        xl: "h-14 rounded-2xl px-12 text-lg font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
