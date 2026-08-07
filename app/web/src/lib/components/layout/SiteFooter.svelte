<script lang="ts">
  import { navGroups, t, pickLabel } from '$lib/config/nav';
  import { hrefFor, type Lang, type SlugMap } from '$lib/config/routes';

  interface Props {
    lang: Lang;
    global: Record<string, unknown> | null;
    socials: Array<Record<string, unknown>>;
    slugMap: SlugMap;
  }
  let { lang, global, socials, slugMap }: Props = $props();
</script>

<footer class="bg-primary-foreground text-white">
  <div class="mx-2 sm:container sm:mx-auto">
    {#if socials.length > 0}
      <div class="flex flex-col items-center justify-between gap-4 py-8 md:flex-row print:hidden">
        <span class="text-center font-sans text-lg font-bold sm:text-xl md:text-2xl">
          {lang === 'de' ? 'Folgen Sie uns' : 'Follow us'}
        </span>
        <div class="flex flex-wrap gap-4 px-4">
          {#each socials as s}
            <a
              href={s.external_link as string}
              target="_blank"
              rel="noopener"
              class="inline-flex h-10 -skew-x-[15deg] items-center bg-primary px-4 font-sans font-bold text-white transition duration-200 hover:scale-105 hover:bg-primary/90"
            >
              <span class="skew-x-[15deg] capitalize">{s.name}</span>
            </a>
          {/each}
        </div>
      </div>
      <div class="hidden h-px w-full bg-white/20 lg:block"></div>
    {/if}

    <div class="flex w-full items-center justify-center py-16 md:justify-start lg:justify-between">
      <div class="flex flex-col gap-8">
        <img src="/logo.png" alt={(global?.site_name as string) ?? 'STYROTEC'} class="mx-auto h-20 w-max md:h-28 lg:mx-0" />
        <div class="mx-auto flex w-min flex-col gap-4 md:mx-0">
          {#if global?.contact_email}
            <a
              href={`mailto:${global.contact_email}`}
              class="whitespace-nowrap font-sans font-medium hover:text-primary"
            >
              {global.contact_email}
            </a>
          {/if}
          {#if global?.contact_phone}
            <a
              href={`tel:${global.contact_phone}`}
              class="whitespace-nowrap font-sans font-medium hover:text-primary"
            >
              {global.contact_phone}
            </a>
          {/if}
          {#if global?.address}
            <div class="whitespace-pre-line">{global.address}</div>
          {/if}
        </div>
      </div>

      <div class="hidden font-sans lg:flex lg:gap-8 xl:gap-16">
        {#each navGroups as group}
          <div>
            <h3 class="mb-4 font-semibold capitalize text-primary">{pickLabel(group.label, lang)}</h3>
            <ul class="space-y-2">
              {#each group.columns.flatMap((c) => c.items).slice(0, 8) as navItem}
                <li>
                  <a href={hrefFor(slugMap, navItem.key, lang)} class="hover:underline">{pickLabel(navItem.label, lang)}</a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>

    <div class="h-px w-full bg-white/20"></div>
    <div
      class="flex flex-col items-center justify-between pb-4 pt-6 text-xs sm:pt-4 sm:text-base md:flex-row print:justify-center"
    >
      <span class="font-sans">© {new Date().getFullYear()} {global?.site_name ?? 'STYROTEC'}</span>
      <div class="flex flex-wrap items-center justify-center gap-2 pt-4 md:pt-0 print:hidden">
        <a href={hrefFor(slugMap, 'legal_notice_page', lang)} class="font-sans hover:underline">{t('legalNotice', lang)}</a>
        <span aria-hidden="true">|</span>
        <a href={hrefFor(slugMap, 'privacy_policy_page', lang)} class="font-sans hover:underline">{t('privacyPolicy', lang)}</a>
      </div>
    </div>
  </div>
</footer>
<div class="h-2 w-full bg-primary"></div>
