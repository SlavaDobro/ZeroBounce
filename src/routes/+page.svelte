<script lang="ts">
	import Button from '#lib/components/Button.svelte';
	import Container from '#lib/components/Container.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { groupTitles, href, pagesByGroup, type PageGroup } from '#lib/config/pages.ts';
	import { site } from '#lib/config/site.ts';

	const serviceGroups: PageGroup[] = ['marketing', 'crm', 'consulting'];
</script>

<Seo />

<!-- Draft home page: sections are placeholders for the new design. -->
<section class="py-20 sm:py-28">
	<Container>
		<p class="mb-5 font-semibold text-brand">Digital-агентство {site.name}</p>
		<h1 class="max-w-4xl text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-6xl">
			{site.description}
		</h1>
		<p class="mt-6 max-w-2xl text-lg text-ink-muted">
			Реклама, SEO, CRM и сквозная аналитика — в одной команде. Текст первого экрана заменим на
			финальный.
		</p>
		<div class="mt-10 flex flex-wrap gap-3">
			<Button href="/contacts/">Запросить аудит</Button>
			<Button href="#services" variant="secondary">Все услуги</Button>
		</div>
	</Container>
</section>

<section id="services" class="scroll-mt-24 py-16">
	<Container>
		<h2 class="text-3xl font-bold sm:text-4xl">Услуги</h2>
		<div class="mt-10 grid gap-12">
			{#each serviceGroups as group (group)}
				<div>
					<h3 class="mb-5 text-xl font-bold">{groupTitles[group]}</h3>
					<ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{#each pagesByGroup(group) as item (item.path)}
							<li>
								<a
									href={href(item)}
									class="group flex h-full items-center justify-between gap-4 rounded-card border border-line bg-white p-5 font-semibold transition-colors hover:border-brand"
								>
									{item.title}
									<span
										class="text-brand transition-transform group-hover:translate-x-1"
										aria-hidden="true">→</span
									>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</Container>
</section>

<section class="py-16">
	<Container>
		<div class="rounded-card bg-brand px-6 py-12 text-white sm:px-12">
			<h2 class="max-w-2xl text-3xl font-bold sm:text-4xl">
				Разберём ваш маркетинг и найдём точки роста
			</h2>
			<p class="mt-4 max-w-xl text-white/80">Оставьте заявку — свяжемся и предложим план работ.</p>
			<a
				href="/contacts/"
				class="mt-8 inline-flex rounded-button bg-white px-7 py-3.5 font-bold text-brand transition-colors hover:bg-brand-tint"
				>Оставить заявку</a
			>
		</div>
	</Container>
</section>
