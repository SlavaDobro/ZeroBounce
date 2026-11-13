<script lang="ts">
	/** Work process: a real sequence, so the steps are numbered. */
	let { steps }: { steps: { title: string; text: string }[] } = $props();
</script>

<ol class="process grid gap-8 lg:gap-6" style="--n: {steps.length}">
	{#each steps as step, i (step.title)}
		<li class="step relative pl-14 lg:pt-14 lg:pl-0">
			<span
				class="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-ink bg-paper font-display text-sm font-light"
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
		background: var(--color-hatch);
	}
	.step:last-child::before {
		display: none;
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
		}
	}
</style>
