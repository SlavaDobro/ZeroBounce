<script lang="ts">
	import { inview } from '#lib/inview.ts';
	import Button from '#lib/components/Button.svelte';
	import Container from '#lib/components/Container.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Faq from '#lib/components/Faq.svelte';
	import Process from '#lib/components/Process.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import StageStrip from '#lib/components/StageStrip.svelte';
	import { auditHref, serviceGroups } from '#lib/config/pages.ts';
	import { site } from '#lib/config/site.ts';
	import { serviceHref, servicesByStage } from '#lib/content/services.ts';
	import { link } from '#lib/link.ts';
	import { liveCenter } from '#lib/liveCenter.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const service = $derived(data.service);
	// Plain group name, the same as in the menu.
	const stageTitle = $derived(serviceGroups.find((g) => g.id === service.stage)?.title ?? '');
	const related = $derived(servicesByStage(service.stage).filter((s) => s.slug !== service.slug));
</script>

<Seo title={service.title} description={service.lead} />

<section class="pt-10 pb-16 lg:pt-14 lg:pb-24">
	<Container>
		<nav aria-label="Хлебные крошки" class="text-sm text-graphite">
			<a class="link -my-2 inline-block py-2" href={link('/uslugi/')}>Услуги</a>
			<span aria-hidden="true">/</span>
			<span>{stageTitle}</span>
		</nav>
		<div
			class="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-20"
		>
			<div>
				{#if service.tagline}<p class="text-lg text-graphite">{service.tagline}</p>{/if}
				<h1 class="mt-3 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.08]">{service.title}</h1>
				<p class="mt-6 max-w-2xl text-base sm:mt-8 sm:text-lg">{service.lead}</p>
				<div class="mt-10 flex flex-wrap gap-3">
					<Button href={link(auditHref)}>Обсудить задачу</Button>
					<Button href={site.telegram} variant="outline">Написать в Telegram</Button>
				</div>
			</div>
			<StageStrip stage={service.stage} />
		</div>
	</Container>
</section>

{#if service.includes.length}
	<section use:inview class="draw-rule py-16 lg:py-24" aria-labelledby="inc-title">
		<Container class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
			<h2 id="inc-title" class="text-2xl lg:text-3xl">Что входит</h2>
			<ul class="grid border-t border-ink/20 sm:grid-cols-2" use:liveCenter={'.inc'}>
				{#each service.includes as item (item)}
					<li class="inc flex gap-4 border-b border-ink/20 py-4 sm:odd:pr-6 sm:even:pl-6">
						<span class="bullet mt-2.5 size-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true"
						></span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</Container>
	</section>
{/if}

{#each service.sections as section, i (i)}
	<section class="border-t border-ink/20 py-14 lg:py-20">
		<Container class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
			{#if section.heading}<h2 class="text-xl lg:text-2xl">{section.heading}</h2>{:else}<div
				></div>{/if}
			<div>
				{#if section.text}<p class="prose-zb text-lg">{section.text}</p>{/if}
				{#if section.list.length}
					<ul class="mt-6 space-y-2 text-graphite">
						{#each section.list as item (item)}<li>{item}</li>{/each}
					</ul>
				{/if}
			</div>
		</Container>
	</section>
{/each}

{#if service.features.length}
	<section use:inview class="draw-rule py-16 lg:py-24">
		<Container>
			<ul class="grid gap-10 md:grid-cols-3 md:gap-0">
				{#each service.features as feature (feature.title)}
					<li class="md:border-l md:border-ink/20 md:px-8 md:first:border-l-0 md:first:pl-0">
						<h3 class="font-sans text-lg font-medium tracking-normal">{feature.title}</h3>
						<p class="mt-3 text-graphite">{feature.text}</p>
					</li>
				{/each}
			</ul>
		</Container>
	</section>
{/if}

{#if service.stats.length}
	<section class="border-t border-ink/20 py-14">
		<Container>
			<ul class="grid gap-10 sm:grid-cols-2">
				{#each service.stats as stat (stat.value)}
					<li>
						<p class="font-display text-4xl font-extralight">{stat.value}</p>
						<p class="mt-2 max-w-xs text-graphite">{stat.label}</p>
					</li>
				{/each}
			</ul>
		</Container>
	</section>
{/if}

{#if service.steps.length}
	<section use:inview class="draw-rule py-16 lg:py-24" aria-labelledby="steps-title">
		<Container>
			<h2 id="steps-title" class="text-2xl lg:text-3xl">Как мы работаем</h2>
			<div class="mt-12">
				<Process steps={service.steps} />
			</div>
		</Container>
	</section>
{/if}

{#if service.faq.length}
	<section use:inview class="draw-rule py-16 lg:py-24" aria-labelledby="faq-title">
		<Container class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
			<h2 id="faq-title" class="text-2xl lg:text-3xl">Вопросы и ответы</h2>
			<Faq items={service.faq} />
		</Container>
	</section>
{/if}

{#if related.length}
	<section use:inview class="draw-rule py-16" aria-labelledby="rel-title">
		<Container class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
			<h2 id="rel-title" class="text-xl">На этом же этапе</h2>
			<ul class="grid border-t border-ink/20 sm:grid-cols-2">
				{#each related as item (item.slug)}
					<li class="border-b border-ink/20 sm:odd:pr-6 sm:even:pl-6">
						<a href={link(serviceHref(item))} class="group block py-4">
							<span class="block font-medium transition-colors group-hover:text-visit"
								>{item.navTitle}</span
							>
							<span class="mt-1 block text-sm text-graphite">{item.short}</span>
						</a>
					</li>
				{/each}
			</ul>
		</Container>
	</section>
{/if}

<CtaBand />

<style>
	/* Phones: the item in the middle of the screen gets the violet dot. */
	.bullet {
		transition:
			background-color 0.3s,
			scale 0.35s var(--ease-settle);
	}
	.inc:global([data-live]) .bullet {
		background: var(--color-visit);
		scale: 1.8;
	}
</style>
