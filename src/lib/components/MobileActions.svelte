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
				<span class="bar-dot size-2 rounded-full bg-visit" aria-hidden="true"></span>
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
	/* Phone in landscape: the screen is too short, the header button is enough. */
	@media (max-height: 500px) {
		.bar {
			display: none;
		}
	}
	/* When the bar arrives, the dot drops into the button. */
	.bar.show .bar-dot {
		animation: bar-drop 0.55s var(--ease-land) 0.25s both;
	}
	@keyframes bar-drop {
		from {
			opacity: 0;
			scale: 4;
			filter: blur(2px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.bar {
			transition: none;
		}
		.bar.show .bar-dot {
			animation: none;
		}
	}
</style>
