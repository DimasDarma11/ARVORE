import React, { useState } from "react";

export default function ArvoTech() {
  const [activeProject, setActiveProject] = useState(null);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const projects = [
    {
      id: 1,
      name: "UBot",
      desc: "Bot automation system",
      detail: "Sistem bot otomatis untuk mengelola tugas berulang dengan AI integration. Mendukung berbagai platform dan dapat dikustomisasi sesuai kebutuhan.",
      tech: ["Python", "Selenium", "API Integration"],
      features: ["Multi-platform support", "Custom scripting", "Scheduled tasks"]
    },
    {
      id: 2,
      name: "Live Chat",
      desc: "Real-time messaging app",
      detail: "Platform chat real-time dengan fitur multimedia dan enkripsi end-to-end. Mendukung group chat, file sharing, dan notifikasi push.",
      tech: ["Socket.io", "Node.js", "React"],
      features: ["Real-time messaging", "File sharing", "End-to-end encryption"]
    },
    {
      id: 3,
      name: "Temporary Email",
      desc: "Disposable email service",
      detail: "Layanan email sementara untuk privasi dan testing dengan API lengkap. Otomatis generate email dan inbox management.",
      tech: ["SMTP", "REST API", "MongoDB"],
      features: ["Auto-generate email", "API access", "Inbox management"]
    }
  ];

  const portfolioProfiles = [
    {
      id: 1,
      projectName: "UBot",
      client: "Tech Startup Indonesia",
      year: "2024",
      duration: "2 bulan",
      category: "Automation & Bot Development",
      challenge: "Client membutuhkan sistem automasi untuk mengelola ratusan akun media sosial secara bersamaan dengan penjadwalan yang kompleks.",
      solution: "Mengembangkan bot multi-platform dengan fitur AI untuk content generation, scheduling, dan analytics. Bot dapat mengelola 100+ akun dengan tingkat keberhasilan 99.9%.",
      results: ["Efisiensi waktu meningkat 400%", "Biaya operasional turun 60%", "Engagement rate naik 250%"],
      testimonial: "ArvoTech memberikan solusi yang sempurna untuk kebutuhan automasi kami. Tim sangat profesional dan responsif.",
      clientName: "Budi Santoso, CEO",
      image: "🤖",
      gallery: ["Dashboard interface", "Automation workflows", "Analytics reports"]
    },
    {
      id: 2,
      projectName: "Live Chat",
      client: "E-Commerce Platform",
      year: "2024",
      duration: "3 bulan",
      category: "Web Application Development",
      challenge: "Platform e-commerce membutuhkan sistem live chat yang dapat menangani ribuan percakapan simultan dengan response time minimal.",
      solution: "Membangun aplikasi chat real-time dengan arsitektur scalable menggunakan Socket.io dan microservices. Dilengkapi dengan AI chatbot untuk respons otomatis dan enkripsi end-to-end.",
      results: ["Menangani 5000+ chat simultan", "Response time < 100ms", "Customer satisfaction 95%"],
      testimonial: "Sistem live chat dari ArvoTech sangat reliable dan mudah diintegrasikan dengan platform kami.",
      clientName: "Sarah Wijaya, Product Manager",
      image: "💬",
      gallery: ["Chat interface", "Admin dashboard", "Mobile responsive design"]
    },
    {
      id: 3,
      projectName: "Temporary Email",
      client: "Digital Security Firm",
      year: "2023",
      duration: "1.5 bulan",
      category: "Web Service & API",
      challenge: "Perusahaan keamanan digital memerlukan layanan temporary email yang dapat di-generate secara otomatis untuk testing dan privacy protection.",
      solution: "Mengembangkan web service dengan REST API yang dapat men-generate temporary email dalam hitungan detik. Dilengkapi dengan inbox management dan auto-delete system.",
      results: ["1000+ email generated/hari", "API uptime 99.95%", "Integration dengan 50+ aplikasi"],
      testimonial: "Layanan temporary email ini sangat membantu tim testing kami. API-nya mudah digunakan dan dokumentasinya lengkap.",
      clientName: "Ahmad Rahman, Security Engineer",
      image: "📧",
      gallery: ["Email generator", "Inbox viewer", "API documentation"]
    }
  ];

  const activePortfolio = portfolioProfiles.find(p => p.id === activeProject);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        .project-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover {
          transform: translateY(-4px);
        }
        `}
      </style>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* Back Button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-300 mb-16 group animate-fade-in-up"
        >
          <div className="w-10 h-10 rounded-xl border border-slate-200 group-hover:border-blue-600 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-sm font-medium">Kembali</span>
        </a>

        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in-up delay-100">
          <div className="inline-block mb-6 px-5 py-2 bg-blue-50 rounded-full border border-blue-100">
            <span className="text-sm font-medium text-blue-600">Professional Coding Services</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold text-slate-900 mb-6 tracking-tight">
            ArvoTech
          </h1>
          
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-8"></div>
          
          <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Penyedia Jasa Coding Profesional untuk Website, Aplikasi, Bot & Solusi Digital Lainnya
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-24 animate-fade-in-up delay-200">
          <div className="text-center">
            <div className="text-5xl font-bold text-slate-900 mb-2">3+</div>
            <div className="text-slate-600">Projects Completed</div>
          </div>
          <div className="w-px h-16 bg-slate-200"></div>
          <div className="text-center">
            <div className="text-5xl font-bold text-slate-900 mb-2">100%</div>
            <div className="text-slate-600">Client Satisfaction</div>
          </div>
          <div className="w-px h-16 bg-slate-200"></div>
          <div className="text-center">
            <div className="text-5xl font-bold text-slate-900 mb-2">24/7</div>
            <div className="text-slate-600">Support Available</div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-28 animate-fade-in-up delay-300">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">Layanan Kami</h2>
          <p className="text-slate-600 text-center mb-12 text-lg">Solusi digital yang kami tawarkan</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-3">Website & Aplikasi</h3>
              <p className="text-slate-600 leading-relaxed mb-4">Pembuatan website dan aplikasi modern dengan teknologi terkini untuk meningkatkan bisnis Anda</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium">React</span>
                <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium">Node.js</span>
                <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium">Next.js</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-3">Bot & Automation</h3>
              <p className="text-slate-600 leading-relaxed mb-4">Solusi bot cerdas dan automasi proses untuk menghemat waktu dan meningkatkan produktivitas</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium">Python</span>
                <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium">Selenium</span>
                <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium">AI</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-3">Solusi Custom</h3>
              <p className="text-slate-600 leading-relaxed mb-4">Pengembangan solusi digital spesifik sesuai kebutuhan unik bisnis Anda</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium">API</span>
                <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium">Integration</span>
                <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium">Custom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-28 animate-fade-in-up delay-400">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-4">Project Portfolio</h2>
          <p className="text-slate-600 text-center mb-12 text-lg">Hasil karya yang telah kami selesaikan</p>
          
          {!showPortfolio ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="project-card bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl cursor-pointer"
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              >
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border-b border-slate-200">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-xl">{project.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-600 mb-4 text-sm">{project.desc}</p>
                  
                  {activeProject === project.id && (
                    <div className="space-y-4 border-t border-slate-200 pt-4 mt-4">
                      <p className="text-slate-700 text-sm leading-relaxed">{project.detail}</p>
                      
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-100">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Key Features</h4>
                        <ul className="space-y-1.5">
                          {project.features.map((feature, i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                              <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <button className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-300">
                    {activeProject === project.id ? 'Tutup Detail' : 'Lihat Detail'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <button 
                  onClick={() => setShowPortfolio(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Kembali ke Grid View
                </button>
              </div>

              {!activeProject ? (
                <div>
                  <p className="text-slate-600 text-lg mb-8 text-center">Pilih project untuk melihat detail portfolio lengkap</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {portfolioProfiles.map((portfolio) => (
                      <div 
                        key={portfolio.id}
                        onClick={() => setActiveProject(portfolio.id)}
                        className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-500 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
                      >
                        <div className="text-5xl mb-4 text-center">{portfolio.image}</div>
                        <h3 className="font-bold text-slate-900 text-xl mb-2 text-center">{portfolio.projectName}</h3>
                        <p className="text-slate-600 text-sm text-center mb-4">{portfolio.category}</p>
                        <div className="text-center">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{portfolio.client}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activePortfolio ? (
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl animate-fade-in-up">
                  {/* Header */}
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-12 text-center relative">
                    <button 
                      onClick={() => setActiveProject(null)}
                      className="absolute top-6 left-6 w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-slate-50 transition-all duration-300"
                    >
                      <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="text-7xl mb-4">{activePortfolio.image}</div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">{activePortfolio.projectName}</h2>
                    <p className="text-slate-600 text-lg">{activePortfolio.category}</p>
                  </div>

                  {/* Content */}
                  <div className="p-10 space-y-8">
                    {/* Project Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-slate-200">
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Client</div>
                        <div className="font-semibold text-slate-900">{activePortfolio.client}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Year</div>
                        <div className="font-semibold text-slate-900">{activePortfolio.year}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Duration</div>
                        <div className="font-semibold text-slate-900">{activePortfolio.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Category</div>
                        <div className="font-semibold text-slate-900 text-sm">{activePortfolio.category}</div>
                      </div>
                    </div>

                    {/* Challenge */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </span>
                        Challenge
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{activePortfolio.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </span>
                        Solution
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{activePortfolio.solution}</p>
                    </div>

                    {/* Results */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        Results
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {activePortfolio.results.map((result, i) => (
                          <div key={i} className="bg-green-50 border border-green-200 p-4 rounded-xl">
                            <div className="text-green-700 font-semibold">{result}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gallery */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Project Gallery</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {activePortfolio.gallery.map((item, i) => (
                          <div key={i} className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border border-slate-200">
                            <span className="text-slate-600 font-medium text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
                      <div className="flex items-start gap-4">
                        <svg className="w-10 h-10 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <div>
                          <p className="text-slate-700 leading-relaxed mb-3 italic">"{activePortfolio.testimonial}"</p>
                          <div className="font-semibold text-slate-900">{activePortfolio.clientName}</div>
                          <div className="text-sm text-slate-600">{activePortfolio.client}</div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-6 border-t border-slate-200">
                      <button 
                        onClick={() => {
                          const currentIndex = portfolioProfiles.findIndex(p => p.id === activeProject);
                          const prevIndex = currentIndex > 0 ? currentIndex - 1 : portfolioProfiles.length - 1;
                          setActiveProject(portfolioProfiles[prevIndex].id);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous Project
                      </button>
                      <button 
                        onClick={() => {
                          const currentIndex = portfolioProfiles.findIndex(p => p.id === activeProject);
                          const nextIndex = currentIndex < portfolioProfiles.length - 1 ? currentIndex + 1 : 0;
                          setActiveProject(portfolioProfiles[nextIndex].id);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all duration-300"
                      >
                        Next Project
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up delay-500">
          <div className="bg-slate-900 max-w-4xl mx-auto p-12 rounded-3xl">
            <h2 className="text-4xl font-bold text-white mb-4">Siap Memulai Project Anda?</h2>
            <p className="text-slate-300 text-lg mb-8">Mari wujudkan ide digital Anda bersama ArvoTech</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                Hubungi Kami
              </button>
              <button 
                onClick={() => setShowPortfolio(true)}
                className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-xl transition-all duration-300"
              >
                Lihat Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
