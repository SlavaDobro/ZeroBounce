<script lang="ts">
	import { onMount } from 'svelte';
	import { legalNav } from '#lib/config/pages.ts';
	import { site } from '#lib/config/site.ts';
	import { link } from '#lib/link.ts';
	import Button from './Button.svelte';

	type Status = 'idle' | 'sending' | 'sent' | 'error' | 'offline';
	let status: Status = $state('idle');
	let message = $state('');

	// The calculator passes its result as ?calc=…
	onMount(() => {
		const calc = new URLSearchParams(location.search).get('calc');
		if (calc) message = `Расчёт из калькулятора:\n${calc}`;
	});

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const data = Object.fromEntries(new FormData(form));
		if (data.website) return; // filled only by bots
		if (!site.formEndpoint) {
			status = 'offline';
			return;
		}
		status = 'sending';
		try {
			const response = await fetch(site.formEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...data, page: location.href })
			});
			status = response.ok ? 'sent' : 'error';
			if (response.ok) form.reset();
		} catch {
			status = 'error';
		}
	}

	const field =
		'mt-2 w-full border-0 border-b border-ink/40 bg-transparent px-0 py-2.5 text-lg outline-none transition-colors placeholder:text-graphite/60 focus:border-visit';
</script>

{#if status === 'sent'}
	<div class="border border-ink p-8" role="status">
		<p class="font-display text-2xl font-light">Заявка отправлена</p>
		<p class="mt-3 text-graphite">Мы свяжемся с вами по указанным контактам.</p>
	</div>
{:else}
	<form class="grid gap-7" onsubmit={submit} novalidate={false}>
		<div class="grid gap-7 sm:grid-cols-2">
			<label class="block text-sm text-graphite">
				Имя
				<input class={field} name="name" autocomplete="name" required />
			</label>
			<label class="block text-sm text-graphite">
				Телефон или Telegram
				<input
					class={field}
					name="contact"
					autocomplete="tel"
					required
					placeholder="+7 или @username"
				/>
			</label>
		</div>
		<label class="block text-sm text-graphite">
			Компания и сайт
			<input class={field} name="company" autocomplete="organization" />
		</label>
		<label class="block text-sm text-graphite">
			Задача
			<textarea class="{field} min-h-32 resize-y" name="message" rows="4" bind:value={message}
			></textarea>
		</label>
		<!-- Bots fill every field; people do not see this one. -->
		<label class="absolute -left-[9999px]" aria-hidden="true">
			Сайт <input name="website" tabindex="-1" autocomplete="off" />
		</label>
		<label class="flex items-start gap-3 text-sm text-graphite">
			<input
				type="checkbox"
				name="consent"
				required
				class="mt-0.5 size-5 shrink-0 accent-[var(--color-visit)]"
			/>
			<span>
				Согласен на обработку персональных данных в соответствии с
				<a class="link text-ink" href={link(legalNav[0].href)}>политикой</a>
			</span>
		</label>

		<div class="flex flex-wrap items-center gap-4">
			<Button type="submit" disabled={status === 'sending'}>
				{status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
			</Button>
			<span class="text-sm text-graphite"
				>или напишите в <a class="link text-ink" href={site.telegram}>Telegram</a></span
			>
		</div>

		{#if status === 'offline'}
			<p class="border-l-2 border-visit pl-4 text-sm" role="alert">
				Отправка заявок с сайта ещё не подключена. Напишите нам в
				<a class="link" href={site.telegram}>Telegram {site.telegramHandle}</a> — ответим там.
			</p>
		{:else if status === 'error'}
			<p class="border-l-2 border-visit pl-4 text-sm" role="alert">
				Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз или напишите в
				<a class="link" href={site.telegram}>Telegram</a>.
			</p>
		{/if}
	</form>
{/if}
