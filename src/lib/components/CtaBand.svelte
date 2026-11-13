<script lang="ts">
	import { inview } from '#lib/inview.ts';
	import { auditHref } from '#lib/config/pages.ts';
	import { site } from '#lib/config/site.ts';
	import { link } from '#lib/link.ts';
	import Button from './Button.svelte';
	import Container from './Container.svelte';
</script>

<section use:inview class="draw-rule py-20 lg:py-28" aria-labelledby="cta-title">
	<Container>
		<h2 id="cta-title" class="max-w-4xl text-3xl sm:text-4xl">
			Перейдём от хаоса к системе<span class="stop" aria-hidden="true"></span><span class="sr-only"
				>.</span
			>
		</h2>
		<p class="mt-6 max-w-xl text-lg text-graphite">
			Оставьте заявку — проведём аудит и предложим конкретный план роста.
		</p>
		<div class="mt-10 flex flex-wrap gap-3">
			<Button href={link(auditHref)}>Запросить аудит</Button>
			<Button href={site.telegram} variant="outline">Telegram {site.telegramHandle}</Button>
		</div>
	</Container>
</section>

<style>
	/* The customer's dot ends the question: it arrived and stayed. */
	.stop {
		display: inline-block;
		width: 0.32em;
		height: 0.32em;
		margin-left: 0.12em;
		border-radius: 50%;
		background: var(--color-visit);
		vertical-align: baseline;
	}
</style>
