<script lang="ts">
	/**
	 * Figures drawn as dimension lines. For percentages the line length equals the value;
	 * other figures get a break mark — the drawing sign for "not to scale".
	 */
	import { stats } from '#lib/content/company.ts';

	const share = (value: string) => (value.endsWith('%') ? parseFloat(value) / 100 : null);
</script>

<ul class="space-y-10 lg:space-y-12">
	{#each stats as stat (stat.value)}
		{@const part = share(stat.value)}
		<li>
			<div class="grid items-end gap-x-8 gap-y-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
				<p class="font-display text-4xl font-extralight tabular-nums sm:text-5xl">{stat.value}</p>
				<p class="text-sm text-graphite sm:pb-2">{stat.label}</p>
			</div>
			<svg class="mt-3 h-4 w-full overflow-visible" aria-hidden="true">
				<svg width="{(part ?? 1) * 100}%" height="16" class="overflow-visible">
					<line x1="0" y1="8" x2="100%" y2="8" class="dim" />
					<!-- Architectural tick marks at both ends -->
					<line x1="-5" y1="13" x2="5" y2="3" class="tick" />
					<svg x="100%" class="overflow-visible"
						><line x1="-5" y1="13" x2="5" y2="3" class="tick" /></svg
					>
					<line x1="0" y1="0" x2="0" y2="16" class="ext" />
					<svg x="100%" class="overflow-visible"
						><line x1="0" y1="0" x2="0" y2="16" class="ext" /></svg
					>
					{#if part === null}
						<svg x="50%" class="overflow-visible">
							<rect x="-14" y="0" width="28" height="16" fill="var(--color-paper)" />
							<path d="M-14 8H-6L-2 1L2 15L6 8H14" class="dim" />
						</svg>
					{/if}
				</svg>
			</svg>
		</li>
	{/each}
</ul>

<style>
	.dim {
		fill: none;
		stroke: var(--color-ink);
		stroke-width: 1;
	}
	.tick {
		stroke: var(--color-ink);
		stroke-width: 1.5;
	}
	.ext {
		stroke: var(--color-graphite);
		stroke-width: 0.75;
	}
</style>
