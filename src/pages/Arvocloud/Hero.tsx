import React, { useState, useEffect } from "react";
import { ArrowRight, Play, Activity, Zap, Globe, MessageCircle } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx"; 
import NoticeModal from "./NoticeModal";

// ============ BUTTON COMPONENT ============

const buttonVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={clsx(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

// ============ HERO SECTION ============

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <NoticeModal />
      <section
        id="home"
        className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden"
      >
        {/* Clean Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle Gradient Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />
          
          {/* Minimal Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f97316_0.3px,transparent_0.3px),linear-gradient(to_bottom,#f97316_0.3px,transparent_0.3px)] bg-[size:48px_48px] opacity-[0.02]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-32 flex flex-col items-center justify-center text-center max-w-5xl">
          {/* Badge */}
          <div
            className={clsx(
              "inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full text-sm font-medium mb-8 transition-all duration-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            <Activity className="w-4 h-4 text-orange-500" />
            <span className="text-gray-700 font-medium">
              Layanan VPS/RDP Handal & Terpercaya
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={clsx(
              "text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-500 delay-75",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <span className="text-gray-900">Solusi </span>
            <span className="text-orange-500">
              VPS & RDP Premium
            </span>
            <br />
            <span className="text-gray-900">untuk Bisnis Anda</span>
          </h1>

          {/* Description */}
          <p
            className={clsx(
              "text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10 transition-all duration-500 delay-150",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Performa tinggi dengan <span className="text-gray-900 font-semibold">uptime 99.8%</span> dan support responsif 24/7.
            Infrastruktur modern yang dirancang untuk bisnis, developer, dan kreator digital.
          </p>

          {/* CTA Buttons */}
          <div
            className={clsx(
              "flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-500 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Button
              asChild
              size="lg"
              className="group text-base h-12 px-8 rounded-lg font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              <a href="#pricing">
                Mulai Sekarang
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base h-12 px-8 rounded-lg font-semibold border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-gray-700"
            >
              <a href="https://stats.uptimerobot.com/z9kCx5qEsD">
                Stats Server
                <Play className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Features Grid */}
          <div
            className={clsx(
              "grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl transition-all duration-500 delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {/* Feature Card 1 */}
            <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-200 hover:shadow-md transition-all duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">99.8% Uptime</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Server stabil dengan performa maksimal</p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-200 hover:shadow-md transition-all duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Support 24/7</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Tim support siap membantu kapanpun</p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-200 hover:shadow-md transition-all duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Region</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Server Indonesia & USA tersedia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>
    </>
  );
};

export default Hero;
