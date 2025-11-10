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
        className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-blue-500/5 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient Orbs - Blue Theme */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center max-w-5xl">
          {/* Badge */}
          <div
            className={clsx(
              "inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-500/10 backdrop-blur-sm border border-blue-500/20 px-5 py-2.5 rounded-full text-sm font-medium text-foreground mb-8 shadow-lg transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent font-semibold">
              Infrastruktur Cloud Handal & Terpercaya
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={clsx(
              "text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <span className="text-foreground">Solusi </span>
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              VPS & RDP Premium
            </span>
            <br />
            <span className="text-foreground">untuk Bisnis Anda</span>
          </h1>

          {/* Description */}
          <p
            className={clsx(
              "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Performa tinggi dengan <span className="text-foreground font-semibold">uptime 99.8%</span> dan support responsif 24/7.
            Infrastruktur modern yang dirancang untuk bisnis, developer, dan kreator digital.
          </p>

          {/* CTA Buttons */}
          <div
            className={clsx(
              "flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Button
              asChild
              size="lg"
              className="group text-lg h-14 px-10 rounded-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
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
              className="text-lg h-14 px-10 rounded-2xl font-semibold border-2 border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <a href="#services">
                Lihat Fitur
                <Play className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Features Grid */}
          <div
            className={clsx(
              "grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl transition-all duration-700 delay-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {/* Feature Card 1 */}
            <div className="group relative bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">99.8% Uptime</h3>
                <p className="text-sm text-muted-foreground">Server stabil dengan performa maksimal</p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Support 24/7</h3>
                <p className="text-sm text-muted-foreground">Tim support siap membantu kapanpun</p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Multi-Region</h3>
                <p className="text-sm text-muted-foreground">Server Indonesia & USA tersedia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Hero;
