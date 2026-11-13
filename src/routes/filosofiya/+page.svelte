<script lang="ts">
	import { inview } from '#lib/inview.ts';
	import Container from '#lib/components/Container.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import StageStrip from '#lib/components/StageStrip.svelte';
	import { stages } from '#lib/content/journey.ts';
	import { philosophy, stageDetails } from '#lib/content/philosophy.ts';
</script>

<Seo title="Подход" description={philosophy.lead} />

<section class="pt-12 pb-16 lg:pt-20 lg:pb-24">
	<Container class="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
		<div>
			<h1 class="text-[clamp(2.2rem,5vw,4rem)]">Подход Zero Bounce</h1>
			<p class="mt-8 max-w-2xl text-lg">{philosophy.lead}</p>
		</div>
		<div class="lg:pt-4">
			<h2 class="font-sans text-lg font-medium tracking-normal">{philosophy.theory.title}</h2>
			<p class="prose-zb mt-3 text-graphite">{philosophy.theory.text}</p>
		</div>
	</Container>
</section>

<section use:inview class="draw-rule py-16 lg:py-20" aria-labelledby="found-title">
	<Container class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
		<h2 id="found-title" class="text-2xl lg:text-3xl">Фундамент философии</h2>
		<ul class="grid grid-cols-1 border-t border-l border-ink/25 sm:grid-cols-2">
			{#each philosophy.foundation as item (item)}
				<li class="border-r border-b border-ink/25 px-5 py-4">{item}</li>
			{/each}
		</ul>
	</Container>
</section>

<section use:inview class="draw-rule pt-16 lg:pt-20" aria-labelledby="arch-title">
	<Container>
		<h2 id="arch-title" class="max-w-3xl text-3xl lg:text-4xl">Архитектура клиентского пути</h2>
	</Container>
	{#each stages as stage, i (stage.id)}
		{@const detail = stageDetails[stage.id]}
		<article class="mt-14 border-t border-ink/20 py-14 lg:mt-16 lg:py-20">
			<Container class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
				<div class="space-y-4">
					<p class="text-sm text-graphite">Этап {i + 1}</p>
					<h3 class="text-2xl lg:text-3xl">{stage.title}</h3>
					<div class="max-w-[16rem] pt-2"><StageStrip stage={stage.id} /></div>
				</div>
				<div>
					<h4 class="text-lg font-medium">{detail.heading}</h4>
					<p class="mt-4 max-w-2xl text-lg">{detail.text}</p>
					<ul class="mt-8 space-y-4">
						{#each detail.principles as principle (principle)}
							{@const [name, ...rest] = principle.split(': ')}
							<li class="grid gap-1 border-l border-ink/30 pl-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
								<span class="font-medium">{name}</span>
								<span class="text-graphite">{rest.join(': ')}</span>
							</li>
						{/each}
					</ul>
					<p class="mt-8 max-w-2xl border-l-2 border-visit pl-5">
						<span class="block text-sm text-graphite">Бизнес-метрика</span>
						{detail.metric}
					</p>
				</div>
			</Container>
		</article>
	{/each}
</section>

<section use:inview class="draw-rule py-16 lg:py-24">
	<Container class="grid gap-12 lg:grid-cols-2 lg:gap-20">
		<div>
			<h2 class="text-2xl lg:text-3xl">{philosophy.why.title}</h2>
			<p class="prose-zb mt-6 text-lg text-graphite">{philosophy.why.text}</p>
		</div>
		<div class="border-t border-ink pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
			<p class="font-display text-2xl leading-snug font-light">{philosophy.closing.title}</p>
			<p class="mt-4 text-lg text-graphite">{philosophy.closing.text}</p>
		</div>
	</Container>
</section>

<CtaBand />
