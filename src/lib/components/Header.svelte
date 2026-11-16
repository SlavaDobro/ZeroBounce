<script lang="ts">
	import { page } from '$app/state';
	import { auditHref, mainNav, serviceGroups } from '#lib/config/pages.ts';
	import { site } from '#lib/config/site.ts';
	import { serviceHref, servicesByStage } from '#lib/content/services.ts';
	import { link } from '#lib/link.ts';
	import Button from './Button.svelte';
	import Container from './Container.svelte';
	import Logo from './Logo.svelte';

	/** Mobile full-screen menu. */
	let open = $state(false);
	/** Desktop services menu. */
	let services = $state(false);
	let closeTimer = 0;

	// Close menus after navigation.
	$effect(() => {
		void page.url.pathname;
		open = false;
		services = false;
	});

	// Lock page scroll while the full-screen menu is open.
	$effect(() => {
		document.documentElement.style.overflow = open ? 'hidden' : '';
	});

	// pathname includes the base folder on GitHub Pages, so compare the end of it.
	const isCurrent = (href: string) => !href.includes('#') && page.url.pathname.endsWith(href);
	const onServicePage = $derived(
		serviceGroups.some((g) => servicesByStage(g.id).some((s) => isCurrent(serviceHref(s))))
	);

	function hoverOpen() {
		clearTimeout(closeTimer);
		services = true;
	}
	function hoverClose() {
		clearTimeout(closeTimer);
		closeTimer = window.setTimeout(() => (services = false), 180);
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') {
			open = false;
			services = false;
		}
	}}
/>

