import React from "react";
import { Shield, Headphones, Globe, Users, Clock, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      desc: "Perlindungan DDoS, firewall aktif, dan sistem monitoring 24/7 untuk menjaga data Anda tetap aman.",
    },
    {
      icon: Headphones,
      title: "Dukungan 24/7",
      desc: "Tim support kami selalu siap membantu, kapan pun Anda membutuhkan bantuan atau konsultasi.",
    },
    {
      icon: Globe,
      title: "Jaringan Global",
      desc: "Lokasi server strategis di berbagai wilayah memastikan koneksi cepat dan stabil di seluruh dunia.",
    },
  ];

  const stats = [
    { icon: Users, number: "50+", label: "Pelanggan Aktif" },
    { icon: Clock, number: "99.8%", label: "Uptime Terjamin" },
    { icon: Award, number: "1+", label: "Tahun Pengalaman" },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16 px-6 animate-in fade-in duration-500">
        <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
          Mengapa{" "}
          <span className="text-primary">ArvoCloud</span>?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Kami menghadirkan infrastruktur cloud berperforma tinggi yang dirancang
          untuk kecepatan, keamanan, dan kestabilan maksimal.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mb-16">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-5">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2 text-center">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm text-center leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto px-6">
        {stats.map(({ icon: Icon, number, label }, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-card border border-border text-center shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in zoom-in-95"
            style={{ animationDelay: `${300 + i * 100}ms` }}
          >
            <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-3xl font-semibold text-foreground">{number}</div>
            <div className="text-muted-foreground text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
