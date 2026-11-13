<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/config/site.ts';

	let {
		title,
		description = site.description,
		noindex = false
	}: { title?: string; description?: string; noindex?: boolean } = $props();

	const fullTitle = $derived(
		title ? `${title} — ${site.name}` : `${site.name} — ${site.description}`
	);
	const canonical = $derived(new URL(page.url.pathname, site.url).href);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}<meta name="robots" content="noindex" />{/if}
	<meta property="og:type" content="website" />
	<meta property="og:locale" content={site.locale} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
</svelte:head>
