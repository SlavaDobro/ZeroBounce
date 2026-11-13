/**
 * All pages of the current WordPress site, with their exact URLs.
 * Keeping the same paths keeps search rankings and old links working.
 *
 * Until a page gets its own route folder (src/routes/<path>/+page.svelte),
 * it is rendered by the placeholder route src/routes/[...path].
 */
export type PageGroup = 'marketing' | 'crm' | 'consulting' | 'company' | 'legal';

export interface SitePage {
	/** URL path without slashes at the ends, as on the current site. */
	path: string;
	title: string;
	group: PageGroup;
}

export const groupTitles: Record<PageGroup, string> = {
	marketing: 'Маркетинг и продвижение',
	crm: 'CRM и аналитика',
	consulting: 'Консалтинг и обучение',
	company: 'Компания',
	legal: 'Документы'
};

export const pages: SitePage[] = [
	// Marketing
	{ path: 'kompleksnyj-marketing', title: 'Комплексный маркетинг', group: 'marketing' },
	{
		path: 'marketingovoe-resheniye/kontekstnaya-reklama',
		title: 'Контекстная реклама',
		group: 'marketing'
	},
	{
		path: 'poiskovaya-optimizacziya-seo',
		title: 'Поисковая оптимизация (SEO)',
		group: 'marketing'
	},
	{ path: 'geo-aeo', title: 'GEO / AEO', group: 'marketing' },
	{
		path: 'marketing-v-soczialnyh-setyah-smm',
		title: 'Маркетинг в социальных сетях (SMM)',
		group: 'marketing'
	},
	{
		path: 'email-i-messendzher-marketing',
		title: 'Email и мессенджер-маркетинг',
		group: 'marketing'
	},
	{ path: 'prodvizhenie-na-avito', title: 'Продвижение на Авито', group: 'marketing' },
	{ path: 'kontent-i-kopirajting', title: 'Контент и копирайтинг', group: 'marketing' },
	{ path: 'pr-i-reputacziya', title: 'PR и репутация', group: 'marketing' },
	{ path: 'brend-strategiya', title: 'Бренд-стратегия', group: 'marketing' },
	{ path: 'sobytijnyj-marketing', title: 'Событийный маркетинг', group: 'marketing' },
	{ path: 'organizacya-meropriytii', title: 'Организация мероприятий', group: 'marketing' },
	{ path: 'razrabotka-sajta', title: 'Разработка сайта', group: 'marketing' },
	{ path: 'parsing-saytov', title: 'Парсинг сайтов', group: 'marketing' },
	{
		path: 'dlya-proizvoditeley',
		title: 'Маркетинг для производителей интерьерных решений',
		group: 'marketing'
	},

	// CRM and analytics
	{ path: 'integracziya-s-crm', title: 'Интеграция с CRM', group: 'crm' },
	{ path: 'integracziya-amo', title: 'Интеграция AMO', group: 'crm' },
	{ path: 'integracziya-bitriks-24', title: 'Интеграция Битрикс 24', group: 'crm' },
	{ path: 'skvoznaya-analitika', title: 'Сквозная аналитика', group: 'crm' },
	{
		path: 'kontrol-obrabotki-vhodyashhih-lidov',
		title: 'Контроль обработки входящих лидов',
		group: 'crm'
	},

	// Consulting and training
	{ path: 'marketingovyj-audit', title: 'Маркетинговый аудит', group: 'consulting' },
	{ path: 'konsalting', title: 'Консалтинг', group: 'consulting' },
	{ path: 'upravlenie-proektami', title: 'Управление проектами', group: 'consulting' },
	{ path: 'ai-istrument', title: 'Внедрение AI-инструментов', group: 'consulting' },
	{ path: 'obuchenie', title: 'Обучение', group: 'consulting' },
	{ path: 'intervyu', title: 'Интервью', group: 'consulting' },

	// Company
	{ path: 'filosofiya', title: 'Философия', group: 'company' },
	{ path: 'team', title: 'Команда Zero Bounce', group: 'company' },
	{ path: 'career', title: 'Карьера', group: 'company' },
	{ path: 'contacts', title: 'Контакты', group: 'company' },

	// Legal
	{
		path: 'politika-v-otnoshenii-obrabotki-personalnyh-dannyh',
		title: 'Политика в отношении обработки персональных данных',
		group: 'legal'
	},
	{ path: 'politika-ispolzovaniya-cookie', title: 'Политика использования Cookie', group: 'legal' }
];

export const href = (page: SitePage) => `/${page.path}/`;

export const pagesByGroup = (group: PageGroup) => pages.filter((page) => page.group === group);

export const findPage = (path: string) => pages.find((page) => page.path === path);

/** Short main menu. Edit freely: links are full URL paths. */
export const mainNav = [
	{ label: 'Услуги', href: '/#services' },
	{ label: 'Аудит', href: '/marketingovyj-audit/' },
	{ label: 'Команда', href: '/team/' },
	{ label: 'Философия', href: '/filosofiya/' },
	{ label: 'Контакты', href: '/contacts/' }
];
