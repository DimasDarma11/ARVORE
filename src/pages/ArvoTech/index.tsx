import { motion } from "framer-motion";

export default function ArvoTech() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative overflow-hidden flex items-center justify-center px-6">
      
      {/* Subtle background element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        
        {/* Back Button */}
        <motion.a
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-300 mb-12 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-blue-600 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-sm font-medium">Kembali</span>
        </motion.a>

        {/* Logo/Brand */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-4 tracking-tight">
            ArvoTech
          </h1>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
            <span className="text-sm font-medium text-blue-600">Coming Soon</span>
          </div>
          <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">
            Kami sedang mempersiapkan sesuatu yang luar biasa untuk Anda
          </p>
        </motion.div>

        {/* Animated dots */}
        <motion.div
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div
            className="w-2 h-2 bg-blue-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-2 h-2 bg-blue-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-blue-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
        </motion.div>

      </div>
    </main>
  );
}
