<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary';
	type Props = { variant?: Variant; children: Snippet; class?: string } & (
		({ href: string } & HTMLAnchorAttributes) | ({ href?: undefined } & HTMLButtonAttributes)
	);

	let { variant = 'primary', children, class: className = '', ...rest }: Props = $props();

	const styles: Record<Variant, string> = {
		primary: 'bg-brand text-white hover:bg-brand-hover',
		secondary: 'border border-line bg-white text-ink hover:border-brand hover:text-brand'
	};
	const classes = $derived([
		'inline-flex items-center justify-center gap-2 rounded-button px-7 py-3.5 text-base font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
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
