import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Ekspor konfigurasi Vite
export default defineConfig({
  plugins: [
    // Plugin untuk React menggunakan SWC
    react(),

    // Plugin untuk kompresi Brotli
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),

    // Plugin untuk optimasi gambar
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 80 },
    }),
  ],

  // Optimasi dependensi
  optimizeDeps: {
    include: ['lucide-react', 'framer-motion', 'react', 'react-dom'],
    // Exclude class-variance-authority untuk menghindari konflik selama optimasi
    exclude: ['class-variance-authority'],
  },

  // Resolusi modul
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      // Pastikan Vite mengetahui lokasi modul class-variance-authority
      'class-variance-authority': require.resolve('class-variance-authority'),
    },
  },

  // Pengaturan build
  build: {
    target: 'esnext', // Gunakan target ESNext untuk kompatibilitas yang lebih baik
    minify: 'terser',  // Minifikasi menggunakan Terser untuk optimasi
    cssCodeSplit: true,
    sourcemap: false,   // Nonaktifkan sourcemap untuk production
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,

    // Pengaturan manual chunking menggunakan Rollup
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('framer-motion')) return 'animation';
            if (id.includes('lucide-react')) return 'icons';
          }
        },
      },
    },
  },

  // Pengaturan server untuk caching
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },

  // Build preview server untuk pengujian hasil build
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
});
