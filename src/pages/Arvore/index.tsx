import React, { useState } from "react";

// BrandCard Component
type BrandCardProps = {
  name: string;
  desc: string;
  path: string;
  index: number;
};

const BrandCard = ({ name, desc, path, index }: BrandCardProps) => {
  return (
    <a
      href={path}
      className="group relative bg-white backdrop-blur-sm transition-all duration-500 rounded-xl p-6 md:p-8 border-2 border-slate-200 hover:border-blue-500 overflow-hidden block shadow-sm hover:shadow-xl animate-fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      <div className="relative">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          0{index + 1}
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
          {desc}
        </p>
        
        <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
          <span>Lihat Detail</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default function HeroArvore() {
  const [activeSection, setActiveSection] = useState('home');
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative">
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }
        `}
      </style>
      
      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-20 md:pt-32 pb-16 md:pb-20">
        
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium tracking-wide">
              <div className="w-8 h-[1px] bg-blue-600"></div>
              DIGITAL EXCELLENCE
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-slate-900 tracking-tight">
            ARVORE
          </h1>
          
          <p className="text-slate-600 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light px-4 mb-8">
            Grup perusahaan teknologi dan bisnis yang menghadirkan solusi digital terintegrasi untuk masa depan.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveSection('about')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Tentang Kami
            </button>
            <button 
              onClick={() => setActiveSection('brands')}
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl font-semibold transition-all duration-300"
            >
              Lihat Brand
            </button>
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'home' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {[
            { value: "4", label: "Sub-Brand", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
            { value: "15+", label: "Proyek Selesai", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { value: "50+", label: "Klien Puas", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
            { value: "24/7", label: "Support", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" }
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-16 text-slate-600 text-sm animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
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
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span>Inovatif</span>
          </div>
        </div>
          </>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <div className="animate-fade-in-up">
            <button 
              onClick={() => setActiveSection('home')}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-300 mb-8"
            >
              <div className="w-10 h-10 rounded-xl border border-slate-200 hover:border-blue-600 flex items-center justify-center transition-all duration-300 hover:bg-blue-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-sm font-medium">Kembali</span>
            </button>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Tentang ARVORE</h2>
                <div className="w-20 h-1.5 bg-blue-600 mx-auto mb-6"></div>
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  ARVORE adalah grup perusahaan yang berfokus pada transformasi digital dan solusi bisnis inovatif. Kami menggabungkan teknologi, kreativitas, dan profesionalisme untuk memberikan nilai terbaik kepada klien.
                </p>
              </div>

              {/* Company History */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Perjalanan Kami
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Dimulai dari visi untuk menyediakan solusi teknologi yang terjangkau namun berkualitas tinggi, ARVORE telah berkembang menjadi grup perusahaan dengan empat divisi utama yang melayani berbagai kebutuhan bisnis. Dari infrastruktur cloud hingga pengembangan aplikasi, dari distribusi agribisnis hingga layanan desain visual, kami terus berinovasi untuk memberikan yang terbaik.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <div className="text-4xl font-bold text-blue-600 mb-2">2023</div>
                    <p className="text-slate-700 font-semibold mb-2">Tahun Berdiri</p>
                    <p className="text-slate-600 text-sm">Memulai perjalanan dengan komitmen kuat untuk memberikan solusi digital terbaik</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <div className="text-4xl font-bold text-green-600 mb-2">4</div>
                    <p className="text-slate-700 font-semibold mb-2">Divisi Bisnis</p>
                    <p className="text-slate-600 text-sm">Melayani berbagai sektor dari teknologi hingga agribisnis dan desain</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Visi Kami</h3>
                  <p className="text-slate-600 leading-relaxed">Menjadi grup perusahaan teknologi terdepan yang memberikan solusi inovatif dan terpercaya untuk transformasi digital bisnis di Indonesia dan regional.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Misi Kami</h3>
                  <p className="text-slate-600 leading-relaxed">Memberikan layanan berkualitas tinggi dengan harga kompetitif, didukung oleh tim profesional dan support responsif untuk kepuasan pelanggan maksimal.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Nilai Kami</h3>
                  <p className="text-slate-600 leading-relaxed">Integritas, inovasi berkelanjutan, dan komitmen penuh terhadap kepuasan pelanggan adalah fondasi dalam setiap layanan yang kami tawarkan.</p>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Mengapa Memilih ARVORE?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Teknologi Terkini</h4>
                      <p className="text-slate-600 text-sm">Menggunakan teknologi modern dan terbukti untuk hasil optimal</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Harga Kompetitif</h4>
                      <p className="text-slate-600 text-sm">Layanan berkualitas dengan harga yang terjangkau untuk semua skala bisnis</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Tim Profesional</h4>
                      <p className="text-slate-600 text-sm">Didukung oleh tim berpengalaman dan terlatih di bidangnya</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Support 24/7</h4>
                      <p className="text-slate-600 text-sm">Layanan dukungan pelanggan yang siap membantu kapan saja</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Brands Section */}
        {activeSection === 'brands' && (
          <div className="animate-fade-in-up">
            <button 
              onClick={() => setActiveSection('home')}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-300 mb-8"
            >
              <div className="w-10 h-10 rounded-xl border border-slate-200 hover:border-blue-600 flex items-center justify-center transition-all duration-300 hover:bg-blue-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-sm font-medium">Kembali</span>
            </button>

            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Brand Kami</h2>
              <div className="w-20 h-1.5 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">Empat divisi unggulan yang saling melengkapi untuk memberikan solusi bisnis komprehensif</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
        </div>
        )}

        {/* Contact Modal */}
        {showContact && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-8 md:p-12 relative">
              <button 
                onClick={() => setShowContact(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hubungi Kami</h2>
              <p className="text-slate-600 mb-8">Kami siap membantu mewujudkan kebutuhan digital bisnis Anda</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">info@arvore.com</p>
                    <p className="text-slate-600">support@arvore.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">WhatsApp</h3>
                    <p className="text-slate-600">+62 812-3456-7890</p>
                    <p className="text-sm text-green-600 font-medium">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Alamat</h3>
                    <p className="text-slate-600">Jakarta, Indonesia</p>
                    <p className="text-sm text-slate-500">Head Office & Operations</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <a href="#" className="flex items-center justify-center gap-2 p-3 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300 group">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-center gap-2 p-3 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300 group">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-center gap-2 p-3 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300 group">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section - Only show on home */}
        {activeSection === 'home' && (
          <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="bg-slate-900 rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Siap Berkolaborasi?</h2>
              <p className="text-slate-300 text-lg mb-8">Hubungi kami untuk diskusi lebih lanjut tentang kebutuhan bisnis Anda</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setShowContact(true)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Hubungi Kami
                </button>
                <button 
                  onClick={() => setActiveSection('brands')}
                  className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-xl transition-all duration-300"
                >
                  Eksplor Brand
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges - Only show on home */}
        {activeSection === 'home' && (
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-16 text-slate-600 text-sm animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
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
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span>Inovatif</span>
          </div>
        </div>
        )}

      </section>
    </div>
  );
}
