# Zero Bounce — новый сайт

SvelteKit 3 (Svelte 5 + Vite 8) + Tailwind CSS 4 + TypeScript.
Сайт собирается в статический HTML: каждая страница — готовый файл, работает на любом хостинге и хорошо индексируется.

## Команды

```bash
npm install        # первый запуск
npm run dev        # разработка: http://localhost:5173
npm run build      # сборка в папку build/
npm run preview    # посмотреть собранный сайт
npm run check      # проверка типов
npm run lint       # Prettier + ESLint
npm run format     # отформатировать код
```

## Структура

```
src/
  app.html                    шаблон HTML (lang="ru")
  routes/
    layout.css                Tailwind + фирменные цвета и шрифт (@theme)
    +layout.svelte            шапка, подвал, «перейти к содержимому»
    +layout.ts                prerender = true, адреса со слешем в конце
    +page.svelte              главная (черновик)
    +error.svelte             страница 404 / ошибки
    [...path]/                заглушки для страниц без своего дизайна
  lib/
    config/site.ts            название, домен, контакты (пока пустые)
    config/pages.ts           список всех страниц с адресами + главное меню
    link.ts                   link() — внутренние ссылки с учётом подпапки
    components/               Header, Footer, Container, Button, Seo
    assets/                   логотип, фавикон (временный)
static/
  .htaccess                   404 и редиректы для Apache
  robots.txt
```

## Фирменный стиль

Стартовая палитра и шрифт Zero Bounce, доступны как классы Tailwind. Меняются в одном месте — `src/routes/layout.css`:

| Токен                             | Цвет       | Пример класса            |
| --------------------------------- | ---------- | ------------------------ |
| `brand`                           | `#6754E9`  | `bg-brand`, `text-brand` |
| `brand-hover`                     | `#5643D6`  | `hover:bg-brand-hover`   |
| `brand-soft`                      | `#B0A7EF`  | `bg-brand-soft`          |
| `brand-tint`                      | `#E9E5FF`  | `bg-brand-tint`          |
| `accent`                          | `#FFBE11`  | `border-accent`          |
| `ink`                             | `#000000`  | `text-ink`               |
| `ink-muted`                       | чёрный 70% | `text-ink-muted`         |
| `ink-subtle`                      | `#7E7E7E`  | `text-ink-subtle`        |
| `surface`                         | `#F7F7FA`  | `bg-surface`             |
| `line`                            | `#E2E2E2`  | `border-line`            |
| `rounded-card` / `rounded-button` | 18px       | `rounded-card`           |

Шрифт — Manrope (пакет `@fontsource-variable/manrope`, файлы лежат на нашем сервере, без Google Fonts).
Ширина контента — `max-w-site` (1240px) через компонент `Container`.

## Страницы и адреса

Структура сайта — черновик в `src/lib/config/pages.ts`: услуги, страницы компании и документы. Из этого списка строятся меню, подвал, блок услуг на главной и заглушки. Страницы и адреса можно свободно добавлять, переименовывать и удалять.

Пока у страницы нет своего дизайна, её показывает заглушка `src/routes/[...path]` с `noindex`.
Чтобы сверстать страницу, создайте папку с её адресом — она автоматически заменит заглушку:

```
src/routes/contacts/+page.svelte
src/routes/kontekstnaya-reklama/+page.svelte
```

В новой странице подключите `<Seo title="…" description="…" />` (без `noindex`).

### Внутренние ссылки — только через `link()`

Сайт может жить в подпапке (на GitHub Pages это `/ZeroBounce/`), поэтому внутренние ссылки пишутся через `link()` — она добавит нужную папку:

```svelte
<script lang="ts">
	import { link } from '#lib/link.ts';
</script>

<a href={link('/contacts/')}>Контакты</a>
```

Ссылка вида `href="/contacts/"` локально работает, а на GitHub Pages ведёт в никуда. Картинки и файлы, импортированные через `import`, правятся автоматически.

## Домен

Домена пока нет. Когда появится, впишите его в `src/lib/config/site.ts` (`url: 'https://…'`): после этого на страницах появятся canonical и `og:url`. Там же — email, телефон и Telegram; пустые контакты на сайте не показываются.

## Импорты

В SvelteKit 3 вместо `$lib` используется `#lib` (subpath imports Node). TS-файлы импортируются с расширением:

```ts
import { site } from '#lib/config/site.ts';
import Button from '#lib/components/Button.svelte';
```

## Деплой

### GitHub Pages (сейчас)

Сайт: https://slavadobro.github.io/ZeroBounce/

Каждый push в `main` запускает `.github/workflows/deploy.yml`: проверки (lint, check) → сборка с `BASE_PATH=/ZeroBounce` → публикация. Ход сборки — на вкладке **Actions** репозитория, обычно 1–2 минуты.

Один раз нужно включить: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Проверить сборку под подпапкой локально (Git Bash):

```bash
MSYS_NO_PATHCONV=1 BASE_PATH=/ZeroBounce npm run build
```

`MSYS_NO_PATHCONV=1` нужен только в Git Bash на Windows: без него `/ZeroBounce` превращается в путь к папке Git. В PowerShell: `$env:BASE_PATH='/ZeroBounce'; npm run build`.

### Свой домен (потом)

`npm run build` без `BASE_PATH` → загрузить **содержимое** папки `build/` (вместе со скрытым `.htaccess`) в корень сайта на хостинге.

## Что осталось сделать

- Дизайн и тексты главной и страниц услуг.
- Форма заявки: на статическом сайте нужен обработчик (PHP-скрипт на хостинге или внешний сервис) и защита от спама.
- Калькулятор услуг.
- Яндекс Метрика, Calltouch.
- Домен и контакты в `src/lib/config/site.ts`, финальный фавикон.
- sitemap.xml (после покупки домена).
