/**
 * Navigation. Paths are without the base folder: render them with link() from #lib/link.ts.
 * Service pages come from src/lib/content/services.ts.
 */
import type { StageId } from '#lib/content/journey.ts';

/** Main menu. «Услуги» opens the services menu instead of navigating. */
export const mainNav = [
	{ label: 'Услуги', href: '/uslugi/' },
	{ label: 'Цены', href: '/#calc' },
	{ label: 'Производителям', href: '/dlya-proizvoditeley/' },
	{ label: 'О нас', href: '/team/' },
	{ label: 'Контакты', href: '/contacts/' }
];

/**
 * Plain names of service groups for menus and the catalogue.
 * Each group is one stage of the customer path (see journey.ts).
 */
export const serviceGroups: { id: StageId; title: string; hint: string }[] = [
	{ id: 'attract', title: 'Привлечение клиентов', hint: 'Реклама, поиск, нейросети, соцсети' },
	{ id: 'engage', title: 'Сайт и контент', hint: 'Сайт, тексты, публикации' },
	{ id: 'decide', title: 'CRM', hint: 'amoCRM, Битрикс24, настройка продаж' },
	{ id: 'close', title: 'Обработка заявок', hint: 'Скорость ответа, звонки, скрипты' },
	{ id: 'retain', title: 'Повторные продажи', hint: 'Рассылки, мессенджеры, мероприятия' },
	{ id: 'system', title: 'Аналитика и стратегия', hint: 'Аудит, аналитика, консалтинг, AI' }
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
export const pricesHref = '/#calc';
