<script lang="ts">
	import { page } from '$app/state';
	import logo from '#lib/assets/logo.png';
	import { auditHref, mainNav } from '#lib/config/pages.ts';
	import { site } from '#lib/config/site.ts';
	import { link } from '#lib/link.ts';
	import Button from './Button.svelte';
	import Container from './Container.svelte';

	let open = $state(false);

	// Close the menu after navigation.
	$effect(() => {
		void page.url.pathname;
		open = false;
	});

	// Lock page scroll while the full-screen menu is open.
	$effect(() => {
		document.documentElement.style.overflow = open ? 'hidden' : '';
	});

	// pathname includes the base folder on GitHub Pages, so compare the end of it.
	const isCurrent = (href: string) => page.url.pathname.endsWith(href);
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<header class="sticky top-0 z-40 border-b border-ink/15 bg-paper/92 backdrop-blur-sm">
	<Container class="flex h-16 items-center justify-between gap-6 lg:h-18">
		<a href={link('/')} class="shrink-0" aria-label="{site.name} — на главную">
			<img src={logo} alt={site.name} width="885" height="154" class="h-[18px] w-auto lg:h-5" />
		</a>

		<nav class="hidden lg:block" aria-label="Основное меню">
			<ul class="flex items-center gap-9 text-sm">
				{#each mainNav as item (item.href)}
					<li>
						<a
							href={link(item.href)}
							class="relative py-2 transition-colors hover:text-visit aria-[current=page]:text-visit"
							aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="flex items-center gap-2">
			<Button href={link(auditHref)} class="min-h-10! px-4! max-[359px]:hidden! sm:px-5!"
				>Запросить аудит</Button
			>
			<button
				type="button"
				class="grid size-11 place-items-center rounded-full border border-ink/25 transition-colors hover:border-ink lg:hidden"
				aria-expanded={open}
				aria-controls="site-menu"
				onclick={() => (open = !open)}
			>
				<span class="sr-only">{open ? 'Закрыть меню' : 'Открыть меню'}</span>
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
					<path
						d={open ? 'M4 4l10 10M14 4L4 14' : 'M2 6h14M2 12h14'}
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
					/>
				</svg>
			</button>
		</div>
	</Container>
</header>

{#if open}
	<!-- Full-screen menu: a sheet that unrolls under the header. -->
	<div
		id="site-menu"
		class="menu-sheet fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-paper lg:hidden"
	>
		<nav aria-label="Меню">
			<Container class="py-8">
				<ul class="border-t border-ink/15">
					{#each mainNav as item, i (item.href)}
						<li class="menu-row border-b border-ink/15" style="--i: {i}">
							<a
								href={link(item.href)}
								class="block py-5 font-display text-2xl font-light aria-[current=page]:text-visit"
								aria-current={isCurrent(item.href) ? 'page' : undefined}
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
				<div class="mt-8 grid gap-3">
					<Button href={link(auditHref)}>Запросить аудит</Button>
					<Button href={site.telegram} variant="outline">Написать в Telegram</Button>
				</div>
			</Container>
		</nav>
	</div>
{/if}

<style>
	.menu-sheet {
		animation: sheet-in 0.32s var(--ease-settle) both;
	}
	.menu-row {
		animation: row-in 0.4s var(--ease-settle) both;
		animation-delay: calc(0.05s + var(--i, 0) * 0.04s);
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
		.menu-sheet,
		.menu-row {
			animation: none;
		}
	}
</style>
