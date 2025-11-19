import { motion } from "framer-motion";
import { useState } from "react";

// BrandCard Component
type BrandCardProps = {
  name: string;
  desc: string;
  path: string;
  index: number;
};

const BrandCard = ({ name, desc, path, index }: BrandCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={path}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white transition-all duration-700 rounded-2xl p-10 border border-slate-100 hover:border-blue-200 overflow-hidden block hover:shadow-2xl hover:shadow-blue-500/5"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
    >
      {/* Subtle gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:to-transparent transition-all duration-700`}></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold mb-3 text-slate-900 tracking-tight">
          {name}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {desc}
        </p>
      </div>
      
      {/* Minimal arrow */}
      <div className={`absolute bottom-10 right-10 transform transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        
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
          
          <h1 className="text-7xl md:text-8xl font-bold mb-6 text-slate-900 tracking-tight">
            ARVORE
          </h1>
          
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Menghadirkan solusi digital yang terintegrasi untuk memenuhi kebutuhan teknologi dan kreativitas masa depan.
          </p>
        </motion.div>

        {/* Clean Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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

        {/* Minimal Stats Bar */}
        <motion.div
          className="flex items-center justify-center gap-12 py-12 border-y border-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-900 mb-1">4</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Brands</div>
          </div>
          <div className="w-[1px] h-12 bg-slate-200"></div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-900 mb-1">50+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Projects</div>
          </div>
          <div className="w-[1px] h-12 bg-slate-200"></div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-900 mb-1">50+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Clients</div>
          </div>
          <div className="w-[1px] h-12 bg-slate-200"></div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-slate-900 mb-1">24/7</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Support</div>
          </div>
        </motion.div>

        {/* Clean Trust Line */}
        <motion.div
          className="flex items-center justify-center gap-8 mt-16 text-slate-600 text-sm"
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



