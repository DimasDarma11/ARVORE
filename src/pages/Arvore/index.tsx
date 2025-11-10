import { motion } from "framer-motion";

// BrandCard Component
type BrandCardProps = {
  name: string;
  desc: string;
  path: string;
};

const BrandCard = ({ name, desc, path }: BrandCardProps) => (
  <a
    href={path}
    className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-emerald-50 transition-all duration-300 rounded-3xl shadow-xl hover:shadow-2xl p-8 border-2 border-emerald-100 hover:border-emerald-300 overflow-hidden block"
  >
    {/* Accent Corner */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sky-200 to-transparent opacity-50 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500"></div>
    
    <div className="relative z-10">
      <h2 className="text-2xl font-bold mb-3 text-slate-800 group-hover:text-emerald-700 transition-colors">{name}</h2>
      <p className="text-slate-600 text-base leading-relaxed">{desc}</p>
    </div>
    
    {/* Hover Arrow */}
    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </a>
);

export default function HeroArvore() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 min-h-screen relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Header */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <h1 className="text-7xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-600">
          ARVORE
        </h1>
        <div className="h-2 w-32 mx-auto bg-gradient-to-r from-sky-500 to-sky-500 rounded-full"></div>
      </motion.div>

      {/* Hero Description */}
      <motion.p
        className="relative z-10 text-slate-700 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Ekosistem brand inovatif yang membangun masa depan digital, teknologi, dan kreativitas.
        <span className="block mt-3 text-lg text-slate-600">Pilih sub-brand di bawah untuk mengenal lebih jauh.</span>
      </motion.p>

      {/* Brand Cards Section */}
      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <BrandCard
          name="ArvoCloud"
          desc="Solusi hosting dengan VPS, RDP, dan Baremetal berkualitas tinggi untuk performa maksimal dan uptime 99.8%."
          path="/arvocloud"
        />
        <BrandCard
          name="ArvoTech"
          desc="Pengembangan bot, website, dan aplikasi custom yang dirancang untuk memenuhi kebutuhan teknologi bisnis Anda."
          path="/arvotech"
        />
        <BrandCard
          name="ArvoAgro"
          desc="Distributor kelapa antar pulau dengan pengiriman cepat dan produk berkualitas tinggi untuk keperluan industri."
          path="/arvoagro"
        />
        <BrandCard
          name="ArvoVisual"
          desc="Layanan desain grafis dan branding profesional, termasuk desain logo, visual marketing, dan AutoCAD."
          path="/arvovisual"
        />
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mx-auto mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 text-center">
          <div className="text-4xl font-black text-sky-600 mb-2">4</div>
          <div className="text-sm text-slate-600 font-medium">Sub-Brand</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 text-center">
          <div className="text-4xl font-black text-sky-600 mb-2">50+</div>
          <div className="text-sm text-slate-600 font-medium">Proyek Selesai</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 text-center">
          <div className="text-4xl font-black text-sky-600 mb-2">50+</div>
          <div className="text-sm text-slate-600 font-medium">Klien Puas</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-sky-200 text-center">
          <div className="text-4xl font-black text-sky-600 mb-2">24/7</div>
          <div className="text-sm text-slate-600 font-medium">Support</div>
        </div>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        className="relative z-10 flex flex-wrap items-center justify-center gap-8 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div className="flex items-center gap-2 text-slate-600">
          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Terpercaya</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium">Kualitas Terbaik</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Cepat & Efisien</span>
        </div>
      </motion.div>
    </section>
  );
}



