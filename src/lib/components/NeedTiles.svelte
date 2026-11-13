<script lang="ts">
	/**
	 * Entry points in the client's own words: «what do you need?» → the right page.
	 * On hover the dot rolls in from the left edge and stops in its circle — no bounce.
	 */
	import { link } from '#lib/link.ts';

	const needs = [
		{
			title: 'Нужны заявки из рекламы',
			text: 'Яндекс Директ с расчётом окупаемости',
			href: '/kontekstnaya-reklama/'
		},
		{
			title: 'Хочу в топ поиска',
			text: 'SEO для Яндекса и Google',
			href: '/poiskovaya-optimizacziya-seo/'
		},
		{
			title: 'Пусть нейросети советуют нас',
			text: 'GEO / AEO: компания в ответах AI-ассистентов',
			href: '/geo-aeo/'
		},
		{
			title: 'Нужен сайт, который продаёт',
			text: 'Разработка сайта под ключ',
			href: '/razrabotka-sajta/'
		},
		{
			title: 'Заявки теряются',
			text: 'Проверим скорость ответа и прослушаем звонки',
			href: '/kontrol-obrabotki-vhodyashhih-lidov/'
		},
		{
			title: 'Нужен порядок в CRM',
			text: 'amoCRM и Битрикс24 под ваши продажи',
			href: '/integracziya-s-crm/'
		},
		{
			title: 'Не понимаю, что окупается',
			text: 'Сквозная аналитика от клика до сделки',
			href: '/skvoznaya-analitika/'
		},
		{
			title: 'Нужен весь маркетинг сразу',
			text: 'Одна команда вместо нескольких подрядчиков',
			href: '/kompleksnyj-marketing/'
		},
		{ title: 'Сколько это стоит?', text: 'Калькулятор с ценами и скидками', href: '/#calc' }
	];
</script>

<ul class="tiles grid border-t border-l border-ink/30 sm:grid-cols-2 lg:grid-cols-3">
	{#each needs as need (need.href)}
		<li class="border-r border-b border-ink/30">
			<a
				href={link(need.href)}
				class="tile group relative flex h-full min-h-36 flex-col justify-between gap-6 overflow-hidden p-6 lg:min-h-44 lg:p-7"
			>
				<span class="relative z-10">
					<span class="block font-display text-xl leading-snug font-light">{need.title}</span>
					<span class="mt-2 block text-sm text-graphite">{need.text}</span>
				</span>
				<span class="track relative z-10 flex items-center justify-end" aria-hidden="true">
					<span class="socket"></span>
					<span class="dot"></span>
				</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	/* Hatching sweeps in under the tile, the way a room is marked on a plan. */
	.tile::before {
		content: '';
		position: absolute;
		inset: 0;
		color: color-mix(in srgb, var(--color-visit) 22%, transparent);
		background-image: repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 8px);
		clip-path: inset(0 100% 0 0);
		transition: clip-path 0.5s var(--ease-settle);
	}
	.tile:hover::before,
	.tile:focus-visible::before {
		clip-path: inset(0 0 0 0);
	}
	.track {
		height: 1.75rem;
	}
	.socket {
		width: 1.75rem;
		height: 1.75rem;
		border: 1px dashed var(--color-graphite);
		border-radius: 50%;
		transition: border-color 0.3s;
	}
	.dot {
		position: absolute;
		right: 0.3125rem;
		top: 0.3125rem;
		width: 1.125rem;
		height: 1.125rem;
		border-radius: 50%;
		background: var(--color-visit);
		/* Starts outside the tile on the left and rolls to the socket. */
		translate: calc(-100cqw - 2rem) 0;
		opacity: 0;
		transition:
			translate 0.6s var(--ease-settle),
			opacity 0.2s;
	}
	.tile {
		container-type: inline-size;
	}
	.tile:hover .dot,
	.tile:focus-visible .dot {
		translate: 0 0;
		opacity: 1;
	}
	.tile:hover .socket,
	.tile:focus-visible .socket {
		border-style: solid;
		border-color: var(--color-visit);
	}
	@media (hover: none) {
		/* Touch screens: the dot already sits in place, there is no hover. */
		.dot {
			translate: 0 0;
			opacity: 1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.tile::before,
		.dot {
			transition: none;
		}
	}
</style>
