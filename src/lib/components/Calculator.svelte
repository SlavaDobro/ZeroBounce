<script lang="ts">
	import { prefersReducedMotion, Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { auditHref } from '#lib/config/pages.ts';
	import {
		discounts,
		priceItems,
		priceNote,
		quote,
		rub,
		type Selection
	} from '#lib/content/pricing.ts';
	import { link } from '#lib/link.ts';
	import Button from './Button.svelte';

	let selection: Selection = $state({});
	let budgets: Record<string, string> = $state({});

	const result = $derived(quote(selection));
	const any = $derived(result.lines.length > 0);
	const prefix = $derived(result.from ? 'от ' : '');

	// The total rolls to the new value instead of jumping.
	const total = new Tween(0, { duration: 450, easing: cubicOut });
	$effect(() => {
		total.set(result.total, { duration: prefersReducedMotion.current ? 0 : 450 });
	});

	const tiers = [...discounts].sort((a, b) => a.from - b.from);
	const scaleMax = tiers[tiers.length - 1].from * 1.2;
	const next = $derived(tiers.find((t) => result.sum < t.from));

	function toggle(id: string, type: string) {
		if (selection[id]) {
			delete selection[id];
		} else {
			const item = priceItems.find((i) => i.id === id)!;
			selection[id] = type === 'choice' ? { option: item.options![0].id } : {};
		}
	}
	function setBudget(id: string, value: string) {
		const digits = value.replace(/\D/g, '').slice(0, 11);
		budgets[id] = digits ? new Intl.NumberFormat('ru-RU').format(Number(digits)) : '';
		if (selection[id]) selection[id] = { budget: Number(digits) || 0 };
	}

	/** Calculation as text for the contact form. */
	const summary = $derived(
		[
			...result.lines.map((l) => `${l.title}: ${l.from ? 'от ' : ''}${rub(l.price)}`),
			result.percent ? `Скидка ${result.percent}%: −${rub(result.discount)}` : '',
			`Итого: ${prefix}${rub(result.total)}`
		]
			.filter(Boolean)
			.join('\n')
			.replaceAll('\u00a0', ' ')
	);
	const ctaHref = $derived(link(auditHref) + (any ? `?calc=${encodeURIComponent(summary)}` : ''));
</script>

<div class="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
	<fieldset class="min-w-0">
		<legend class="sr-only">Услуги для расчёта</legend>
		<ul class="border-t border-paper/25">
			{#each priceItems as item (item.id)}
				{@const on = !!selection[item.id]}
				<li class="border-b border-paper/25">
					<label
						class="row relative flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-1 py-5 sm:flex-nowrap sm:gap-6"
					>
						<input
							type="checkbox"
							class="peer sr-only"
							checked={on}
							onchange={() => toggle(item.id, item.type)}
						/>
						<span class="marker" class:on aria-hidden="true"></span>
						<span class="min-w-0 flex-1 text-base sm:text-lg">{item.title}</span>
						<!-- On phones the price goes under the title, aligned with it. -->
						<span
							class="w-full pl-10 text-sm text-paper/70 tabular-nums sm:w-auto sm:pl-0 sm:whitespace-nowrap"
						>
							{#if item.type === 'budget'}
								15% бюджета, от {rub(item.min!)}
							{:else if item.type === 'choice'}
								от {rub(Math.min(...item.options!.map((o) => o.price)))}
							{:else}
								{item.from ? 'от ' : ''}{rub(item.price!)}
							{/if}
						</span>
					</label>

					{#if on && item.type === 'budget'}
						<div class="pb-6 pl-10 sm:pl-12">
							<label class="block text-sm text-paper/70" for="calc-budget-{item.id}">
								Рекламный бюджет в месяц
							</label>
							<div
								class="mt-2 flex max-w-xs items-center border-b border-paper/60 focus-within:border-paper"
							>
								<input
									id="calc-budget-{item.id}"
									class="w-full bg-transparent py-2 text-xl tabular-nums outline-none placeholder:text-paper/35"
									inputmode="numeric"
									autocomplete="off"
									placeholder="500 000"
									value={budgets[item.id] ?? ''}
									oninput={(e) => setBudget(item.id, e.currentTarget.value)}
								/>
								<span class="text-paper/60">₽</span>
							</div>
						</div>
					{:else if on && item.type === 'choice'}
						<div
							class="grid gap-2 pb-6 pl-10 sm:grid-cols-2 sm:pl-12"
							role="radiogroup"
							aria-label="Формат: {item.title}"
						>
							{#each item.options! as option (option.id)}
								<label
									class="option relative cursor-pointer border border-paper/30 p-3 text-sm transition-colors has-[:checked]:border-paper has-[:checked]:bg-paper has-[:checked]:text-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-visit"
								>
									<input
										type="radio"
										class="sr-only"
										name="calc-{item.id}"
										checked={selection[item.id]?.option === option.id}
										onchange={() => (selection[item.id] = { option: option.id })}
									/>
									<span class="block font-medium">{option.title}</span>
									<span class="block opacity-70">от {rub(option.price)}</span>
									{#if option.note}<span class="mt-1 block text-xs opacity-60">{option.note}</span
										>{/if}
								</label>
							{/each}
						</div>
					{/if}
				</li>
			{/each}
		</ul>
		<!--
			Phones: the total stays on screen above the contact bar while services are ticked,
			and a tap scrolls to the full calculation.
		-->
		{#if any}
			<a
				href="#calc-total"
				class="total-chip sticky bottom-[5.25rem] z-10 mt-6 flex items-center justify-between gap-4 rounded-full bg-paper px-5 py-3 text-ink shadow-[0_12px_32px_-12px_rgb(0_0_0/0.6)] lg:hidden"
			>
				<span class="flex items-center gap-2 text-sm whitespace-nowrap">
					<span class="size-2 rounded-full bg-visit" aria-hidden="true"></span>
					Итого{result.percent ? ` −${result.percent}%` : ''}
				</span>
				<span class="font-display text-lg font-light whitespace-nowrap tabular-nums">
					{prefix}{rub(Math.round(total.current))}
				</span>
			</a>
		{/if}
	</fieldset>

	<div id="calc-total" class="scroll-mt-24 lg:sticky lg:top-28 lg:self-start" aria-live="polite">
		{#if any}
			<ul class="space-y-2 text-sm">
				{#each result.lines as line (line.id)}
					<li class="flex justify-between gap-6">
						<span class="text-paper/70">{line.title}</span>
						<span class="whitespace-nowrap tabular-nums"
							>{line.from ? 'от ' : ''}{rub(line.price)}</span
						>
					</li>
				{/each}
				{#if result.percent}
					<li class="flex justify-between gap-6 border-t border-paper/25 pt-2">
						<span>Скидка {result.percent}%</span>
						<span class="whitespace-nowrap tabular-nums">−{rub(result.discount)}</span>
					</li>
				{/if}
			</ul>
		{:else}
			<p class="text-paper/70">Отметьте услуги слева, и стоимость посчитается сразу.</p>
		{/if}

		<p class="mt-8 text-sm text-paper/70">Итого</p>
		<p
			class="font-display text-[clamp(1.9rem,8.6vw,5.25rem)] leading-none font-extralight whitespace-nowrap tabular-nums lg:text-[clamp(2.5rem,4.2vw,4.5rem)]"
		>
			{#if any && result.from}<span class="mr-2 text-xl">от</span>{/if}{rub(
				Math.round(total.current)
			)}
		</p>

		<!-- Discount scale drawn as a dimension line -->
		<div class="scale mt-8" aria-hidden="true">
			<div class="relative h-8">
				<div class="absolute inset-x-0 top-4 h-px bg-paper/40"></div>
				<div
					class="fill absolute top-[15px] left-0 h-[3px] bg-visit"
					style="width: {Math.min(result.sum / scaleMax, 1) * 100}%"
				></div>
				<span class="absolute top-2 left-0 h-5 w-px bg-paper/60"></span>
				{#each tiers as tier (tier.from)}
					<span
						class="tick absolute top-0 flex -translate-x-1/2 flex-col items-center"
						style="left: {(tier.from / scaleMax) * 100}%"
					>
						<span class="text-xs tabular-nums" class:text-visit={result.sum >= tier.from}
							>−{tier.percent}%</span
						>
						<span class="mt-0.5 h-3 w-px bg-paper/60"></span>
					</span>
				{/each}
			</div>
			<div class="relative h-5 text-xs text-paper/50 tabular-nums">
				{#each tiers as tier (tier.from)}
					<span class="absolute -translate-x-1/2" style="left: {(tier.from / scaleMax) * 100}%"
						>{tier.from / 1000} тыс.</span
					>
				{/each}
			</div>
		</div>
		<p class="mt-3 text-sm text-paper/80">
			{#if !any}
				Скидка 5% от 200 000 ₽, 10% — от 300 000 ₽.
			{:else if next}
				До скидки {next.percent}% осталось {rub(next.from - result.sum)}.
			{:else}
				Применена максимальная скидка {result.percent}%.
			{/if}
		</p>

		<div class="mt-8 flex flex-wrap gap-3">
			<Button href={ctaHref} variant="light">Обсудить расчёт</Button>
			{#if any}
				<button
					type="button"
					class="min-h-12 rounded-full px-5 text-sm text-paper/70 transition-colors hover:text-paper"
					onclick={() => {
						selection = {};
						budgets = {};
					}}>Сбросить</button
				>
			{/if}
		</div>

		<div class="mt-8 space-y-2 border-t border-paper/25 pt-6 text-xs leading-relaxed text-paper/60">
			{#each priceNote as note (note)}<p>{note}</p>{/each}
		</div>
	</div>
</div>

<style>
	.marker {
		position: relative;
		flex: none;
		width: 1.5rem;
		height: 1.5rem;
		border: 1px solid color-mix(in srgb, var(--color-paper) 60%, transparent);
		border-radius: 50%;
		transition: border-color 0.2s;
	}
	.marker::after {
		content: '';
		position: absolute;
		inset: 3px;
		border-radius: 50%;
		background: var(--color-visit);
		scale: 0;
		transition: scale 0.25s var(--ease-settle);
	}
	.marker.on {
		border-color: var(--color-paper);
	}
	.marker.on::after {
		scale: 1;
	}
	.row:hover .marker {
		border-color: var(--color-paper);
	}
	:global(.peer:focus-visible) + .marker {
		outline: 2px solid var(--color-visit);
		outline-offset: 3px;
	}
	.fill {
		transition: width 0.45s var(--ease-settle);
	}
	@media (prefers-reduced-motion: reduce) {
		.fill,
		.marker::after {
			transition: none;
		}
	}
	.total-chip {
		animation: chip-in 0.4s var(--ease-settle) both;
	}
	@keyframes chip-in {
		from {
			opacity: 0;
			translate: 0 1rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.total-chip {
			animation: none;
		}
	}
</style>
