<script lang="ts">
	/**
	 * Touch feedback: where a finger taps a link or button, the violet dot lands and
	 * one ring spreads out — the same "landing without a bounce" as in the hero.
	 * Mouse and pen are left alone: they have hover states.
	 */
	import { onMount } from 'svelte';

	let rings: { id: number; x: number; y: number }[] = $state([]);
	let next = 0;

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const down = (e: PointerEvent) => {
			if (e.pointerType !== 'touch') return;
			const target = (e.target as Element | null)?.closest(
				'a[href], button, summary, label, [role="button"]'
			);
			if (!target) return;
			const ring = { id: next++, x: e.clientX, y: e.clientY };
			rings.push(ring);
			setTimeout(() => (rings = rings.filter((r) => r.id !== ring.id)), 700);
		};
		addEventListener('pointerdown', down, { passive: true });
		return () => removeEventListener('pointerdown', down);
	});
</script>

<div class="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
	{#each rings as ring (ring.id)}
		<span class="tap" style="left: {ring.x}px; top: {ring.y}px">
			<span class="ring"></span>
			<span class="dot"></span>
		</span>
	{/each}
</div>

<style>
	.tap {
		position: absolute;
		width: 0;
		height: 0;
	}
	.ring,
	.dot {
		position: absolute;
		left: -10px;
		top: -10px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	.ring {
		border: 1.5px solid var(--color-visit);
		animation: tap-ring 0.65s var(--ease-settle) forwards;
	}
	.dot {
		background: var(--color-visit);
		animation: tap-dot 0.5s var(--ease-settle) forwards;
	}
	@keyframes tap-ring {
		from {
			opacity: 0.9;
			transform: scale(0.4);
		}
		to {
			opacity: 0;
			transform: scale(3.4);
		}
	}
	@keyframes tap-dot {
		0% {
			opacity: 0;
			transform: scale(2.2);
		}
		30% {
			opacity: 0.85;
			transform: scale(0.55);
		}
		100% {
			opacity: 0;
			transform: scale(0.55);
		}
	}
</style>
