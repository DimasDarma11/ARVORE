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
    </section>
  );
}

