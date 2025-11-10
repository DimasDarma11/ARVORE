import React, { useState, Suspense, lazy } from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import Pricing from './Pricing';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

// Lazy-load komponen berat
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));

export default function Arvocloud() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>ARVOCLOUD - VPS & RDP SOLUTIONS</title>
      </Helmet>
      <Header
        onAboutClick={() => setShowAbout(true)}
        onContactClick={() => setShowContact(true)}
      />

      <Hero />
      <Services />

      {/* Divider ringan, tanpa gradient yang berat */}
      <div className="h-px w-full bg-gray-200/20" />

      <Pricing />

      <div className="h-px w-full bg-gray-200/20" />

      {/* Lazy-load About & Contact */}
      <Suspense fallback={null}>
        {showAbout && <About />}
        {showContact && <Contact />}
      </Suspense>

      <Footer />

      {/* Floating WA button: animasi ringan & nonaktif blur untuk mobile */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.a
          href="https://wa.me/6283197183724?text=Halo%20ArvoCloud!"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            flex items-center justify-center w-14 h-14 rounded-full 
            bg-white/80 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300
            backdrop-blur-none md:backdrop-blur-lg
          "
        >
          <MessageCircle className="w-7 h-7 text-green-500" />
        </motion.a>
      </motion.div>
    </div>
  );
}
