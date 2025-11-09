import React from "react";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border text-muted-foreground">
      <div className="container mx-auto px-6 py-12 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="https://i.ibb.co/Xrzm1whv/Arvocloud.jpg"
            alt="ARVOCLOUD Logo"
            className="h-10 w-auto rounded-lg shadow-sm border border-border"
          />
        </div>

        {/* Short Description */}
        <p className="text-sm max-w-md mx-auto mb-8 text-muted-foreground">
          Solusi cloud cepat, aman, dan andal untuk bisnis modern serta kebutuhan server profesional Anda.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-5 mb-8">
          {[
            { icon: <Instagram className="h-5 w-5" />, link: "https://instagram.com/dimazdarmaa" },
            { icon: <Facebook className="h-5 w-5" />, link: "https://facebook.com/jagoanneon44" },
            { icon: <Mail className="h-5 w-5" />, link: "mailto:arvocloudserver@gmail.com" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target={item.link.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="p-3 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
          {[
            { label: "Layanan", href: "#services" },
            { label: "Hubungi Kami", href: "#contact" },
            { label: "Aturan", href: "#rules" },
            { label: "Tentang", href: "#about" },
          ].map(({ label, href }, idx) => (
            <a
              key={idx}
              href={href}
              className="hover:text-foreground transition-colors font-medium"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          © 2025 <span className="text-foreground font-semibold">ARVOCLOUD</span>. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
