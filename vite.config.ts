import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),

    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),

    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 80 },
    }),
  ],

  optimizeDeps: {
    include: ['lucide-react', 'framer-motion', 'react', 'react-dom', 'class-variance-authority'],
  },

  resolve: {
    dedupe: ['react', 'react-dom'],
  },

  build: {
    target: 'esnext',             
    minify: 'terser',            
    cssCodeSplit: true,           
    sourcemap: false,             
    assetsInlineLimit: 4096,      
    chunkSizeWarningLimit: 600,  

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

  // 🌐 Server dev dan caching untuk file hasil build
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },

  // 🧱 Build preview server (opsional, untuk test hasil build)
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
});
