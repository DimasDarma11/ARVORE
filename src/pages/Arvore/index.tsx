import { motion } from "framer-motion";

// BrandCard Component
type BrandCardProps = {
  name: string;
  desc: string;
  path: string;
  index: number;
};

const BrandCard = ({ name, desc, path, index }: BrandCardProps) => {
  return (
    <motion.a
      href={path}
      className="group relative bg-white/80 backdrop-blur-sm transition-all duration-500 rounded-xl p-6 md:p-8 border-2 border-slate-200/60 hover:border-blue-500 overflow-hidden block shadow-sm hover:shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -8 }}
    >
      {/* Blue accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      <div className="relative">
        {/* Number badge */}
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          0{index + 1}
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
          {desc}
        </p>
        
        {/* Arrow indicator */}
        <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
          <span>Lihat Detail</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
};

export default function HeroArvore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative">
      
      {/* Clean Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-20 md:pt-32 pb-16 md:pb-20">
        
        {/* Minimal Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium tracking-wide">
              <div className="w-8 h-[1px] bg-blue-600"></div>
              DIGITAL EXCELLENCE
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-slate-900 tracking-tight">
            ARVORE
          </h1>
          
          <p className="text-slate-600 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light px-4">
            Menghadirkan solusi digital yang terintegrasi untuk memenuhi kebutuhan teknologi dan kreativitas masa depan.
          </p>
        </motion.div>

        {/* Clean Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
          <BrandCard
            name="ArvoCloud"
            desc="Solusi server VPS, RDP, dan Baremetal berkualitas tinggi untuk performa maksimal dan harga terjangkau."
            path="/arvocloud"
            index={0}
          />
          <BrandCard
            name="ArvoTech"
            desc="Pengembangan bot, website, dan aplikasi custom yang dirancang untuk memenuhi kebutuhan teknologi bisnis Anda."
            path="/arvotech"
            index={1}
          />
          <BrandCard
            name="ArvoAgro"
            desc="Distributor kelapa antar pulau dengan pengiriman cepat dan produk berkualitas tinggi untuk keperluan industri."
            path="/arvoagro"
            index={2}
          />
          <BrandCard
            name="ArvoVisual"
            desc="Layanan desain grafis dan branding profesional, termasuk desain logo, visual marketing, dan AutoCAD."
            path="/arvovisual"
            index={3}
          />
        </div>

        {/* Modern Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { value: "4", label: "Sub-Brand", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
            { value: "15+", label: "Proyek Selesai", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { value: "50+", label: "Klien Puas", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
            { value: "24/7", label: "Support", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="group relative bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
              whileHover={{ y: -4 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Clean Trust Line */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-16 text-slate-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span>Terpercaya</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span>Berkualitas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span>Profesional</span>
          </div>
        </motion.div>

      </section>
    </div>
  );
}
