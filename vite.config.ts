import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Folder the site is served from. Empty locally and on its own domain;
// '/ZeroBounce' on GitHub Pages (set by .github/workflows/deploy.yml).
const base = (process.env.BASE_PATH ?? '') as '' | `/${string}`;

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Static HTML for every page; 404.html is shown for unknown URLs.
			adapter: adapter({ fallback: '404.html' }),
			paths: { base }
		})
	]
});
