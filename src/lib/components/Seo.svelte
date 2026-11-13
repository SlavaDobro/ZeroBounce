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
	// Absolute URLs need the domain; until site.url is set they are left out.
	const canonical = $derived(site.url ? new URL(page.url.pathname, site.url).href : '');
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if canonical}<link rel="canonical" href={canonical} />{/if}
	{#if noindex}<meta name="robots" content="noindex" />{/if}
	<meta property="og:type" content="website" />
	<meta property="og:locale" content={site.locale} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	{#if canonical}<meta property="og:url" content={canonical} />{/if}
</svelte:head>
