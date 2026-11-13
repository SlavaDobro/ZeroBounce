<script lang="ts">
	import { page } from '$app/state';
	import logo from '#lib/assets/logo.png';
	import { mainNav } from '#lib/config/pages.ts';
	import { site } from '#lib/config/site.ts';
	import Button from './Button.svelte';
	import Container from './Container.svelte';

	let open = $state(false);

	// Close the mobile menu after navigation.
	$effect(() => {
		void page.url.pathname;
		open = false;
	});

	const isCurrent = (href: string) => !href.includes('#') && page.url.pathname === href;
</script>

<header class="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur">
	<Container class="flex h-18 items-center justify-between gap-6">
		<a href="/" class="shrink-0" aria-label="{site.name} — на главную">
			<img src={logo} alt={site.name} width="885" height="154" class="h-5 w-auto sm:h-6" />
		</a>

		<nav class="hidden lg:block" aria-label="Основное меню">
			<ul class="flex items-center gap-8 text-[15px] font-semibold">
				{#each mainNav as item (item.href)}
					<li>
						<a
							href={item.href}
							class="transition-colors hover:text-brand aria-[current=page]:text-brand"
							aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="flex items-center gap-3">
			<Button href="/contacts/" class="hidden px-5! py-2.5! text-sm sm:inline-flex"
				>Запросить аудит</Button
			>
			<button
				type="button"
				class="grid size-11 place-items-center rounded-xl border border-line lg:hidden"
				aria-expanded={open}
				aria-controls="mobile-menu"
				onclick={() => (open = !open)}
			>
				<span class="sr-only">{open ? 'Закрыть меню' : 'Открыть меню'}</span>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
					{#if open}
						<path
							d="M5 5l10 10M15 5L5 15"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
						/>
					{:else}
						<path
							d="M3 6h14M3 10h14M3 14h14"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
						/>
					{/if}
				</svg>
			</button>
		</div>
	</Container>

	{#if open}
		<nav
			id="mobile-menu"
			class="border-t border-line bg-white lg:hidden"
			aria-label="Мобильное меню"
		>
			<Container class="py-4">
				<ul class="grid gap-1 text-lg font-semibold">
					{#each mainNav as item (item.href)}
						<li>
							<a href={item.href} class="block rounded-xl px-3 py-3 hover:bg-surface"
								>{item.label}</a
							>
						</li>
					{/each}
				</ul>
				<Button href="/contacts/" class="mt-4 w-full">Запросить аудит</Button>
			</Container>
		</nav>
	{/if}
</header>
