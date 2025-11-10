import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import cva, { type VariantProps } from "class-variance-authority";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility class merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// Button variant setup
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Button Component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Main Modal Component
const NoticeModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShow(false);

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
        <div className="bg-card border border-border rounded-2xl shadow-lg w-full max-w-md p-6 md:p-8 text-center pointer-events-auto animate-in fade-in zoom-in-95 duration-300">
          {/* Icon */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Info className="text-primary w-6 h-6" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Pemberitahuan Penting
          </h2>

          {/* Content */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Untuk kebutuhan{" "}
            <span className="font-semibold text-foreground">
              emulator, game, atau Roblox
            </span>{" "}
            silakan gunakan paket{" "}
            <span className="font-semibold text-primary">Baremetal</span>.
            <br />
            <span className="text-muted-foreground/80">
              RDP & VPS Standar tidak mendukung penggunaan emulator atau game.
            </span>
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            <Button
              asChild
              size="default"
              className="transition-transform active:scale-95"
            >
              <a href="#pricing" onClick={handleClose}>
                Lihat Paket
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="transition-transform active:scale-95"
            >
              Tutup
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeModal;
