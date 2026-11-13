<script lang="ts">
	let { items }: { items: { q: string; a: string }[] } = $props();
</script>

<div class="border-t border-ink/25">
	{#each items as item (item.q)}
		<details class="group border-b border-ink/25">
			<summary class="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg">
				<span>{item.q}</span>
				<span class="icon relative mt-2 size-3.5 shrink-0" aria-hidden="true"></span>
			</summary>
			<p class="prose-zb pb-6 text-graphite">{item.a}</p>
		</details>
	{/each}
</div>

<style>
	summary::-webkit-details-marker {
		display: none;
	}
	.icon::before,
	.icon::after {
		content: '';
		position: absolute;
		inset: 50% 0 auto;
		height: 1.5px;
		margin-top: -0.75px;
		background: currentColor;
		transition: rotate 0.25s var(--ease-settle);
	}
	.icon::after {
		rotate: 90deg;
	}
	details[open] .icon::after {
		rotate: 0deg;
	}
	summary:hover {
		color: var(--color-visit);
	}
</style>
