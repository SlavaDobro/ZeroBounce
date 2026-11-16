<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import MobileActions from '#lib/components/MobileActions.svelte';
	import TouchRipple from '#lib/components/TouchRipple.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a
	href="#main"
	class="sr-only z-50 rounded-full bg-ink px-5 py-2.5 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
	>Перейти к содержимому</a
>

<!-- Bottom padding on phones leaves room for the contact bar. -->
<div class="flex min-h-dvh flex-col pb-[4.5rem] lg:pb-0 [@media(max-height:500px)]:pb-0">
	<Header />
	<main id="main" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
<MobileActions />
<TouchRipple />
