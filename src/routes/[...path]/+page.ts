import { error } from '@sveltejs/kit';
import { findPage, pages } from '#lib/config/pages.ts';
import type { EntryGenerator, PageLoad } from './$types';

// Placeholder for every page from src/lib/config/pages.ts that has no route folder yet.
// A real route (e.g. src/routes/contacts/+page.svelte) takes priority over this one.
export const entries: EntryGenerator = () => pages.map((page) => ({ path: page.path }));

export const load: PageLoad = ({ params }) => {
	// With trailingSlash = 'always' the rest parameter ends with "/".
	const page = findPage(params.path.replace(/^\/+|\/+$/g, ''));
	if (!page) error(404, 'Страница не найдена');
	return { page };
};
