<script lang="ts">
	/**
	 * The «O» from the Zero Bounce logo drawn as a target in plan view.
	 * On load the violet dot (the customer) drops onto the page from above the viewer
	 * and lands in the centre without bouncing. CSS only, so it also plays without JS.
	 */
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';

	let { class: className = '' }: { class?: string } = $props();
	const id = 'ht';

	/*
	 * Depth on pointer move: the drawing is a stack of layers seen from above. Layers closer
	 * to the viewer (the dot) shift more than the outer ring, so the target reads as volume.
	 */
	const tilt = new Spring({ x: 0, y: 0 }, { stiffness: 0.08, damping: 0.35 });
	let figure: HTMLElement | undefined = $state();
	onMount(() => {
		const fine = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
		if (!fine.matches) return;
		const move = (e: PointerEvent) => {
			const r = figure!.getBoundingClientRect();
			const x = (e.clientX - (r.left + r.width / 2)) / innerWidth;
			const y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
			tilt.target = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
		};
		const leave = () => (tilt.target = { x: 0, y: 0 });
		addEventListener('pointermove', move);
		document.addEventListener('pointerleave', leave);
		return () => {
			removeEventListener('pointermove', move);
			document.removeEventListener('pointerleave', leave);
		};
	});
	const shift = (depth: number) =>
		`translate(${(tilt.current.x * depth).toFixed(2)}px, ${(tilt.current.y * depth).toFixed(2)}px)`;
</script>

<figure class={['hero-target', className]} bind:this={figure}>
	<svg viewBox="0 0 520 520" role="img" aria-labelledby="{id}-title">
		<title id="{id}-title">Мишень: точка-клиент в центре</title>
		<defs>
			<pattern id="{id}-v" width="7" height="7" patternUnits="userSpaceOnUse">
				<path d="M3.5 0V7" stroke="currentColor" stroke-width="1" />
			</pattern>
			<pattern
				id="{id}-d"
				width="6"
				height="6"
				patternUnits="userSpaceOnUse"
				patternTransform="rotate(-45)"
			>
				<path d="M0 3H6" stroke="currentColor" stroke-width="1" />
			</pattern>
			<mask id="{id}-outer">
				<circle cx="260" cy="260" r="236" fill="#fff" />
				<circle cx="260" cy="260" r="172" fill="#000" />
			</mask>
			<mask id="{id}-inner">
				<circle cx="260" cy="260" r="172" fill="#fff" />
				<circle cx="260" cy="260" r="104" fill="#000" />
			</mask>
		</defs>

		<g class="target">
			<!-- Centre lines, dash-dot as on drawings -->
			<path class="axis" d="M260 4V516M4 260H516" />
			<g class="hatch-bands">
				<rect width="520" height="520" fill="url(#{id}-v)" mask="url(#{id}-outer)" />
				<g style:transform={shift(10)}>
					<rect width="520" height="520" fill="url(#{id}-d)" mask="url(#{id}-inner)" />
				</g>
			</g>
			<circle class="r1 ring" cx="260" cy="260" r="236" pathLength="1" />
			<g style:transform={shift(10)}>
				<circle class="r2 ring" cx="260" cy="260" r="172" pathLength="1" />
			</g>
			<g style:transform={shift(20)}>
				<circle class="r3 ring" cx="260" cy="260" r="104" pathLength="1" />
				<circle class="core" cx="260" cy="260" r="104" />
				<circle class="socket" cx="260" cy="260" r="40" />
			</g>
		</g>

		<g style:transform={shift(32)}>
			<circle class="impact" cx="260" cy="260" r="34" />
			<circle class="dot" cx="260" cy="260" r="32" />
		</g>
	</svg>
</figure>

<style>
	.hero-target {
		color: var(--color-ink);
	}
	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}
	.axis {
		stroke: var(--color-graphite);
		stroke-width: 0.75;
		stroke-dasharray: 18 4 2 4;
		fill: none;
	}
	.hatch-bands {
		color: var(--color-ink);
	}
	.ring {
		fill: none;
		stroke: var(--color-ink);
		stroke-width: 1.25;
	}
	.core {
		fill: var(--color-paper);
		stroke: none;
	}
	.socket {
		fill: none;
		stroke: var(--color-graphite);
		stroke-width: 0.75;
		stroke-dasharray: 3 4;
	}
	.dot {
		fill: var(--color-visit);
		transform-box: fill-box;
		transform-origin: center;
	}
	.impact {
		fill: none;
		stroke: var(--color-visit);
		stroke-width: 1.5;
		opacity: 0;
		transform-box: fill-box;
		transform-origin: center;
	}
	.target {
		transform-box: fill-box;
		transform-origin: center;
	}

	@media (prefers-reduced-motion: no-preference) {
		/* 1. The drawing appears: rings are drawn, hatching fades in. */
		.ring {
			stroke-dasharray: 1;
			animation: draw 1s var(--ease-settle) both;
		}
		.r2 {
			animation-delay: 0.12s;
		}
		.r3 {
			animation-delay: 0.24s;
		}
		.hatch-bands,
		.axis {
			animation: fade 0.8s ease-out 0.35s both;
		}
		/* 2. The dot falls towards the page (top view: it shrinks as it nears) … */
		.dot {
			animation: drop 0.62s var(--ease-land) 0.9s both;
		}
		/* 3. … lands without a bounce: the drawing gives a little, one ring spreads and fades. */
		/* No backwards fill: before the impact the drawing and the ring stay at rest. */
		.target {
			animation: give 0.45s var(--ease-settle) 1.52s;
		}
		.impact {
			animation: ripple 0.9s var(--ease-settle) 1.52s forwards;
		}
	}

	@keyframes draw {
		from {
			stroke-dashoffset: 1;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
	}
	@keyframes drop {
		0% {
			opacity: 0;
			transform: scale(5.5);
			filter: blur(10px);
		}
		25% {
			opacity: 0.85;
		}
		100% {
			opacity: 1;
			transform: scale(1);
			filter: blur(0);
		}
	}
	@keyframes give {
		0% {
			transform: scale(0.982);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes ripple {
		0% {
			opacity: 0.9;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(5.2);
		}
	}
</style>
