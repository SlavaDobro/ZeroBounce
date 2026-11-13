<script lang="ts">
	/**
	 * Figures drawn as dimension lines. For percentages the line length equals the value;
	 * other figures get a break mark — the drawing sign for "not to scale".
	 * When the block scrolls into view the lines are drawn and the numbers count up.
	 */
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { stats } from '#lib/content/company.ts';
	import { inview } from '#lib/inview.ts';

	const parsed = stats.map((s) => {
		const number = Number(s.value.replace(/[^\d]/g, ''));
		return {
			...s,
			number,
			suffix: s.value.replace(/[\d\s]/g, ''),
			part: s.value.endsWith('%') ? number / 100 : null
		};
	});
	const format = new Intl.NumberFormat('ru-RU');

	// Shown values start at the final figures so the page reads right without JS.
	const counters = parsed.map((s) => new Tween(s.number, { duration: 1400, easing: cubicOut }));
	let armed = $state(false);

	function start() {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		counters.forEach((c, i) => {
			c.set(0, { duration: 0 });
			setTimeout(() => c.set(parsed[i].number), 150 + i * 160);
		});
	}
	// Hide the lines only once JS runs, so they are visible without it.
	onMount(() => (armed = true));
</script>

<ul class="space-y-10 lg:space-y-12" use:inview={{ threshold: 0.25, onEnter: start }} class:armed>
	{#each parsed as stat, i (stat.value)}
		<li style="--part: {stat.part ?? 1}; --i: {i}">
			<div class="grid items-end gap-x-8 gap-y-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
				<p class="font-display text-4xl font-extralight tabular-nums sm:text-5xl">
					{format.format(Math.round(counters[i].current))}{stat.suffix}
				</p>
				<p class="text-sm text-graphite sm:pb-2">{stat.label}</p>
			</div>
			<div class="dim mt-3" aria-hidden="true">
				<span class="line"></span>
				<span class="ext start"></span><span class="tick start"></span>
				<span class="ext end"></span><span class="tick end"></span>
				{#if stat.part === null}<span class="break"></span>{/if}
			</div>
		</li>
	{/each}
</ul>

<style>
	.dim {
		position: relative;
		height: 16px;
		/* Leave room for the end tick so the full-length line stays inside the column. */
		width: calc(var(--part) * (100% - 6px));
	}
	.line {
		position: absolute;
		inset: 7.5px 0 auto;
		height: 1px;
		background: var(--color-ink);
		transform-origin: left;
	}
	.ext {
		position: absolute;
		top: 0;
		width: 1px;
		height: 16px;
		background: var(--color-graphite);
	}
	/* Architectural tick: a short slash at each end of the dimension line. */
	.tick {
		position: absolute;
		top: 2px;
		width: 1.5px;
		height: 12px;
		background: var(--color-ink);
		rotate: 45deg;
	}
	.start {
		left: 0;
	}
	.end {
		right: 0;
	}
	.tick.start {
		left: -0.5px;
	}
	.tick.end {
		right: -0.5px;
	}
	.break {
		position: absolute;
		left: 50%;
		top: 0;
		width: 28px;
		height: 16px;
		margin-left: -14px;
		background: linear-gradient(var(--color-paper), var(--color-paper)) center / 100% 16px no-repeat;
	}
	.break::after {
		content: '';
		position: absolute;
		inset: 0;
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 16'%3E%3Cpath d='M0 8H8L12 1L16 15L20 8H28' fill='none' stroke='black' stroke-width='1'/%3E%3C/svg%3E");
	}
	/* Drawing: the line grows to its length, end marks appear when it arrives. */
	:global(.js) .armed:not([data-inview]) .line {
		transform: scaleX(0);
	}
	:global(.js) .armed:not([data-inview]) .end,
	:global(.js) .armed:not([data-inview]) .break {
		opacity: 0;
	}
	.line {
		transition: transform 1.3s var(--ease-settle);
		transition-delay: calc(0.15s + var(--i) * 0.16s);
	}
	.end,
	.break {
		transition: opacity 0.3s;
		transition-delay: calc(1.1s + var(--i) * 0.16s);
	}
	@media (prefers-reduced-motion: reduce) {
		.line,
		.end,
		.break {
			transition: none;
		}
	}
</style>
