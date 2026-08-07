<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/config/nav';
  import type { Lang } from '$lib/config/routes';

  // hooks validated the prefix against the language registry; default to 'de'
  const lang = $derived(($page.params.lang || 'de') as Lang);
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-40 text-center">
  <h1 class="font-sans text-7xl font-bold text-foreground">{$page.status}</h1>
  <p class="font-sans text-lg font-medium">{t('notFoundTitle', lang)}</p>
  <p class="text-muted-foreground">{t('notFoundText', lang)}</p>
  <a
    href={`/${lang}`}
    class="mt-4 inline-flex h-10 -skew-x-[15deg] items-center bg-primary px-4 font-sans font-bold text-white transition duration-200 hover:scale-105 hover:bg-primary/90"
  >
    <span class="skew-x-[15deg]">{t('toHomepage', lang)}</span>
  </a>
</div>
