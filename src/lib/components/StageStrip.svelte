<script lang="ts">
	/** Small floor plan: which room (stage of the customer path) a service works in. */
	import { stages, type StageId } from '#lib/content/journey.ts';

	let { stage }: { stage: StageId } = $props();
	const index = $derived(stages.findIndex((s) => s.id === stage));
	const all = $derived(stage === 'system');
	// Several strips can be on one page: each needs its own pattern id.
	const uid = $props.id();
	const hatchId = `ss-hatch-${uid}`;
</script>

<figure class="w-full max-w-sm">
	<svg viewBox="0 0 500 120" class="block w-full" aria-hidden="true">
		<defs>
			<pattern
				id={hatchId}
				width="7"
				height="7"
				patternUnits="userSpaceOnUse"
				patternTransform="rotate(-45)"
			>
				<path d="M0 3.5H7" stroke="var(--color-visit)" stroke-width="1" opacity="0.55" />
			</pattern>
		</defs>
		{#each stages as s, i (s.id)}
			{#if all || i === index}
				<rect x={i * 100 + 2} y="12" width="96" height="96" fill="url(#{hatchId})" />
			{/if}
		{/each}
		<path d="M0 50V10H500V110H0V70" fill="none" stroke="var(--color-ink)" stroke-width="4" />
		{#each [100, 200, 300, 400] as x, i (x)}
			<path
				d={i % 2 ? `M${x} 10V70M${x} 100V110` : `M${x} 10V20M${x} 50V110`}
				stroke="var(--color-ink)"
				stroke-width="4"
				fill="none"
			/>
		{/each}
		{#if !all && index >= 0}
			<circle cx={index * 100 + 50} cy="60" r="10" fill="var(--color-visit)" />
		{/if}
	</svg>
	<figcaption class="mt-2 text-sm text-graphite">
		{#if all}
			Работает на всех этапах клиентского пути
		{:else}
			Этап {index + 1} из 5: {stages[index]?.title.toLowerCase()}
		{/if}
	</figcaption>
</figure>
