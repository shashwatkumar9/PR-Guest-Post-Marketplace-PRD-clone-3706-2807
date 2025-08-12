import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentGretaTagger } from "@questlabs/greta-tagger";

// Derive base path dynamically for GitHub Pages deployments.
// When running in GitHub Actions, GITHUB_REPOSITORY is set to "owner/repo".
const githubRepository = process.env.GITHUB_REPOSITORY;
const isRunningInGitHubActions = Boolean(process.env.GITHUB_ACTIONS);
const derivedRepoName = githubRepository ? githubRepository.split('/')[1] : '';

export default defineConfig({
  plugins: [componentGretaTagger(), react()],
  // Use "/<repo>/" on GitHub Pages, and "/" locally/dev.
  base: isRunningInGitHubActions && derivedRepoName ? `/${derivedRepoName}/` : '/',
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