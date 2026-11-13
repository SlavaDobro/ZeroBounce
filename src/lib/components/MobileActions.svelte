<script lang="ts">
	/** Phones: contact buttons slide up from the bottom once the first screen is scrolled past. */
	import { page } from '$app/state';
	import { auditHref } from '#lib/config/pages.ts';
	import { site } from '#lib/config/site.ts';
	import { link } from '#lib/link.ts';

	let scrolled = $state(false);
	const hidden = $derived(page.url.pathname.endsWith(auditHref));
</script>

<svelte:window onscroll={() => (scrolled = scrollY > 520)} />

{#if !hidden}
	<div
		class="bar fixed inset-x-0 bottom-0 z-30 lg:hidden"
		class:show={scrolled}
		aria-hidden={!scrolled}
	>
		<div
			class="grid grid-cols-[auto_1fr] gap-2 border-t border-ink/15 bg-paper/95 p-3 backdrop-blur-sm"
		>
			<a
				href={site.telegram}
				class="flex min-h-12 items-center rounded-full border border-ink px-5 text-sm font-medium"
				tabindex={scrolled ? 0 : -1}>Telegram</a
			>
			<a
				href={link(auditHref)}
				class="flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-paper"
				tabindex={scrolled ? 0 : -1}
			>
				<span class="size-2 rounded-full bg-visit" aria-hidden="true"></span>
				Оставить заявку
			</a>
		</div>
	</div>
{/if}

<style>
	.bar {
		translate: 0 110%;
		transition: translate 0.4s var(--ease-settle);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.bar.show {
		translate: 0 0;
	}
	@media (prefers-reduced-motion: reduce) {
		.bar {
			transition: none;
		}
	}
</style>
