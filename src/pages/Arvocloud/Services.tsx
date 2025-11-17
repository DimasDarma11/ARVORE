import React, { useState, useEffect, useRef } from "react";
import { Server, Monitor, Cpu, Settings } from "lucide-react";

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const services = [
    {
      icon: Server,
      title: "Server VPS",
      desc: "Server virtual cepat dan stabil dengan akses penuh root - cocok untuk bisnis dan developer.",
      gradient: "from-blue-500/20 to-blue-600/5",
      borderColor: "border-blue-500/20 hover:border-blue-500/40",
      iconBg: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Monitor,
      title: "Server RDP",
      desc: "Akses desktop Windows jarak jauh dengan performa tinggi dan koneksi stabil untuk kerja profesional.",
      gradient: "from-blue-400/20 to-blue-500/5",
      borderColor: "border-blue-400/20 hover:border-blue-400/40",
      iconBg: "from-blue-400/20 to-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: Cpu,
      title: "Bare Metal",
      desc: "Server fisik dedicated untuk performa maksimal dan kendali penuh atas hardware.",
      gradient: "from-blue-600/20 to-blue-700/5",
      borderColor: "border-blue-600/20 hover:border-blue-600/40",
      iconBg: "from-blue-600/20 to-blue-700/10",
      iconColor: "text-blue-600",
    },
    {
      icon: Settings,
      title: "Custom Spesifikasi",
      desc: "Kustomisasi spesifikasi server sesuai kebutuhan proyek Anda, fleksibel dan efisien.",
      gradient: "from-blue-500/20 to-blue-400/5",
      borderColor: "border-blue-500/20 hover:border-blue-500/40",
      iconBg: "from-blue-500/20 to-blue-400/10",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-background via-background to-blue-950/5"
    >
      {/* Ambient decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative container mx-auto px-6 text-center">
        {/* Header */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-blue-400/10 backdrop-blur-sm border border-blue-500/20 px-4 py-2 rounded-full text-sm font-medium text-foreground mb-6">
            <Server className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500 font-semibold">Layanan Kami</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
            Solusi Virtual Server Profesional
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
            Layanan VPS dan RDP yang cepat, stabil, dan dapat diandalkan untuk berbagai kebutuhan Anda.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, desc, gradient, borderColor, iconBg, iconColor }, i) => (
            <div
              key={i}
              className={`group relative p-8 rounded-2xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border ${borderColor} hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${iconBg} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <Icon className={`h-8 w-8 ${iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-500 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {desc}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
