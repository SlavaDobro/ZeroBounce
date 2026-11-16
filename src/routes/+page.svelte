<script lang="ts">
	import certificate from '#lib/assets/lvmh-certificate.jpg';
	import Button from '#lib/components/Button.svelte';
	import Calculator from '#lib/components/Calculator.svelte';
	import Container from '#lib/components/Container.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import DimensionStats from '#lib/components/DimensionStats.svelte';
	import HeroTarget from '#lib/components/HeroTarget.svelte';
	import JourneyPlan from '#lib/components/JourneyPlan.svelte';
	import NeedTiles from '#lib/components/NeedTiles.svelte';
	import Niches from '#lib/components/Niches.svelte';
	import Process from '#lib/components/Process.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { auditHref } from '#lib/config/pages.ts';
	import {
		clients,
		experience,
		founder,
		positioning,
		process,
		values
	} from '#lib/content/company.ts';
	import { systemStage } from '#lib/content/journey.ts';
	import { serviceHref, servicesByStage } from '#lib/content/services.ts';
	import { inview } from '#lib/inview.ts';
	import { link } from '#lib/link.ts';

	// Headline words rise from under a baseline one after another on load.
	const headline = ['Комплексный', 'digital-маркетинг', 'под', 'управлением', 'одной', 'команды'];
</script>

<Seo description={positioning.lead} />

