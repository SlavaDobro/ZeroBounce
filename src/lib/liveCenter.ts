/**
 * Svelte action for touch screens, where nothing can be hovered: marks with data-live
 * the child (matching `selector`) closest to the middle of the screen while scrolling.
 * CSS gives [data-live] the same look as :hover.
 */
export function liveCenter(node: HTMLElement, selector: string) {
	if (
		!matchMedia('(hover: none)').matches ||
		matchMedia('(prefers-reduced-motion: reduce)').matches
	)
		return;
	let frame = 0;
	let current: Element | null = null;
	const update = () => {
		frame = 0;
		const mid = innerHeight * 0.55;
		let best: Element | null = null;
		let bestDistance = innerHeight * 0.3;
		for (const el of node.querySelectorAll(selector)) {
			const r = el.getBoundingClientRect();
			const d = Math.abs(r.top + r.height / 2 - mid);
			if (d < bestDistance) [best, bestDistance] = [el, d];
		}
		if (best !== current) {
			current?.removeAttribute('data-live');
			best?.setAttribute('data-live', '');
			current = best;
		}
	};
	const schedule = () => (frame ||= requestAnimationFrame(update));
	update();
	addEventListener('scroll', schedule, { passive: true });
	return {
		destroy() {
			removeEventListener('scroll', schedule);
			cancelAnimationFrame(frame);
		}
	};
}
