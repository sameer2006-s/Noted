// vite.config.js
import { defineConfig } from 'vite';
import node from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    node(),       // Allow Node.js modules to be resolved
    commonjs(),   // Allow CommonJS modules to be used
  ],
  server: {
    port: 5000,    // Optional, set your desired port
    proxy: {
      '/api': 'http://localhost:5000',  // Proxy API requests to your backend
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './src/index.ts',  // Ensure the correct entry point
    },
  },
});
