<script lang="ts">
	/** Interior niches shown as material samples with drawing hatches. */
	import { niches } from '#lib/content/company.ts';
</script>

<svg width="0" height="0" class="absolute" aria-hidden="true">
	<defs>
		<!-- Natural stone: cross hatch -->
		<pattern
			id="mat-stone"
			width="10"
			height="10"
			patternUnits="userSpaceOnUse"
			patternTransform="rotate(45)"
		>
			<path d="M0 5H10M5 0V10" stroke="currentColor" stroke-width="0.8" />
		</pattern>
		<!-- Wood: grain lines -->
		<pattern id="mat-wood" width="40" height="8" patternUnits="userSpaceOnUse">
			<path
				d="M0 4C10 1 14 7 24 4S36 2 40 4"
				fill="none"
				stroke="currentColor"
				stroke-width="0.8"
			/>
		</pattern>
		<!-- Glass: sparse paired strokes -->
		<pattern
			id="mat-glass"
			width="22"
			height="22"
			patternUnits="userSpaceOnUse"
			patternTransform="rotate(-45)"
		>
			<path d="M0 6H22M0 9H22" stroke="currentColor" stroke-width="0.7" />
		</pattern>
		<!-- Textile: weave dots -->
		<pattern id="mat-fabric" width="6" height="6" patternUnits="userSpaceOnUse">
			<circle cx="1.5" cy="1.5" r="0.9" fill="currentColor" />
			<circle cx="4.5" cy="4.5" r="0.9" fill="currentColor" />
		</pattern>
		<!-- Metal: dense 45° lines -->
		<pattern
			id="mat-metal"
			width="4"
			height="4"
			patternUnits="userSpaceOnUse"
			patternTransform="rotate(45)"
		>
			<path d="M0 2H4" stroke="currentColor" stroke-width="0.8" />
		</pattern>
		<!-- Plaster and moulding: stipple -->
		<pattern id="mat-plaster" width="14" height="14" patternUnits="userSpaceOnUse">
			<circle cx="2" cy="3" r="0.7" fill="currentColor" />
			<circle cx="9" cy="1.5" r="0.6" fill="currentColor" />
			<circle cx="6" cy="8" r="0.8" fill="currentColor" />
			<circle cx="12" cy="10" r="0.6" fill="currentColor" />
			<circle cx="3" cy="12" r="0.7" fill="currentColor" />
		</pattern>
	</defs>
</svg>

<ul class="grid grid-cols-2 border-t border-l border-ink/25 sm:grid-cols-3 lg:grid-cols-4">
	{#each niches as niche (niche.title)}
		<li
			class="niche flex flex-col items-start gap-3 border-r border-b border-ink/25 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
		>
			<svg class="size-10 shrink-0 sm:size-14" viewBox="0 0 56 56" aria-hidden="true">
				<rect
					x="0.5"
					y="0.5"
					width="55"
					height="55"
					fill="url(#mat-{niche.hatch})"
					stroke="currentColor"
				/>
			</svg>
			<span class="text-sm leading-snug sm:text-base">{niche.title}</span>
		</li>
	{/each}
</ul>

<style>
	.niche {
		color: var(--color-ink);
	}
	.niche svg {
		color: var(--color-graphite);
		transition: color 0.2s;
	}
	.niche:hover svg {
		color: var(--color-visit);
	}
</style>
