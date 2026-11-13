<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	/** primary: black capsule · outline: ink border · light: for dark sections. */
	type Variant = 'primary' | 'outline' | 'light';
	type Props = { variant?: Variant; children: Snippet; class?: string } & (
		({ href: string } & HTMLAnchorAttributes) | ({ href?: undefined } & HTMLButtonAttributes)
	);

	let { variant = 'primary', children, class: className = '', ...rest }: Props = $props();

	const styles: Record<Variant, string> = {
		primary: 'bg-ink text-paper hover:bg-visit',
		outline: 'border border-ink text-ink hover:border-visit hover:text-visit',
		light: 'bg-paper text-ink hover:bg-visit hover:text-paper'
	};
	const classes = $derived([
		'inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-sm font-medium tracking-[0.01em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40',
		styles[variant],
		className
	]);
</script>

{#if rest.href !== undefined}
	<a class={classes} {...rest as HTMLAnchorAttributes}>{@render children()}</a>
{:else}
	<button type="button" class={classes} {...rest as HTMLButtonAttributes}
		>{@render children()}</button
	>
{/if}
