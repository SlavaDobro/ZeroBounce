<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/Button.svelte';
	import Container from '#lib/components/Container.svelte';
	import Seo from '#lib/components/Seo.svelte';

	const notFound = $derived(page.status === 404);
</script>

<Seo title={notFound ? 'Страница не найдена' : 'Ошибка'} noindex />

<section class="py-28">
	<Container>
		<p class="text-7xl font-bold text-brand">{page.status}</p>
		<h1 class="mt-4 text-3xl font-bold sm:text-4xl">
			{notFound ? 'Такой страницы нет' : 'Что-то пошло не так'}
		</h1>
		<p class="mt-4 max-w-xl text-lg text-ink-muted">
			{notFound
				? 'Возможно, адрес изменился. Начните с главной страницы.'
				: 'Обновите страницу или вернитесь позже.'}
		</p>
		<Button href="/" class="mt-8">На главную</Button>
	</Container>
</section>
