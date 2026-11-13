/** Site-wide settings: name, contacts, defaults for <head>. */
export const site: {
	name: string;
	/** Full address with https://, e.g. 'https://example.ru'. Empty until the domain is bought. */
	url: string;
	description: string;
	locale: string;
	email: string;
	phone: string;
	/** Telegram link and the handle shown on the site. */
	telegram: string;
	telegramHandle: string;
	/**
	 * Where the contact form sends JSON (POST). Empty: the form explains that sending
	 * is not connected yet and offers Telegram instead.
	 */
	formEndpoint: string;
} = {
	name: 'Zero Bounce',
	url: '',
	description: 'Комплексный digital-маркетинг под управлением одной команды',
	locale: 'ru_RU',
	// Contacts: empty values are not shown on the site.
	email: '',
	phone: '',
	telegram: 'https://t.me/zero_bounce',
	telegramHandle: '@zero_bounce',
	formEndpoint: ''
};
