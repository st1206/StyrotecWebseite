import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: { allow: ['..', '../shared'] },
  },
  // @lucide/svelte ships raw .svelte files — bundle it for SSR instead of letting Node require() it
  ssr: { noExternal: ['@lucide/svelte'] },
});