<!-- Hero -->
<section class="overflow-hidden">
	<Container
		class="grid items-center gap-12 pt-12 pb-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20 lg:pt-20 lg:pb-24"
	>
		<div>
			<h1 class="text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.12]" aria-label={headline.join(' ')}>
				{#each headline as word, i (word)}
					<span class="word" aria-hidden="true"><span style="--i: {i}">{word}</span></span>
				{/each}
			</h1>
			<p class="mt-8 max-w-xl text-lg text-graphite">{positioning.lead}</p>
			<div class="mt-10 flex flex-wrap gap-3">
				<Button href={link(auditHref)}>Оставить заявку</Button>
				<Button href="#calc" variant="outline">Рассчитать стоимость</Button>
			</div>
		</div>
		<HeroTarget class="mx-auto w-full max-w-[22rem] lg:max-w-[30rem]" />
	</Container>

	<Container>
		<div
			class="flex flex-col gap-6 border-t border-ink/20 py-8 sm:flex-row sm:items-center sm:gap-12"
		>
			<p class="shrink-0 text-sm text-graphite">Нам доверяют</p>
			<ul class="flex flex-wrap items-center gap-x-12 gap-y-6">
				{#each clients as client (client.name)}
					<li>
						<img
							src={client.src}
							alt={client.name}
							width={client.width}
							height={client.height}
							class="h-8 w-auto mix-blend-multiply [filter:grayscale(1)_contrast(1.8)] sm:h-9"
							loading="lazy"
						/>
					</li>
				{/each}
			</ul>
		</div>
	</Container>
</section>

<!-- What do you need: plain-language entry points -->
<section class="draw-rule py-16 lg:py-24" aria-labelledby="needs-title" use:inview>
	<Container>
		<div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
			<h2 id="needs-title" class="text-3xl lg:text-4xl">Что вам нужно?</h2>
			<p class="text-graphite">Выберите задачу — покажем, как её решаем.</p>
		</div>
		<div class="mt-10"><NeedTiles /></div>
		<p class="mt-6 text-graphite">
			Не нашли свою задачу? <a class="link text-ink" href={link('/uslugi/')}>Все услуги</a> или
			<a class="link text-ink" href={link(auditHref)}>опишите её в заявке</a>.
		</p>
	</Container>
</section>

<!-- About -->
<section class="draw-rule py-20 lg:py-28" aria-labelledby="about-title" use:inview>
	<Container class="grid gap-12 lg:grid-cols-2 lg:gap-20">
		<h2 id="about-title" class="text-3xl lg:text-4xl">Мы — ваш внешний отдел маркетинга</h2>
		<div>
			<p class="text-lg">{positioning.about}</p>
			<dl class="mt-10 border-t border-ink/20">
				{#each values as value (value.title)}
					<div class="grid gap-1 border-b border-ink/20 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
						<dt class="font-medium">{value.title}</dt>
						<dd class="text-graphite">{value.text}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</Container>
</section>

<!-- Customer path -->
<section class="draw-rule py-20 lg:py-28" aria-labelledby="path-title" use:inview>
	<Container>
		<div class="max-w-3xl">
			<h2 id="path-title" class="text-3xl lg:text-4xl">
				Как мы ведём клиента от рекламы до повторной покупки
			</h2>
			<p class="mt-6 text-lg text-graphite">
				Путь клиента — как план помещения из пяти комнат. На каждом этапе свои инструменты и
				понятный результат для бизнеса. Листайте вниз: точка-клиент пройдёт все комнаты, а из
				последней не уйдёт.
			</p>
		</div>
		<div class="mt-12 lg:mt-16">
			<JourneyPlan />
		</div>

		<div
			class="mt-16 grid gap-8 border-t border-ink pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
		>
			<div>
				<h3 class="text-xl">На всех этапах</h3>
				<p class="mt-3 max-w-sm text-graphite">{systemStage.text}</p>
			</div>
			<ul class="grid border-t border-ink/20 sm:grid-cols-2">
				{#each servicesByStage('system') as service (service.slug)}
					<li class="border-b border-ink/20 sm:odd:pr-6 sm:even:pl-6">
						<a href={link(serviceHref(service))} class="group block py-4">
							<span class="block font-medium transition-colors group-hover:text-visit"
								>{service.navTitle}</span
							>
							<span class="mt-1 block text-sm text-graphite">{service.short}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</Container>
</section>

<!-- Expertise -->
<section class="draw-rule py-20 lg:py-28" aria-labelledby="niche-title" use:inview>
	<Container>
		<div class="grid gap-6 lg:grid-cols-2 lg:gap-20">
			<h2 id="niche-title" class="min-w-0 text-3xl lg:text-4xl">Работаем с интерьерной отраслью</h2>
			<p class="text-lg text-graphite lg:pt-2">
				Производители и продавцы интерьерных решений: знаем, как покупают мебель, камень, свет и
				декор, и как дилеры, дизайнеры и архитекторы выбирают поставщика.
			</p>
		</div>
		<div class="mt-12">
			<Niches />
		</div>
		<div class="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
			<h3 class="font-sans text-lg font-medium tracking-normal">Также работали с</h3>
			<ul class="columns-1 gap-10 text-graphite sm:columns-2">
				{#each experience as item (item)}
					<li class="break-inside-avoid py-1">{item}</li>
				{/each}
			</ul>
		</div>
	</Container>
</section>

<!-- Figures -->
<section class="draw-rule py-20 lg:py-28" aria-labelledby="stats-title" use:inview>
	<Container>
		<h2 id="stats-title" class="text-3xl lg:text-4xl">Результаты в цифрах</h2>
		<div class="mt-12 lg:mt-16 lg:pl-[33%]"><DimensionStats /></div>
	</Container>
</section>

<!-- Process -->
<section class="draw-rule py-20 lg:py-28" aria-labelledby="process-title" use:inview>
	<Container>
		<h2 id="process-title" class="text-3xl lg:text-4xl">Как начать работу</h2>
		<div class="mt-12 lg:mt-16">
			<Process steps={process} />
		</div>
	</Container>
</section>

<!-- Calculator: the dark sheet -->
<section
	id="calc"
	class="scroll-mt-16 bg-ink py-20 text-paper lg:py-28"
	aria-labelledby="calc-title"
>
	<Container>
		<div class="max-w-3xl">
			<h2 id="calc-title" class="text-3xl lg:text-4xl">Калькулятор стоимости</h2>
			<p class="mt-6 text-lg text-paper/70">
				Отметьте нужные услуги — посчитаем ориентировочную стоимость. При заказе от 200 000 ₽ скидка
				применяется сразу.
			</p>
		</div>
		<div class="mt-12 lg:mt-16">
			<Calculator />
		</div>
	</Container>
</section>

<!-- Founder -->
<section class="py-20 lg:py-28" aria-labelledby="founder-title">
	<Container class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
		<figure class="relative">
			<img
				src={certificate}
				alt="Сертификат INSIDE LVMH Дмитрия Якухина"
				width="1024"
				height="683"
				class="w-full border border-ink/20"
				loading="lazy"
			/>
			<figcaption class="mt-3 text-sm text-graphite">{founder.certificate.title}</figcaption>
		</figure>
		<div>
			<p class="text-sm text-graphite">{founder.role}</p>
			<h2 id="founder-title" class="mt-2 text-3xl lg:text-4xl">{founder.name}</h2>
			<p class="mt-6 text-lg">{founder.text}</p>
			<p class="mt-6 text-graphite">{founder.certificate.text}</p>
			<a class="link mt-6 inline-block py-2" href={link('/team/')}>Команда Zero Bounce</a>
		</div>
	</Container>
</section>

<CtaBand />

<style>
	/* Headline words rise from under their baseline, one after another. */
	.word {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
		padding-bottom: 0.08em;
		margin-bottom: -0.08em;
	}
	/* Word gap: the spans have no text space between them. */
	.word:not(:last-child) {
		margin-right: 0.28em;
	}
	.word > span {
		display: inline-block;
		white-space: nowrap;
	}
	@media (prefers-reduced-motion: no-preference) {
		.word > span {
			animation: word-rise 0.9s var(--ease-settle) both;
			animation-delay: calc(0.1s + var(--i) * 0.07s);
		}
	}
	@keyframes word-rise {
		from {
			translate: 0 105%;
		}
	}
</style>
