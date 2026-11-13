<script lang="ts">
	import logo from '#lib/assets/logo.png';
	import { groupTitles, href, pagesByGroup, type PageGroup } from '#lib/config/pages.ts';
	import { site } from '#lib/config/site.ts';
	import Container from './Container.svelte';

	const columns: PageGroup[] = ['marketing', 'crm', 'consulting', 'company'];
	const year = new Date().getFullYear();
</script>

<footer class="mt-24 border-t border-line bg-surface">
	<Container class="grid gap-12 py-16 lg:grid-cols-[1.2fr_3fr]">
		<div class="space-y-4">
			<img src={logo} alt={site.name} width="885" height="154" class="h-6 w-auto" loading="lazy" />
			<p class="max-w-xs text-ink-muted">{site.description}</p>
			<ul class="space-y-1 font-semibold">
				<li><a class="hover:text-brand" href="mailto:{site.email}">{site.email}</a></li>
				{#if site.phone}<li>
						<a class="hover:text-brand" href="tel:{site.phone.replace(/[^\d+]/g, '')}"
							>{site.phone}</a
						>
					</li>{/if}
				{#if site.telegram}<li>
						<a class="hover:text-brand" href={site.telegram}>Telegram</a>
					</li>{/if}
			</ul>
		</div>

		<div class="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
			{#each columns as group (group)}
				<div>
					<p class="mb-4 font-bold">{groupTitles[group]}</p>
					<ul class="space-y-2 text-[15px] text-ink-muted">
						{#each pagesByGroup(group) as item (item.path)}
							<li><a class="hover:text-brand" href={href(item)}>{item.title}</a></li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</Container>

	<div class="border-t border-line">
		<Container
			class="flex flex-col gap-3 py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {year} {site.name}</p>
			<ul class="flex flex-wrap gap-x-6 gap-y-2">
				{#each pagesByGroup('legal') as item (item.path)}
					<li><a class="hover:text-brand" href={href(item)}>{item.title}</a></li>
				{/each}
			</ul>
		</Container>
	</div>
</footer>
