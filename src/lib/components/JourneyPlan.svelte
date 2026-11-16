<script lang="ts">
	/**
	 * The customer path drawn as a floor plan: five rooms, one per stage.
	 * The dot enters through the only door and walks room to room as the page scrolls.
	 * The last room has no exit: the customer stays.
	 */
	import { onMount } from 'svelte';
	import { stages } from '#lib/content/journey.ts';
	import { serviceHref, servicesByStage } from '#lib/content/services.ts';
	import { link } from '#lib/link.ts';

	// Route through the doors: entrance, room centres and the openings between rooms.
	const route: [number, number][] = [
		[-70, 200],
		[20, 200],
		[100, 200],
		[200, 105],
		[300, 200],
		[400, 295],
		[500, 200],
		[600, 105],
		[700, 200],
		[800, 295],
		[900, 200]
	];
	const roomCentres = [2, 4, 6, 8, 10];

	/** Smooth curve through the points (Catmull-Rom converted to cubic Bézier). */
	function spline(points: [number, number][]) {
		let d = `M${points[0][0]} ${points[0][1]}`;
		for (let i = 0; i < points.length - 1; i++) {
			const p0 = points[i - 1] ?? points[i];
			const [p1, p2] = [points[i], points[i + 1]];
			const p3 = points[i + 2] ?? p2;
			const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
			const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
			d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
		}
		return d;
	}
	const routePath = spline(route);

	let pathEl: SVGPathElement | undefined = $state();
	let items: HTMLElement[] = $state([]);
	let length = $state(0);
	/** Position along the route, 0…1. */
	let progress = $state(0);
	let active = $state(-1);
	let dot = $state({ x: route[0][0], y: route[0][1] });
	/** Route fractions where the dot stands in the centre of each room. */
	let stops: number[] = [];

	$effect(() => {
		if (!pathEl || !length) return;
		const point = pathEl.getPointAtLength(progress * length);
		dot = { x: point.x, y: point.y };
	});

	onMount(() => {
		if (!pathEl) return;
		length = pathEl.getTotalLength();
		// Find the route fraction closest to each room centre.
		const samples = Array.from({ length: 401 }, (_, i) => {
			const p = pathEl!.getPointAtLength((i / 400) * length);
			return { t: i / 400, x: p.x, y: p.y };
		});
		stops = roomCentres.map((index) => {
			const [x, y] = route[index];
			return samples.reduce((best, s) =>
				Math.hypot(s.x - x, s.y - y) < Math.hypot(best.x - x, best.y - y) ? s : best
			).t;
		});

		const reduce = matchMedia('(prefers-reduced-motion: reduce)');
		let frame = 0;
		const update = () => {
			frame = 0;
			const anchor = innerHeight * 0.55;
			const centres = items.map((el) => {
				const r = el.getBoundingClientRect();
				return r.top + Math.min(r.height, innerHeight) / 2;
			});
			const entrance = (items[0]?.getBoundingClientRect().top ?? 0) - innerHeight * 0.15;
			const keys = [entrance, ...centres];
			const fractions = [0, ...stops];
			// f: -1 before the entrance … 4 in the last room, continuous in between.
			let f = -1;
			if (anchor >= keys[keys.length - 1]) f = stages.length - 1;
			else
				for (let i = 0; i < keys.length - 1; i++) {
					if (anchor >= keys[i] && anchor < keys[i + 1]) {
						f = i - 1 + (anchor - keys[i]) / (keys[i + 1] - keys[i]);
						break;
					}
				}
			active = f < -0.5 ? -1 : Math.min(stages.length - 1, Math.round(f));
			if (reduce.matches) {
				// No gliding: the dot stands in the room of the current stage.
				progress = active < 0 ? 0 : stops[active];
				return;
			}
			const i = Math.floor(f) + 1;
			const t = f + 1 - Math.floor(f + 1);
			const a = fractions[Math.max(0, Math.min(fractions.length - 1, i))];
			const b = fractions[Math.max(0, Math.min(fractions.length - 1, i + 1))];
			progress = f <= -1 ? 0 : a + (b - a) * t;
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		addEventListener('scroll', schedule, { passive: true });
		addEventListener('resize', schedule);
		return () => {
			removeEventListener('scroll', schedule);
			removeEventListener('resize', schedule);
			cancelAnimationFrame(frame);
		};
	});

	const rooms = [0, 1, 2, 3, 4];
	// Door openings in the inner walls alternate top and bottom: [wall x, gap from, gap to].
	const doors: [number, number, number][] = [
		[200, 70, 140],
		[400, 260, 330],
		[600, 70, 140],
		[800, 260, 330]
	];
</script>

<div class="journey grid gap-x-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
	<!-- The plan stays on screen while the stages scroll past. -->
	<div
		class="plan-wrap sticky top-16 z-10 -mx-4 bg-paper/95 px-4 pt-3 pb-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:top-[calc(50vh-8rem)] lg:mx-0 lg:self-start lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
	>
		<svg
			class="plan"
			viewBox="-80 0 1100 400"
			role="img"
			aria-label="План клиентского пути: пять комнат-этапов"
		>
			<defs>
				<pattern
					id="jp-hatch"
					width="9"
					height="9"
					patternUnits="userSpaceOnUse"
					patternTransform="rotate(-45)"
				>
					<path d="M0 4.5H9" stroke="currentColor" stroke-width="1.2" />
				</pattern>
			</defs>

			{#each rooms as i (i)}
				<rect
					class="room"
					class:is-active={active === i}
					class:is-past={active > i}
					x={i * 200 + 4}
					y="44"
					width="192"
					height="312"
				/>
			{/each}

			<!-- Outer walls; the entrance is a gap in the left wall. -->
			<path class="wall" d="M0 165V40H1000V360H0V235" />
			<!-- Inner walls with door openings -->
			{#each doors as [x, from, to] (x)}
				{@const top = from < 200}
				{@const hinge = top ? from : to}
				{@const free = top ? to : from}
				<path class="wall" d="M{x} 40V{from}M{x} {to}V360" />
				<!-- Open door leaf and its swing arc, from the hinge into the next room -->
				<path class="leaf" d="M{x} {hinge}H{x + 70}" />
				<path class="swing" d="M{x} {free}A70 70 0 0 {top ? 0 : 1} {x + 70} {hinge}" />
			{/each}
			<path class="leaf" d="M0 165H70" />
			<path class="swing" d="M0 235A70 70 0 0 0 70 165" />
			<!-- Windows on the top wall -->
			{#each rooms as i (i)}
				<path
					class="window"
					d="M{i * 200 + 60} 36H{i * 200 + 140}M{i * 200 + 60} 44H{i * 200 + 140}"
				/>
			{/each}

			{#each rooms as i (i)}
				<text
					class="room-no"
					class:is-active={active === i}
					x={i * 200 + 180}
					y="118"
					text-anchor="end">{i + 1}</text
				>
			{/each}

			<path bind:this={pathEl} class="route" d={routePath} />
			<path class="trail" d={routePath} pathLength="1" style="stroke-dashoffset: {1 - progress}" />
			<circle class="dot" cx={dot.x} cy={dot.y} r="14" />
		</svg>
	</div>

	<ol class="stages">
		{#each stages as stage, i (stage.id)}
			<li
				bind:this={items[i]}
				class="stage border-t border-ink/20 py-10 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:py-16"
				class:is-active={active === i}
			>
				<p class="stage-no font-display text-sm font-light text-graphite">Этап {i + 1}</p>
				<h3 class="mt-3 text-2xl lg:text-3xl">{stage.title}</h3>
				<p class="mt-4 max-w-md text-graphite">{stage.text}</p>
				<ul class="mt-6 flex flex-wrap gap-2">
					{#each servicesByStage(stage.id) as service (service.slug)}
						<li>
							<a
								href={link(serviceHref(service))}
								class="inline-flex min-h-11 items-center rounded-full border border-ink/25 px-4 text-sm transition-colors hover:border-visit hover:text-visit"
								>{service.navTitle}</a
							>
						</li>
					{/each}
				</ul>
				<p class="result mt-6 max-w-md border-l-2 pl-4 text-sm">
					<span class="block text-xs text-graphite">Результат для бизнеса</span>
					{stage.result}
				</p>
			</li>
		{/each}
	</ol>
</div>

<style>
	.plan {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
		color: var(--color-ink);
	}
	/*
	 * Phones and tablets: the plan sticks above the stage texts, so it may take at most
	 * about a third of the screen — otherwise in landscape it would cover the texts.
	 */
	@media (max-width: 1023px) {
		.plan {
			max-height: 32vh;
		}
	}
	.room {
		fill: transparent;
		transition: fill 0.35s;
	}
	.room.is-active {
		fill: url(#jp-hatch);
		color: color-mix(in srgb, var(--color-visit) 45%, transparent);
	}
	.room.is-past {
		fill: color-mix(in srgb, var(--color-ink) 4%, transparent);
	}
	.wall {
		fill: none;
		stroke: var(--color-ink);
		stroke-width: 8;
		stroke-linecap: square;
	}
	.swing {
		fill: none;
		stroke: var(--color-graphite);
		stroke-width: 1;
		stroke-dasharray: 3 4;
	}
	.leaf {
		stroke: var(--color-ink);
		stroke-width: 2;
	}
	.window {
		stroke: var(--color-ink);
		stroke-width: 1;
	}
	.room-no {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: 64px;
		fill: var(--color-hatch);
		transition: fill 0.35s;
	}
	.room-no.is-active {
		fill: var(--color-visit);
	}
	.route {
		fill: none;
		stroke: var(--color-graphite);
		stroke-width: 1.25;
		stroke-dasharray: 2 7;
		stroke-linecap: round;
	}
	.trail {
		fill: none;
		stroke: var(--color-visit);
		stroke-width: 3;
		stroke-linecap: round;
		stroke-dasharray: 1;
	}
	.dot {
		fill: var(--color-visit);
		stroke: var(--color-paper);
		stroke-width: 4;
	}
	.stage {
		transition: opacity 0.35s;
	}
	.result {
		border-color: var(--color-hatch);
		transition: border-color 0.35s;
	}
	.stage.is-active .result {
		border-color: var(--color-visit);
	}
	.stage.is-active .stage-no {
		color: var(--color-visit);
	}
	@media (min-width: 1024px) {
		.stage:not(.is-active) {
			opacity: 0.45;
		}
	}
	@media (max-width: 639px) {
		.room-no {
			font-size: 76px;
		}
	}
</style>
