<script lang="ts">
	import Container from '#lib/components/Container.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import StageStrip from '#lib/components/StageStrip.svelte';
	import { stages, systemStage, type StageId } from '#lib/content/journey.ts';
	import { serviceHref, servicesByStage } from '#lib/content/services.ts';
	import { link } from '#lib/link.ts';

	const groups: { id: StageId; title: string; text: string }[] = [
		...stages,
		{ id: 'system', ...systemStage }
	];
</script>

<Seo
	title="Услуги"
	description="Услуги Zero Bounce по этапам пути клиента: привлечение, сайт, CRM, контроль заявок, повторные продажи, аналитика и стратегия."
/>

<section class="pt-12 pb-14 lg:pt-20 lg:pb-20">
	<Container>
		<h1 class="text-[clamp(2.2rem,5vw,4rem)]">Услуги</h1>
		<p class="mt-6 max-w-2xl text-lg text-graphite">
			Каждая услуга отвечает за свой участок пути клиента. Вместе они складываются в систему, где
			заявки не теряются между подрядчиками.
		</p>
	</Container>
</section>

{#each groups as group, i (group.id)}
	<section class="border-t border-ink py-12 lg:py-16" aria-labelledby="g-{group.id}">
		<Container class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
			<div class="space-y-5">
				<p class="text-sm text-graphite">
					{group.id === 'system' ? 'Все этапы' : `Этап ${i + 1}`}
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
