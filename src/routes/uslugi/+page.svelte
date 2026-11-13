<script lang="ts">
	import { inview } from '#lib/inview.ts';
	import Container from '#lib/components/Container.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import StageStrip from '#lib/components/StageStrip.svelte';
	import { serviceGroups } from '#lib/config/pages.ts';
	import { stages, systemStage } from '#lib/content/journey.ts';
	import { serviceHref, servicesByStage } from '#lib/content/services.ts';
	import { link } from '#lib/link.ts';

	// Plain group names on top; the stage of the customer path explains what the group is for.
	const groups = serviceGroups.map((g) => {
		const stage = stages.find((s) => s.id === g.id);
		return { ...g, text: stage?.text ?? systemStage.text };
	});
</script>

<Seo
	title="Услуги"
	description="Услуги Zero Bounce по этапам пути клиента: привлечение, сайт, CRM, контроль заявок, повторные продажи, аналитика и стратегия."
/>

<section class="pt-12 pb-14 lg:pt-20 lg:pb-20">
	<Container>
		<h1 class="text-[clamp(2.2rem,5vw,4rem)]">Услуги</h1>
		<p class="mt-6 max-w-2xl text-lg text-graphite">
			Найдите свою задачу в списке и откройте услугу — там описано, что входит и как мы работаем. Не
			уверены, что выбрать? <a class="link text-ink" href={link('/contacts/')}>Оставьте заявку</a>,
			подскажем.
		</p>
	</Container>
</section>

{#each groups as group, i (group.id)}
	<section use:inview class="draw-rule py-12 lg:py-16" aria-labelledby="g-{group.id}">
		<Container class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
			<div class="space-y-5">
				<p class="text-sm text-graphite">
					{group.id === 'system' ? 'На всех этапах пути клиента' : `Этап ${i + 1} пути клиента`}
				</p>
				<h2 id="g-{group.id}" class="text-2xl lg:text-3xl">{group.title}</h2>
				<p class="max-w-sm text-graphite">{group.text}</p>
				<div class="max-w-[16rem] pt-2"><StageStrip stage={group.id} /></div>
			</div>
			<ul class="border-t border-ink/20">
				{#each servicesByStage(group.id) as service (service.slug)}
					<li class="border-b border-ink/20">
						<a
							href={link(serviceHref(service))}
							class="row group grid gap-1 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-8"
						>
							<span class="text-lg transition-colors group-hover:text-visit"
								>{service.navTitle}</span
							>
							<span class="text-graphite">{service.short}</span>
						</a>
					</li>
				{/each}
			</ul>
		</Container>
	</section>
{/each}

<CtaBand />

<style>
	/* On hover a band of hatching slides under the row, like marking a room on a plan. */
	.row {
		position: relative;
		isolation: isolate;
	}
	.row::before {
		content: '';
		position: absolute;
		inset: 0 -0.75rem;
		z-index: -1;
		color: color-mix(in srgb, var(--color-visit) 30%, transparent);
		background-image: repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 7px);
		clip-path: inset(0 100% 0 0);
		transition: clip-path 0.35s var(--ease-settle);
	}
	.row:hover::before,
	.row:focus-visible::before {
		clip-path: inset(0 0 0 0);
	}
	@media (prefers-reduced-motion: reduce) {
		.row::before {
			transition: none;
		}
	}
</style>
