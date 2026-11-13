<script lang="ts">
	import { inview } from '#lib/inview.ts';
	import Button from '#lib/components/Button.svelte';
	import Container from '#lib/components/Container.svelte';
	import Process from '#lib/components/Process.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { site } from '#lib/config/site.ts';

	const roles = [
		'SEO / GEO / AEO-специалист',
		'Специалист по контекстной рекламе',
		'Project manager',
		'Веб-разработчик',
		'UX/UI-дизайнер',
		'Контент-маркетолог, копирайтер',
		'Аналитик digital-маркетинга'
	];
	const valued = [
		'Системное мышление',
		'Инициативность',
		'Ответственность за результат',
		'Внимание к деталям',
		'Желание развиваться'
	];
	const offer = [
		{
			title: 'Достойное вознаграждение',
			text: 'Условия соответствуют уровню компетенций и ответственности.'
		},
		{
			title: 'Сильная команда',
			text: 'Специалисты, которые поддерживают друг друга и обмениваются опытом.'
		},
		{
			title: 'Гибкий формат',
			text: 'Для большинства позиций доступна удалённая или гибридная работа.'
		}
	];
	const hiring = [
		{ title: 'Знакомство', text: 'Вы оставляете отклик или резюме, мы внимательно изучаем опыт.' },
		{
			title: 'Первое интервью',
			text: 'Онлайн-встреча: опыт, ожидания, формат работы и ваши вопросы.'
		},
		{
			title: 'Практическое задание',
			text: 'Небольшая профильная задача, чтобы увидеть подход к работе.'
		},
		{ title: 'Финальная встреча', text: 'Обсуждаем результат, знакомим с проектами и командой.' },
		{
			title: 'Предложение и договор',
			text: 'Официальное предложение с условиями и оформление документов.'
		}
	];
</script>

<Seo
	title="Карьера"
	description="Вакансии Zero Bounce: SEO, контекстная реклама, проектное управление, разработка, дизайн, контент и аналитика."
/>

<section class="pt-12 pb-16 lg:pt-20 lg:pb-24">
	<Container class="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
		<div>
			<h1 class="text-[clamp(2.2rem,5vw,4rem)]">Карьера в Zero Bounce</h1>
			<p class="mt-8 max-w-2xl text-lg">
				Мы собираем команду специалистов, которые мыслят стратегически, отвечают за результат и
				создают маркетинговые системы, влияющие на рост бизнеса. Даже если подходящей вакансии
				сейчас нет, мы рады познакомиться.
			</p>
			<Button href={site.telegram} class="mt-10">Отправить резюме в Telegram</Button>
		</div>
		<div>
			<h2 class="font-sans text-lg font-medium tracking-normal">Рассматриваем кандидатов</h2>
			<ul class="mt-4 border-t border-ink/20">
				{#each roles as role (role)}<li class="border-b border-ink/20 py-2.5">{role}</li>{/each}
			</ul>
		</div>
	</Container>
</section>

<section use:inview class="draw-rule py-16 lg:py-24">
	<Container class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
		<div>
			<h2 class="text-2xl lg:text-3xl">Что мы ценим</h2>
			<ul class="mt-6 space-y-2 text-graphite">
				{#each valued as item (item)}<li>{item}</li>{/each}
			</ul>
		</div>
		<ul class="grid gap-10 md:grid-cols-3 md:gap-0">
			{#each offer as item (item.title)}
				<li class="md:border-l md:border-ink/20 md:px-8 md:first:border-l-0 md:first:pl-0">
					<h3 class="font-sans text-lg font-medium tracking-normal">{item.title}</h3>
					<p class="mt-3 text-graphite">{item.text}</p>
				</li>
			{/each}
		</ul>
	</Container>
</section>

<section use:inview class="draw-rule py-16 lg:py-24" aria-labelledby="hire-title">
	<Container>
		<h2 id="hire-title" class="text-2xl lg:text-3xl">Как проходит отбор</h2>
		<div class="mt-12"><Process steps={hiring} /></div>
	</Container>
</section>
