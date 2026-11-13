<script lang="ts">
	import logo from '#lib/assets/logo.png';
	import { companyNav, legalNav } from '#lib/config/pages.ts';
	import { site } from '#lib/config/site.ts';
	import { legal } from '#lib/content/company.ts';
	import { stages } from '#lib/content/journey.ts';
	import { serviceHref, servicesByStage } from '#lib/content/services.ts';
	import { link } from '#lib/link.ts';
	import Container from './Container.svelte';

	const year = new Date().getFullYear();
	// One column per stage of the customer path, plus the cross-cutting services.
	const columns = [
		...stages.map((s) => ({ title: s.title, items: servicesByStage(s.id) })),
		{ title: 'Через весь путь', items: servicesByStage('system') }
	];
</script>

<!-- Footer drawn as the title block of a drawing sheet (штамп). -->
<footer class="mt-auto border-t border-ink bg-paper text-sm">
	<Container class="py-12 lg:py-16">
		<div class="grid border-t border-l border-ink/70 lg:grid-cols-[1.1fr_3fr]">
			<div class="flex flex-col justify-between gap-8 border-r border-b border-ink/70 p-6">
				<div class="space-y-4">
					<img
						src={logo}
						alt={site.name}
						width="885"
						height="154"
						class="h-5 w-auto"
						loading="lazy"
					/>
					<p class="max-w-xs text-graphite">{site.description}.</p>
				</div>
				<div class="space-y-1">
					<p class="text-xs text-graphite">Связь</p>
					<a class="link text-lg" href={site.telegram}>Telegram {site.telegramHandle}</a>
					{#if site.email}<a class="link block" href="mailto:{site.email}">{site.email}</a>{/if}
					{#if site.phone}<a class="link block" href="tel:{site.phone.replace(/[^\d+]/g, '')}"
							>{site.phone}</a
						>{/if}
				</div>
			</div>

			<nav class="grid sm:grid-cols-2 xl:grid-cols-3" aria-label="Услуги">
				{#each columns as column (column.title)}
					<div class="border-r border-b border-ink/70 p-6">
						<p class="mb-3 text-xs text-graphite">{column.title}</p>
						<ul class="space-y-1.5">
							{#each column.items as item (item.slug)}
								<li>
									<a class="hover:text-visit" href={link(serviceHref(item))}>{item.navTitle}</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>

			<div class="border-r border-b border-ink/70 p-6">
				<p class="mb-3 text-xs text-graphite">Компания</p>
				<ul class="space-y-1.5">
					{#each companyNav as item (item.href)}
						<li><a class="hover:text-visit" href={link(item.href)}>{item.label}</a></li>
					{/each}
				</ul>
			</div>

			<div class="grid sm:grid-cols-[2fr_2fr_1fr]">
				<div class="border-r border-b border-ink/70 p-6">
					<p class="mb-3 text-xs text-graphite">Организация</p>
					<p>{legal.entity}</p>
					<p class="text-graphite">ОГРНИП {legal.ogrnip}</p>
					<p class="text-graphite">ИНН {legal.inn}</p>
				</div>
				<div class="border-r border-b border-ink/70 p-6">
					<p class="mb-3 text-xs text-graphite">Документы</p>
					<ul class="space-y-1.5">
						{#each legalNav as item (item.href)}
							<li><a class="hover:text-visit" href={link(item.href)}>{item.label}</a></li>
						{/each}
					</ul>
				</div>
				<div class="flex items-end border-r border-b border-ink/70 p-6">
					<p class="font-display text-2xl font-extralight">{year}</p>
				</div>
			</div>
		</div>
	</Container>
</footer>
