<script lang="ts">
	import Button from '#lib/components/Button.svelte';
	import Container from '#lib/components/Container.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { groupTitles } from '#lib/config/pages.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<!-- noindex until the page has real content, so drafts do not reach search results. -->
<Seo title={data.page.title} noindex />

<section class="py-20">
	<Container>
		<nav aria-label="Хлебные крошки" class="mb-6 text-sm text-ink-muted">
			<a href="/" class="hover:text-brand">Главная</a>
			<span aria-hidden="true"> / </span>
			<span>{groupTitles[data.page.group]}</span>
		</nav>
		<h1 class="max-w-3xl text-4xl leading-tight font-bold text-balance sm:text-5xl">
			{data.page.title}
		</h1>
		<p class="mt-6 max-w-2xl text-lg text-ink-muted">Страница в разработке.</p>
		<Button href="/contacts/" class="mt-10">Обсудить задачу</Button>
	</Container>
</section>
