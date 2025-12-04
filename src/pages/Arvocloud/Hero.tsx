import React, { useState, useEffect } from "react";
import { ArrowRight, Zap, Shield, Server, TrendingUp } from "lucide-react";

// ================= BACKGROUND GRID (Dark Mode Adjusted) =================
const GridPattern = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    {/* Grid lines dibuat lebih subtle untuk background gelap */}
    <div 
      className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
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
      className={`group relative backdrop-blur-md bg-slate-900/50 border border-slate-800 rounded-2xl transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background Elements */}
      <GridPattern />
      
      {/* Top Glow (Blue) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
      
      {/* Bottom Glow (Subtle) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Badge Layanan */}
          <div
            className={`inline-flex items-center justify-center mb-8 transition-all duration-700 ease-out ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <div className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-900/50 shadow-lg shadow-blue-900/20 cursor-default hover:border-blue-500/50 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-200 tracking-wide">
                Network Stabil & Low Latency
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight transition-all duration-700 ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-white drop-shadow-2xl">
              VPS & RDP
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient py-1">
              High Performance
            </span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 transition-all duration-700 delay-100 ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Server premium mulai <span className="text-white font-semibold">50rb/bulan</span>. 
            Uptime 99.9%, garansi penuh, dan siap pakai dalam hitungan menit.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-700 delay-200 ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="#pricing"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 text-base font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
            >
              Lihat Paket
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://stats.uptimerobot.com/z9kCx5qEsD"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 text-base font-bold text-slate-300 transition-all duration-200 bg-slate-900 border border-slate-700 rounded-xl hover:border-blue-500/50 hover:text-white hover:bg-slate-800"
            >
              <TrendingUp className="mr-2 w-4 h-4 text-green-500 group-hover:animate-pulse" />
              Cek Server Status
            </a>
          </div>

          {/* Feature Cards Grid (Revisi: Lebih Rapat & Compact) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
            {[
              {
                icon: Zap,
                title: "1Gbps Port",
                desc: "Koneksi anti-lelet stabil.",
                delay: 0.3,
              },
              {
                icon: Shield,
                title: "Full Garansi",
                desc: "Ganti baru jika bermasalah.",
                delay: 0.4,
              },
              {
                icon: Server,
                title: "Auto Setup",
                desc: "Aktif instan otomatis.",
                delay: 0.5,
              },
            ].map((feature, i) => (
              // Padding dikurangi jadi p-5
              <FloatingCard key={i} delay={feature.delay} className="p-5">
                <div className="flex flex-col items-center text-center gap-3">
                  {/* Icon Container diperkecil sedikit */}
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                    <feature.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  
                  {/* Text Container lebih rapat */}
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-snug">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>

          {/* Social Proof (Dark Mode Optimized) */}
          <div
            className={`flex flex-col items-center justify-center gap-3 transition-all duration-700 delay-500 ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Trusted by 50+ Clients
            </p>
            <div className="flex items-center gap-2 p-2 px-4 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
               <div className="flex -space-x-2">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className={`w-6 h-6 rounded-full border border-slate-900 bg-gradient-to-br from-blue-400 to-blue-600`} />
                ))}
               </div>
               <div className="h-4 w-px bg-slate-700 mx-1"></div>
               <div className="flex items-center gap-1">
                 <span className="text-yellow-400 text-sm">★★★★★</span>
                 <span className="text-sm font-bold text-white">4.9/5</span>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient-shift 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
