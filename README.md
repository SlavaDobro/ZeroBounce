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

## Дизайн

Идея, цвета, шрифты и правила движения описаны в [DESIGN.md](DESIGN.md): сайт оформлен как чертёж интерьера, по которому агентство «проектирует» путь клиента. Главный герой — фиолетовая точка (клиент).

## Структура

```
src/
  routes/
    layout.css                токены дизайна (@theme) и базовые стили
    +page.svelte              главная
    uslugi/                   каталог услуг по этапам пути клиента
    [slug]/                   страница услуги — шаблон, данные из services.json
    filosofiya/ team/ career/ contacts/
    politika-*/               документы (заглушки до утверждения текстов)
  lib/
    content/                  весь текст сайта
      services.json           24 услуги: описание, что входит, этапы, вопросы
      services.ts             типы и выборки услуг
      journey.ts              пять этапов пути клиента
      philosophy.ts           тексты страницы «Подход»
      company.ts              ценности, ниши, цифры, клиенты, основатель, реквизиты
      pricing.ts              цены и скидки калькулятора
    config/site.ts            название, домен, Telegram, адрес обработчика формы
    config/pages.ts           меню
    components/               HeroTarget (мишень), JourneyPlan (план пути),
                              Calculator, DimensionStats, Niches, ContactForm…
    link.ts                   link() — внутренние ссылки с учётом подпапки
```

## Тексты и цены

- Тексты взяты со старого сайта (бекап от 13.11.2026), опечатки исправлены.
- У части услуг на старом сайте стоял чужой текст. Для них написаны короткие черновики — в `services.json` у них `"draft": true`. Их нужно проверить у заказчика: Комплексный маркетинг, GEO / AEO, SMM, Контент и копирайтинг, PR и репутация, Бренд-стратегия, Контроль обработки лидов, Интеграция amoCRM.
- Цены калькулятора — в `src/lib/content/pricing.ts`.

## Страницы и адреса

Чтобы добавить услугу, допишите её в `src/lib/content/services.json` — страница, меню, подвал и каталог появятся сами. Отдельная страница — папка в `src/routes/` с её адресом и `<Seo title="…" description="…" />`.

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

- Проверить черновые тексты услуг (`"draft": true`) и цифры на главной (38%, 82%, 10 000+, 100%).
- Форма заявки: подключить обработчик и указать его адрес в `formEndpoint` (`src/lib/config/site.ts`). Пока форма предлагает написать в Telegram.
- Тексты политик обработки данных и cookie под новый домен.
- Яндекс Метрика, Calltouch.
- Домен, email и телефон в `src/lib/config/site.ts`, финальный фавикон, sitemap.xml.
