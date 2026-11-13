import data from './services.json';
import type { StageId } from './journey.ts';

export interface Service {
	slug: string;
	stage: StageId;
	/** Full page title. */
	title: string;
	/** Short name for menus and lists. */
	navTitle: string;
	/** One line for the services index. */
	short: string;
	/** Optional slogan shown above the lead. */
	tagline: string;
	lead: string;
	includes: string[];
	sections: { heading: string; text: string; list: string[] }[];
	steps: { title: string; text: string }[];
	features: { title: string; text: string }[];
	stats: { value: string; label: string }[];
	faq: { q: string; a: string }[];
	/** Text written for the new site from the old site's wording: needs the client's review. */
	draft: boolean;
}

/** Service pages, content moved from the old site (src/lib/content/services.json). */
export const services = data as Service[];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const servicesByStage = (stage: StageId) => services.filter((s) => s.stage === stage);

export const serviceHref = (service: Pick<Service, 'slug'>) => `/${service.slug}/`;
