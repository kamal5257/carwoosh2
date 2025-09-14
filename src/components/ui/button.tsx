import * as React from "react";
// import { cn } from "@/lib/utils"; // (Optional: helper to merge classNames)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-white hover:bg-primary/90",
      outline: "border border-border bg-transparent hover:bg-muted",
      ghost: "bg-transparent hover:bg-muted",
      destructive: "bg-destructive text-white hover:bg-destructive/90",
    };

    const sizes = {
      default: "h-10 px-4 rounded-md",
      sm: "h-8 px-3 rounded-md text-sm",
      lg: "h-12 px-6 rounded-lg text-lg",
      icon: "h-10 w-10 rounded-full flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        className={`${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
