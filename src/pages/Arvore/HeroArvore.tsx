import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroArvore() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ARVORE
      </motion.h1>

      <motion.p
        className="text-gray-400 text-lg max-w-2xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Ekosistem brand inovatif yang membangun masa depan digital, teknologi, dan kreativitas.  
        Pilih sub-brand di bawah untuk mengenal lebih jauh.
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Link
          to="/arvocloud"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform duration-200 font-medium"
        >
          ArvoCloud
        </Link>
        <Link
          to="/arvotech"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:scale-105 transition-transform duration-200 font-medium"
        >
          ArvoTech
        </Link>
        <Link
          to="/arvoagro"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-lime-600 hover:scale-105 transition-transform duration-200 font-medium"
        >
          ArvoAgro
        </Link>
        <Link
          to="/arvovisual"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:scale-105 transition-transform duration-200 font-medium"
        >
          ArvoVisual
        </Link>
      </motion.div>
    </section>
  );
}
