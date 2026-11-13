/** Site-wide settings: name, contacts, defaults for <head>. */
export const site: {
	name: string;
	/** Full address with https://, e.g. 'https://example.ru'. Empty until the domain is bought. */
	url: string;
	description: string;
	locale: string;
	email: string;
	phone: string;
	telegram: string;
} = {
	name: 'Zero Bounce',
	url: '',
	description: 'Комплексный интернет-маркетинг для вашего бизнеса',
	locale: 'ru_RU',
	// Contacts: fill in before launch. Empty values are not shown on the site.
	email: '',
	phone: '',
	telegram: ''
};
