import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentGretaTagger } from "@questlabs/greta-tagger";

// Get the repository name from package.json or environment variable
const repoName = 'PR-Guest-Post-Marketplace-PRD-clone-3706-2807';

export default defineConfig({
  plugins: [componentGretaTagger(),react()],
  // Use conditional base path - './' for local development, and '/repo-name/' for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
});