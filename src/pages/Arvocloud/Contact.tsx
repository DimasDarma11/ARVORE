import React from "react";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import { Button } from "./ui/button";

const Contact = () => {
  const contacts = [
    {
      icon: Mail,
      title: "Email",
      desc: "Respons cepat dalam 1–3 jam kerja",
      value: "arvocloudserver@gmail.com",
      link: "mailto:arvocloudserver@gmail.com",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      desc: "Chat langsung dengan tim kami",
      value: "Buka WhatsApp",
      link: "https://wa.me/6283197183724?text=Halo,%20saya%20ingin%20bertanya%20tentang%20layanan%20ARVOCLOUD",
    },
    {
      icon: Clock,
      title: "Dukungan 24/7",
      desc: "Kami siap membantu kapan pun dibutuhkan.",
      value: "Online Sekarang",
      link: null,
    },
    {
      icon: MapPin,
      title: "Lokasi",
      desc: "Global Data Center Network",
      value: "Indonesia • United States",
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-28 bg-muted/50 border-t border-border">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in duration-500">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Hubungi <span className="text-primary">Tim Kami</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tim support ARVOCLOUD siap membantu Anda — cepat, ramah, dan profesional.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contacts.map(({ icon: Icon, title, desc, value, link }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm mb-2">{desc}</p>
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline transition-all"
                >
                  {value}
                </a>
              ) : (
                <span className="text-foreground font-medium">{value}</span>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20 animate-in fade-in duration-500" style={{ animationDelay: '400ms' }}>
          <h3 className="text-2xl font-semibold text-foreground mb-3">
            Butuh bantuan lebih lanjut?
          </h3>
          <p className="text-muted-foreground mb-6">
            Hubungi kami melalui WhatsApp atau email — tim kami siap 24 jam penuh.
          </p>
          <Button asChild size="lg" className="rounded-xl">
            <a
              href="https://wa.me/6283197183724"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hubungi Sekarang
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
