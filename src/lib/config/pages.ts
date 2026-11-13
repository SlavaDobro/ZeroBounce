/**
 * Navigation. Paths are without the base folder: render them with link() from #lib/link.ts.
 * Service pages come from src/lib/content/services.ts.
 */

export const mainNav = [
	{ label: 'Услуги', href: '/uslugi/' },
	{ label: 'Подход', href: '/filosofiya/' },
	{ label: 'Производителям', href: '/dlya-proizvoditeley/' },
	{ label: 'Команда', href: '/team/' },
	{ label: 'Контакты', href: '/contacts/' }
];

export const companyNav = [
	{ label: 'Подход Zero Bounce', href: '/filosofiya/' },
	{ label: 'Команда', href: '/team/' },
	{ label: 'Карьера', href: '/career/' },
	{ label: 'Обучение', href: '/obuchenie/' },
	{ label: 'Контакты', href: '/contacts/' }
];

export const legalNav = [
	{
		label: 'Обработка персональных данных',
		href: '/politika-v-otnoshenii-obrabotki-personalnyh-dannyh/'
	},
	{ label: 'Использование cookie', href: '/politika-ispolzovaniya-cookie/' }
];

/** Main call to action across the site. */
export const auditHref = '/contacts/';
