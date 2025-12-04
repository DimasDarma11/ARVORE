import React, { useState, useEffect } from "react";
import { ArrowRight, Zap, Clock, Globe, Shield, TrendingUp, Server, CheckCircle2 } from "lucide-react";

// ================= BACKGROUND GRID =================
// Memberikan nuansa teknis/server pada background
const GridPattern = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div 
      className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
    />
  </div>
);

// ================= FLOATING CARD =================
const FloatingCard = ({ delay = 0, children, className = "" }: { delay?: number; children: React.ReactNode; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`group relative backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// ================= HERO SECTION =================
const Hero: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      {/* Background Decor */}
      <GridPattern />
      
      {/* Ambient Blue Glow Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Badge Layanan */}
          <div
            className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ease-out ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <div className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow cursor-default">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold text-blue-700 dark:text-blue-300 tracking-wide">
                Layanan Aktif 24/7
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight transition-all duration-700 ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-slate-900 dark:text-white drop-shadow-sm">
              VPS & RDP
            </span>
            {/* Improved Gradient Text */}
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient py-2">
              Mulai 50rb
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-slate-500 dark:text-slate-400 mt-2">
              Performa Maksimal, Harga Minimal
            </span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12 transition-all duration-700 delay-100 ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Nikmati pengalaman server dengan uptime <span className="text-blue-600 dark:text-blue-400 font-bold">99.9%</span>, akses <span className="text-blue-600 dark:text-blue-400 font-bold">Full Admin</span>, dan setup instan. Solusi terbaik untuk kebutuhan hosting, bot, dan remote work Anda.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 transition-all duration-700 delay-200 ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="#pricing"
              className="group relative inline-flex items-center justify-center h-14 px-8 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105"
            >
              Lihat Paket Harga
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://stats.uptimerobot.com/z9kCx5qEsD"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center h-14 px-8 text-lg font-bold text-slate-700 dark:text-slate-200 transition-all duration-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <TrendingUp className="mr-2 w-5 h-5 text-green-500" />
              Cek Status Server
            </a>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            {[
              {
                icon: Zap,
                title: "Koneksi 1Gbps",
                desc: "Kecepatan internet super cepat tanpa lag.",
                delay: 0.3,
              },
              {
                icon: Shield,
                title: "Garansi Full",
                desc: "Jaminan uang kembali jika server bermasalah.",
                delay: 0.4,
              },
              {
                icon: Server,
                title: "Setup Instan",
                desc: "Server aktif otomatis dalam hitungan menit.",
                delay: 0.5,
              },
            ].map((feature, i) => (
              <FloatingCard key={i} delay={feature.delay}>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </FloatingCard>
            ))}
          </div>

          {/* Social Proof Minimalist */}
          <div
            className={`flex flex-col items-center justify-center gap-4 transition-all duration-700 delay-500 ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Dipercaya oleh pebisnis & developer
            </p>
            <div className="flex -space-x-3">
               {/* Avatar Placeholders with Blue tints */}
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-blue-${(i+1)*100} dark:bg-blue-${(i+2)*200} flex items-center justify-center overflow-hidden`}>
                   <div className="text-[10px] font-bold text-blue-900 opacity-50">U{i+1}</div>
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">50+</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
               <div className="flex">
                {[1,2,3,4,5].map(s => <div key={s} className="text-yellow-400">★</div>)}
               </div>
               <span className="font-bold text-slate-900 dark:text-white ml-1">4.9/5.0</span> Rating Pelanggan
            </div>
          </div>

        </div>
      </div>

      {/* Global Style for Animations */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient-shift 6s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
