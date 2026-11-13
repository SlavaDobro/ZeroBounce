<script lang="ts">
	import ContactForm from '#lib/components/ContactForm.svelte';
	import Container from '#lib/components/Container.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { site } from '#lib/config/site.ts';
	import { legal } from '#lib/content/company.ts';
</script>

<Seo
	title="Контакты"
	description="Запросите аудит маркетинга Zero Bounce или напишите нам в Telegram."
/>

<section class="pt-12 pb-20 lg:pt-20 lg:pb-28">
	<Container class="grid gap-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-24">
		<div>
			<h1 class="text-[clamp(2.2rem,5vw,4rem)]">Запросить аудит</h1>
			<p class="mt-6 max-w-xl text-lg text-graphite">
				Расскажите о компании и задаче. Мы изучим текущий маркетинг и предложим конкретный план
				роста.
			</p>
			<div class="mt-12">
				<ContactForm />
			</div>
		</div>

		<aside class="space-y-10 lg:border-l lg:border-ink/20 lg:pl-12">
			<div>
				<p class="text-sm text-graphite">Быстрее всего — в Telegram</p>
				<a class="link mt-2 inline-block font-display text-2xl font-light" href={site.telegram}
					>{site.telegramHandle}</a
				>
			</div>
			{#if site.email || site.phone}
				<div class="space-y-1">
					{#if site.phone}<a
							class="link block text-lg"
							href="tel:{site.phone.replace(/[^\d+]/g, '')}">{site.phone}</a
						>{/if}
					{#if site.email}<a class="link block text-lg" href="mailto:{site.email}">{site.email}</a
						>{/if}
				</div>
			{/if}
			<div class="text-sm">
				<p class="text-graphite">Реквизиты</p>
				<p class="mt-2">{legal.entity}</p>
				<p class="text-graphite">ОГРНИП {legal.ogrnip}</p>
				<p class="text-graphite">ИНН {legal.inn}</p>
			</div>
		</aside>
	</Container>
</section>
