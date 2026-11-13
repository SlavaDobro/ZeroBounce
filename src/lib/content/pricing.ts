/** Price list for the calculator, as given by the client. Rubles. */

export interface PriceOption {
	id: string;
	title: string;
	price: number;
	/** true: «от …» — the final price is set after an audit. */
	from: boolean;
	note?: string;
}

export interface PriceItem {
	id: string;
	title: string;
	/** Link to the service page. */
	slug: string;
	type: 'fixed' | 'budget' | 'choice';
	price?: number;
	from?: boolean;
	/** budget: fee is `rate` of the ad budget, not less than `min`. */
	rate?: number;
	min?: number;
	options?: PriceOption[];
}

export const priceItems: PriceItem[] = [
	{
		id: 'direct',
		title: 'Яндекс Директ',
		slug: 'kontekstnaya-reklama',
		type: 'budget',
		rate: 0.15,
		min: 60000
	},
	{
		id: 'seo',
		title: 'SEO',
		slug: 'poiskovaya-optimizacziya-seo',
		type: 'choice',
		options: [
			{ id: 'consult', title: 'Формат консалтинга', price: 120000, from: true },
			{
				id: 'dev',
				title: 'С нашими программистами',
				price: 150000,
				from: true,
				note: 'Окончательно решаем после аудита сайта'
			}
		]
	},
	{ id: 'geo', title: 'GEO / AEO', slug: 'geo-aeo', type: 'fixed', price: 120000, from: true },
	{
		id: 'crm',
		title: 'Установка amoCRM или Битрикс24',
		slug: 'integracziya-s-crm',
		type: 'fixed',
		price: 50000,
		from: true
	},
	{
		id: 'calltouch',
		title: 'Calltouch на сайте и в CRM',
		slug: 'skvoznaya-analitika',
		type: 'fixed',
		price: 40000,
		from: false
	},
	{
		id: 'funnels',
		title: 'Глубокий разбор воронок в CRM',
		slug: 'integracziya-s-crm',
		type: 'fixed',
		price: 100000,
		from: true
	}
];

/** Highest threshold first: the first match wins. */
export const discounts = [
	{ from: 300000, percent: 10 },
	{ from: 200000, percent: 5 }
];

export const priceNote = [
	'Рассчитанная стоимость предварительная. Итоговая цена определяется после уточнения объёма и сложности работ и может измениться как в большую, так и в меньшую сторону.',
	'Индивидуальные условия и скидки обсуждаются отдельно.'
];

export interface Selection {
	[id: string]: { budget?: number; option?: string } | undefined;
}

export interface Quote {
	lines: { id: string; title: string; price: number; from: boolean }[];
	sum: number;
	percent: number;
	discount: number;
	total: number;
	from: boolean;
}

export function quote(selection: Selection): Quote {
	const lines: Quote['lines'] = [];
	for (const item of priceItems) {
		const state = selection[item.id];
		if (!state) continue;
		if (item.type === 'budget') {
			const budget = state.budget ?? 0;
			const price = budget > 0 ? Math.max(Math.round(budget * item.rate!), item.min!) : item.min!;
			lines.push({ id: item.id, title: item.title, price, from: budget <= 0 });
		} else if (item.type === 'choice') {
			const option = item.options!.find((o) => o.id === state.option) ?? item.options![0];
			lines.push({
				id: item.id,
				title: `${item.title}: ${option.title.toLowerCase()}`,
				price: option.price,
				from: option.from
			});
		} else {
			lines.push({ id: item.id, title: item.title, price: item.price!, from: item.from! });
		}
	}
	const sum = lines.reduce((total, line) => total + line.price, 0);
	const percent = discounts.find((d) => sum >= d.from)?.percent ?? 0;
	const discount = Math.round((sum * percent) / 100);
	return { lines, sum, percent, discount, total: sum - discount, from: lines.some((l) => l.from) };
}

const money = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
/** Non-breaking space keeps the number and the rouble sign on one line. */
export const rub = (value: number) => `${money.format(value)}\u00a0₽`;
