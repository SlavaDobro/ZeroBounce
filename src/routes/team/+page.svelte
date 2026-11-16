<script lang="ts">
	import { inview } from '#lib/inview.ts';
	import certificate from '#lib/assets/lvmh-certificate.jpg';
	import Container from '#lib/components/Container.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { founder, team } from '#lib/content/company.ts';
	import { link } from '#lib/link.ts';

	const united = [
		{
			title: 'Профессиональная экспертиза',
			text: 'Специалисты с практическим опытом в digital-маркетинге, аналитике, разработке и автоматизации.'
		},
		{
			title: 'Единая команда',
			text: 'Каждый проект ведёт команда профильных экспертов, которые работают синхронно ради общей цели.'
		},
		{
			title: 'Ответственность за результат',
			text: 'Отвечаем не только за качество своей работы, но и за итоговый результат клиента.'
		}
	];
</script>

<Seo
	title="Команда"
	description="Команда Zero Bounce: маркетологи, SEO-специалисты, аналитики, разработчик, интегратор и аудитор работают над проектом синхронно."
/>

<section class="pt-12 pb-16 lg:pt-20 lg:pb-24">
	<Container class="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
		<div>
			<h1 class="text-[clamp(2.2rem,5vw,4rem)]">Команда Zero Bounce</h1>
			<p class="mt-8 max-w-2xl text-lg">
				Вместо разрозненных подрядчиков — команда специалистов, которые работают синхронно. Каждый
				отвечает за свою область, а решения принимаются с учётом общей стратегии проекта.
			</p>
		</div>
		<div>
			<h2 class="font-sans text-lg font-medium tracking-normal">Кто работает над вашим проектом</h2>
			<ul class="mt-4 border-t border-ink/20">
				{#each team as role (role)}
					<li class="border-b border-ink/20 py-2.5">{role}</li>
				{/each}
			</ul>
		</div>
	</Container>
</section>

<section use:inview class="draw-rule py-16 lg:py-24" aria-labelledby="founder-title">
	<Container class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
		<div>
			<p class="text-sm text-graphite">{founder.role}</p>
			<h2 id="founder-title" class="mt-2 text-3xl lg:text-4xl">{founder.name}</h2>
			<p class="mt-6 text-lg">{founder.text}</p>
			<p class="mt-6 text-graphite">{founder.certificate.text}</p>
			<a class="link mt-6 inline-block py-2" href={link('/obuchenie/')}
				>Программа обучения от основателя</a
			>
		</div>
		<figure>
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
	</Container>
</section>

<section use:inview class="draw-rule py-16 lg:py-24" aria-labelledby="united-title">
	<Container>
		<h2 id="united-title" class="text-2xl lg:text-3xl">Что объединяет команду</h2>
		<ul class="mt-10 grid gap-10 md:grid-cols-3 md:gap-0">
			{#each united as item (item.title)}
				<li class="md:border-l md:border-ink/20 md:px-8 md:first:border-l-0 md:first:pl-0">
					<h3 class="font-sans text-lg font-medium tracking-normal">{item.title}</h3>
					<p class="mt-3 text-graphite">{item.text}</p>
				</li>
			{/each}
		</ul>
		<p class="mt-14 text-graphite">
			Хотите работать с нами? <a class="link text-ink" href={link('/career/')}
				>Открытые направления</a
			>
		</p>
	</Container>
</section>

<CtaBand />
