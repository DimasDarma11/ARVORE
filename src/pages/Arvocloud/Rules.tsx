import React from "react";
import { ShieldAlert, Ban, Server, Info } from "lucide-react";

const Rules = () => {
  const rules = [
    {
      icon: Ban,
      title: "Dilarang Menggunakan untuk Aktivitas Ilegal",
      text: "Termasuk namun tidak terbatas pada aktivitas seperti penipuan, carding, phishing, penyebaran malware, atau tindakan yang melanggar hukum negara mana pun.",
    },
    {
      icon: Server,
      title: "Larangan DDoS, Spam, dan Abuse",
      text: "Penggunaan server untuk serangan DDoS, pengiriman email massal (spam), bot abuse, atau scanning port tidak diperbolehkan dan akan langsung ditangguhkan tanpa refund.",
    },
    {
      icon: Info,
      title: "Tanggung Jawab Pengguna",
      text: "Pengguna bertanggung jawab penuh atas keamanan server masing-masing, termasuk data, aplikasi, dan akses login. ARVOCLOUD tidak bertanggung jawab atas kehilangan data akibat kelalaian pengguna.",
    },
    {
      icon: ShieldAlert,
      title: "Kebijakan Suspend / Terminate",
      text: "Kami berhak menonaktifkan layanan tanpa pemberitahuan terlebih dahulu jika terdeteksi adanya aktivitas berisiko tinggi atau pelanggaran berat terhadap aturan pemakaian ini.",
    },
  ];

  return (
    <section id="rules" className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 animate-in fade-in duration-500">
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-full bg-card shadow-md border border-border">
              <ShieldAlert className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
            Aturan Pemakaian
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Dengan menggunakan layanan <strong className="text-foreground">ARVOCLOUD</strong>, Anda setuju
            untuk mematuhi seluruh ketentuan berikut demi menjaga keamanan dan
            stabilitas layanan bersama.
          </p>
        </div>

        {/* Rules */}
        <div className="bg-card rounded-3xl border border-border shadow-sm p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
          {rules.map((rule, i) => (
            <div
              key={i}
              className="flex items-start space-x-4 border-b border-border pb-6 last:border-0 last:pb-0 animate-in fade-in slide-in-from-left-4 duration-300"
              style={{ animationDelay: `${300 + i * 100}ms` }}
            >
              <div className="flex-shrink-0 mt-1">
                <rule.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-lg mb-2">
                  {rule.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{rule.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground text-sm animate-in fade-in duration-500" style={{ animationDelay: '700ms' }}>
          <p>
            Dengan melanjutkan penggunaan layanan, Anda dianggap telah membaca
            dan menyetujui seluruh{" "}
            <span className="font-medium text-foreground">
              Aturan Pemakaian ARVOCLOUD
            </span>.
          </p>
          <p className="mt-2">
            Terakhir diperbarui:{" "}
            <span className="font-medium text-foreground">
              5 Oktober 2025
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Rules;
