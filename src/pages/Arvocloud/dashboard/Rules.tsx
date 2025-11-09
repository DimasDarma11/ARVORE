import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Ban, Server, Info } from "lucide-react";

const Rules = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  const rules = [
    {
      icon: <Ban className="h-6 w-6 text-gray-800 mt-1" />,
      title: "Dilarang Menggunakan untuk Aktivitas Ilegal",
      text: "Termasuk namun tidak terbatas pada aktivitas seperti penipuan, carding, phishing, penyebaran malware, atau tindakan yang melanggar hukum negara mana pun.",
    },
    {
      icon: <Server className="h-6 w-6 text-gray-800 mt-1" />,
      title: "Larangan DDoS, Spam, dan Abuse",
      text: "Penggunaan server untuk serangan DDoS, pengiriman email massal (spam), bot abuse, atau scanning port tidak diperbolehkan dan akan langsung ditangguhkan tanpa refund.",
    },
    {
      icon: <Info className="h-6 w-6 text-gray-800 mt-1" />,
      title: "Tanggung Jawab Pengguna",
      text: "Pengguna bertanggung jawab penuh atas keamanan server masing-masing, termasuk data, aplikasi, dan akses login. ARVOCLOUD tidak bertanggung jawab atas kehilangan data akibat kelalaian pengguna.",
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-gray-800 mt-1" />,
      title: "Kebijakan Suspend / Terminate",
      text: "Kami berhak menonaktifkan layanan tanpa pemberitahuan terlebih dahulu jika terdeteksi adanya aktivitas berisiko tinggi atau pelanggaran berat terhadap aturan pemakaian ini.",
    },
  ];

  return (
    <section className="min-h-screen bg-neutral-50 py-24 px-6">
      <motion.div
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="p-4 rounded-full bg-white shadow-md ring-1 ring-gray-100">
              <ShieldAlert className="h-8 w-8 text-gray-800" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Aturan Pemakaian
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Dengan menggunakan layanan <strong>ARVOCLOUD</strong>, Anda setuju
            untuk mematuhi seluruh ketentuan berikut demi menjaga keamanan dan
            stabilitas layanan bersama.
          </p>
        </motion.div>

        {/* Rules */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-sm p-10 space-y-8">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-start space-x-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0"
            >
              <div className="flex-shrink-0">{rule.icon}</div>
              <div>
                <h3 className="font-medium text-gray-900 text-lg mb-2">
                  {rule.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{rule.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          className="text-center mt-16 text-gray-500 text-sm"
        >
          <p>
            Dengan melanjutkan penggunaan layanan, Anda dianggap telah membaca
            dan menyetujui seluruh{" "}
            <span className="font-medium text-gray-800">
              Aturan Pemakaian ARVOCLOUD
            </span>.
          </p>
          <p className="mt-2">
            Terakhir diperbarui:{" "}
            <span className="font-medium text-gray-800">
              5 Oktober 2025
            </span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Rules;
