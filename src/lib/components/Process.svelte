<script lang="ts">
	/**
	 * Work process: a real sequence, so the steps are numbered. When the list scrolls
	 * into view the connecting line is drawn from step to step and each marker fills in turn.
	 */
	import { inview } from '#lib/inview.ts';

	let { steps }: { steps: { title: string; text: string }[] } = $props();
</script>

<ol class="process grid gap-8 lg:gap-6" style="--n: {steps.length}" use:inview={{ threshold: 0.3 }}>
	{#each steps as step, i (step.title)}
		<li class="step relative pl-14 lg:pt-14 lg:pl-0" style="--i: {i}">
			<span
				class="marker absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-ink font-display text-sm font-light"
				aria-hidden="true">{i + 1}</span
			>
			<h3 class="font-sans text-lg font-medium tracking-normal">{step.title}</h3>
			{#if step.text}<p class="mt-2 text-sm text-graphite">{step.text}</p>{/if}
		</li>
	{/each}
</ol>

<style>
	/* A thin line threads the markers, like a dimension chain. */
	.step::before {
		content: '';
		position: absolute;
		left: 1.25rem;
		top: 2.5rem;
		bottom: -2rem;
		width: 1px;
		background: var(--color-graphite);
		transform-origin: top;
		transition: transform 0.5s linear;
		transition-delay: calc(0.35s + var(--i) * 0.45s);
	}
	.step:last-child::before {
		display: none;
	}
	.marker {
		background: var(--color-paper);
		color: var(--color-ink);
		transition:
			background-color 0.3s,
			color 0.3s;
		transition-delay: calc(var(--i) * 0.45s);
	}
	/* Drawn state: markers are filled, the chain is complete. */
	.process:global([data-inview]) .marker {
		background: var(--color-ink);
		color: var(--color-paper);
	}
	:global(.js) .process:not(:global([data-inview])) .step::before {
		transform: scaleY(0);
	}
	:global(.js) .process:not(:global([data-inview])) .marker {
		background: var(--color-paper);
		color: var(--color-ink);
	}
	@media (min-width: 1024px) {
		.process {
			grid-template-columns: repeat(var(--n), minmax(0, 1fr));
		}
		.step::before {
			left: 2.5rem;
			right: -1.5rem;
			top: 1.25rem;
			bottom: auto;
			width: auto;
			height: 1px;
			transform-origin: left;
		}
		:global(.js) .process:not(:global([data-inview])) .step::before {
			transform: scaleX(0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.step::before,
		.marker {
			transition: none;
		}
	}
</style>
