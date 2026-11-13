import { error } from '@sveltejs/kit';
import { serviceBySlug, services } from '#lib/content/services.ts';
import type { EntryGenerator, PageLoad } from './$types';

// One static page per service. Folders like src/routes/team/ take priority over this route.
export const entries: EntryGenerator = () => services.map((s) => ({ slug: s.slug }));

export const load: PageLoad = ({ params }) => {
	const service = serviceBySlug(params.slug);
	if (!service) error(404, 'Страница не найдена');
	return { service };
};
