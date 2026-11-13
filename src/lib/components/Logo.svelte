<script lang="ts">
	/**
	 * Zero Bounce wordmark set in type, with the «O» of BOUNCE drawn as the target.
	 * The violet dot drops into it on load; hovering the link sends out one ring.
	 */
	let { size = 'md' }: { size?: 'md' | 'lg' } = $props();
</script>

<span class="logo" class:lg={size === 'lg'}>
	<span aria-hidden="true">ZERO&nbsp;B</span><svg class="o" viewBox="0 0 40 40" aria-hidden="true">
		<circle class="ring" cx="20" cy="20" r="17" />
		<circle class="inner ring" cx="20" cy="20" r="11" />
		<circle class="ripple" cx="20" cy="20" r="6" />
		<circle class="dot" cx="20" cy="20" r="6" />
	</svg><span aria-hidden="true">UNCE</span>
	<span class="sr-only">Zero Bounce</span>
</span>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-display);
		font-weight: 450;
		font-size: 1.0625rem;
		letter-spacing: 0.16em;
		line-height: 1;
		color: var(--color-ink);
		white-space: nowrap;
	}
	.logo.lg {
		font-size: 1.375rem;
	}
	.o {
		width: 1.08em;
		height: 1.08em;
		margin: 0 0.16em 0 0.02em;
		overflow: visible;
	}
	.ring {
		fill: none;
		stroke: currentColor;
		stroke-width: 2.4;
	}
	.inner {
		stroke-width: 1.4;
		stroke-dasharray: 2.5 2.5;
	}
	.dot {
		fill: var(--color-visit);
		transform-box: fill-box;
		transform-origin: center;
	}
	.ripple {
		fill: none;
		stroke: var(--color-visit);
		stroke-width: 1.5;
		opacity: 0;
		transform-box: fill-box;
		transform-origin: center;
	}
	@media (prefers-reduced-motion: no-preference) {
		.dot {
			animation: logo-drop 0.6s var(--ease-land) 0.15s both;
		}
		:global(a:hover) > .logo .ripple,
		:global(a:focus-visible) > .logo .ripple {
			animation: logo-ripple 0.8s var(--ease-settle);
		}
	}
	@keyframes logo-drop {
		from {
			opacity: 0;
			transform: scale(4);
			filter: blur(3px);
		}
	}
	@keyframes logo-ripple {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(3.6);
		}
	}
</style>
