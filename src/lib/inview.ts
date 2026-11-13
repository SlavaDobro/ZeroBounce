/**
 * Svelte action: sets data-inview on the element the first time it scrolls into view.
 * CSS keyed on [data-inview] draws lines and starts counters (see layout.css).
 * With reduced motion or without IntersectionObserver the element is marked at once.
 */
export function inview(
	node: HTMLElement,
	options: { threshold?: number; onEnter?: () => void } = {}
) {
	const enter = () => {
		node.dataset.inview = '';
		options.onEnter?.();
	};
	if (
		typeof IntersectionObserver === 'undefined' ||
		matchMedia('(prefers-reduced-motion: reduce)').matches
	) {
		enter();
		return;
	}
	const observer = new IntersectionObserver(
		(entries) => {
			if (entries.some((e) => e.isIntersecting)) {
				enter();
				observer.disconnect();
			}
		},
		{ threshold: options.threshold ?? 0.2 }
	);
	observer.observe(node);
	return { destroy: () => observer.disconnect() };
}
