<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/Button.svelte';
	import Container from '#lib/components/Container.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { link } from '#lib/link.ts';

	const notFound = $derived(page.status === 404);
</script>

<Seo title={notFound ? 'Страница не найдена' : 'Ошибка'} noindex />

<section class="py-24 lg:py-32">
	<Container>
		<p class="font-display text-6xl font-extralight text-graphite">{page.status}</p>
		<h1 class="mt-6 max-w-2xl text-3xl lg:text-4xl">
			{notFound ? 'На этом плане такой комнаты нет' : 'Что-то пошло не так'}
		</h1>
		<p class="mt-6 max-w-xl text-lg text-graphite">
			{notFound
				? 'Возможно, адрес изменился. Уходить не обязательно: начните с главной или с каталога услуг.'
				: 'Обновите страницу или вернитесь чуть позже.'}
		</p>
		<div class="mt-10 flex flex-wrap gap-3">
			<Button href={link('/')}>На главную</Button>
			{#if notFound}<Button href={link('/uslugi/')} variant="outline">Все услуги</Button>{/if}
		</div>
	</Container>
</section>