<header class="sticky top-0 z-40 border-b border-ink/15 bg-paper/95 backdrop-blur-sm">
	<Container class="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
		<a
			href={link('/')}
			class="inline-flex min-h-11 shrink-0 items-center"
			aria-label="{site.name} — на главную"
		>
			<Logo />
		</a>

		<nav class="hidden lg:block" aria-label="Основное меню">
			<ul class="flex items-center gap-1 text-[0.9375rem]">
				{#each mainNav as item (item.href)}
					<li>
						{#if item.href === '/uslugi/'}
							<button
								type="button"
								class="nav-link"
								class:is-open={services}
								class:is-current={isCurrent(item.href) || onServicePage}
								aria-expanded={services}
								aria-controls="services-menu"
								onclick={() => (services = !services)}
								onmouseenter={hoverOpen}
								onmouseleave={hoverClose}
							>
								{item.label}
								<svg class="chevron" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
									<path
										d="M1.5 3.5L5 7L8.5 3.5"
										fill="none"
										stroke="currentColor"
										stroke-width="1.4"
									/>
								</svg>
							</button>
						{:else}
							<a
								href={link(item.href)}
								class="nav-link"
								class:is-current={isCurrent(item.href)}
								aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a
							>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>

		<div class="flex items-center gap-2 sm:gap-3">
			<a
				href={site.telegram}
				class="hidden items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors hover:text-visit xl:inline-flex"
			>
				<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
					<path
						d="M21.5 4.5L2.8 11.7c-.9.4-.9 1.6.1 1.9l4.6 1.4 1.8 5.6c.3.8 1.3 1 1.9.4l2.6-2.5 4.8 3.5c.7.5 1.7.1 1.9-.7l3-15.4c.2-1-.8-1.8-1.9-1.4zM9.6 14.4l8.6-7.7-6.7 9.3-.3 2.9-1.6-4.5z"
						fill="currentColor"
					/>
				</svg>
				{site.telegramHandle}
			</a>
			<Button href={link(auditHref)} class="min-h-10! px-5! max-sm:hidden!">Оставить заявку</Button>
			<button
				type="button"
				class="grid size-11 place-items-center rounded-full border border-ink/25 transition-colors hover:border-ink lg:hidden"
				aria-expanded={open}
				aria-controls="site-menu"
				onclick={() => (open = !open)}
			>
				<span class="sr-only">{open ? 'Закрыть меню' : 'Открыть меню'}</span>
				<!-- Two lines that turn into a cross -->
				<span class="burger" class:open aria-hidden="true"><span></span><span></span></span>
			</button>
		</div>
	</Container>

	<!-- Desktop services menu: every service, grouped by what the client needs. -->
	{#if services}
		<div
			id="services-menu"
			class="mega absolute inset-x-0 top-full hidden border-b border-ink bg-paper shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)] lg:block"
			role="region"
			aria-label="Все услуги"
			onmouseenter={hoverOpen}
			onmouseleave={hoverClose}
		>
			<Container class="grid grid-cols-3 gap-x-10 gap-y-8 py-10 xl:grid-cols-6 xl:gap-x-8">
				{#each serviceGroups as group, i (group.id)}
					<div class="mega-col" style="--i: {i}">
						<p class="text-sm font-medium">{group.title}</p>
						<p class="mt-1 text-xs text-graphite">{group.hint}</p>
						<ul class="mt-4 space-y-2 border-t border-ink/15 pt-4 text-[0.9375rem]">
							{#each servicesByStage(group.id) as service (service.slug)}
								<li>
									<a
										href={link(serviceHref(service))}
										class="mega-link"
										aria-current={isCurrent(serviceHref(service)) ? 'page' : undefined}
										>{service.navTitle}</a
									>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</Container>
			<Container class="flex items-center justify-between border-t border-ink/15 py-4 text-sm">
				<a class="link" href={link('/uslugi/')}>Все услуги на одной странице</a>
				<a class="link" href={link('/') + '#calc'}>Рассчитать стоимость</a>
			</Container>
		</div>
	{/if}
</header>

{#if open}
	<!-- Mobile: full-screen menu that unrolls under the header. -->
	<div
		id="site-menu"
		class="menu-sheet fixed inset-x-0 top-16 bottom-0 z-[35] overflow-y-auto bg-paper lg:hidden"
	>
		<nav aria-label="Меню">
			<Container class="py-6">
				<div class="grid grid-cols-[1fr_auto] gap-3">
					<Button href={link(auditHref)}>Оставить заявку</Button>
					<Button href={site.telegram} variant="outline">Telegram</Button>
				</div>

				<ul class="mt-8 border-t border-ink/15">
					{#each mainNav.filter((i) => i.href !== '/uslugi/') as item, i (item.href)}
						<li class="menu-row border-b border-ink/15" style="--i: {i}">
							<a
								href={link(item.href)}
								class="block py-4 font-display text-xl font-light aria-[current=page]:text-visit"
								aria-current={isCurrent(item.href) ? 'page' : undefined}
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>

				<p class="mt-10 font-display text-xl font-light">Услуги</p>
				<div class="mt-4 space-y-2">
					{#each serviceGroups as group (group.id)}
						<details class="group border-b border-ink/15" open={group.id === 'attract'}>
							<summary class="flex cursor-pointer list-none items-center justify-between py-3">
								<span>{group.title}</span>
								<svg
									class="size-3 transition-transform group-open:rotate-180"
									viewBox="0 0 10 10"
									aria-hidden="true"
								>
									<path
										d="M1.5 3.5L5 7L8.5 3.5"
										fill="none"
										stroke="currentColor"
										stroke-width="1.4"
									/>
								</svg>
							</summary>
							<ul class="space-y-1 pb-4">
								{#each servicesByStage(group.id) as service (service.slug)}
									<li>
										<a
											href={link(serviceHref(service))}
											class="block py-1.5 text-graphite hover:text-visit">{service.navTitle}</a
										>
									</li>
								{/each}
							</ul>
						</details>
					{/each}
				</div>
			</Container>
		</nav>
	</div>
{/if}

<style>
	.nav-link {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.85rem;
		border-radius: 999px;
		transition: color 0.2s;
	}
	/* A drawn line with the dot at its end slides under the hovered item. */
	.nav-link::after {
		content: '';
		position: absolute;
		left: 0.85rem;
		right: 0.85rem;
		bottom: 0.15rem;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.35s var(--ease-settle);
	}
	.nav-link::before {
		content: '';
		position: absolute;
		right: 0.85rem;
		bottom: calc(0.15rem - 2.5px);
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-visit);
		opacity: 0;
		transform: translateX(-0.6rem);
		transition:
			opacity 0.2s,
			transform 0.35s var(--ease-settle);
	}
	.nav-link:hover::after,
	.nav-link.is-current::after,
	.nav-link.is-open::after {
		transform: scaleX(1);
	}
	.nav-link:hover::before,
	.nav-link.is-current::before,
	.nav-link.is-open::before {
		opacity: 1;
		transform: none;
	}
	.chevron {
		transition: rotate 0.25s var(--ease-settle);
	}
	.burger {
		position: relative;
		width: 18px;
		height: 14px;
	}
	.burger span {
		position: absolute;
		left: 0;
		right: 0;
		height: 1.5px;
		border-radius: 1px;
		background: currentColor;
		transition:
			top 0.25s var(--ease-settle),
			rotate 0.3s var(--ease-settle) 0.1s;
	}
	.burger span:first-child {
		top: 3px;
	}
	.burger span:last-child {
		top: 9.5px;
	}
	/* Lines first meet in the middle, then turn: the cross is drawn, not swapped. */
	.burger.open span {
		top: 6.25px;
	}
	.burger.open span:first-child {
		rotate: 45deg;
	}
	.burger.open span:last-child {
		rotate: -45deg;
	}
	.is-open .chevron {
		rotate: 180deg;
	}
	.mega {
		animation: mega-in 0.35s var(--ease-settle) both;
	}
	.mega-col {
		animation: col-in 0.45s var(--ease-settle) both;
		animation-delay: calc(0.04s + var(--i) * 0.035s);
	}
	.mega-link {
		display: inline-block;
		transition:
			color 0.15s,
			translate 0.25s var(--ease-settle);
	}
	.mega-link:hover,
	.mega-link[aria-current='page'] {
		color: var(--color-visit);
		translate: 0.25rem 0;
	}
	.menu-sheet {
		animation: sheet-in 0.32s var(--ease-settle) both;
	}
	.menu-row {
		animation: row-in 0.4s var(--ease-settle) both;
		animation-delay: calc(0.05s + var(--i, 0) * 0.04s);
	}
	summary::-webkit-details-marker {
		display: none;
	}
	@keyframes mega-in {
		from {
			clip-path: inset(0 0 100% 0);
		}
		to {
			clip-path: inset(0 0 -40px 0);
		}
	}
	@keyframes col-in {
		from {
			opacity: 0;
			translate: 0 -0.5rem;
		}
	}
	@keyframes sheet-in {
		from {
			clip-path: inset(0 0 100% 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}
	@keyframes row-in {
		from {
			opacity: 0;
			translate: 0 0.6rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.mega,
		.mega-col,
		.menu-sheet,
		.menu-row {
			animation: none;
		}
		.nav-link::after,
		.nav-link::before,
		.burger span {
			transition: none;
		}
	}
</style>
