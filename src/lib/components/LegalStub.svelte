<script lang="ts">
	/** Placeholder for legal documents until the new versions are approved. */
	import Container from './Container.svelte';
	import Seo from './Seo.svelte';
	import { site } from '#lib/config/site.ts';

	let { title }: { title: string } = $props();
</script>

<Seo {title} noindex />

<section class="pt-12 pb-24 lg:pt-20">
	<Container>
		<h1 class="max-w-3xl text-[clamp(1.9rem,4vw,3rem)]">{title}</h1>
		<p class="mt-8 max-w-xl text-lg text-graphite">
			Документ готовится и будет опубликован до запуска сайта. По вопросам обработки данных напишите
			нам в <a class="link text-ink" href={site.telegram}>Telegram {site.telegramHandle}</a>.
		</p>
	</Container>
</section>
