import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// optional: tweak these if you want a different output dir,
			// gzip/brotli pre-compression, a SPA fallback, etc.
			pages: 'build',
			assets: 'build',
			fallback: null, // e.g. '200.html' for SPA-style routing
			precompress: false,
			strict: true
		}),

		// crawl every discovered route and pre-render it
		prerender: {
			default: true, // the magic bit — make every page static
			entries: ['*'] // allow SvelteKit to discover all pages it can
		}
	}
};

export default config;
