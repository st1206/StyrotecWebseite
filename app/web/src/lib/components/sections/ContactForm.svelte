<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { assetUrl } from '$lib/assets';
  import { t } from '$lib/config/nav';
  import type { Lang } from '$lib/config/routes';
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: Lang;
    basePath?: string;
  }
  let { item, lang = 'de' }: Props = $props();

  const employee = $derived(item.employee as Record<string, unknown> | null);
  let submitting = $state(false);

  const result = $derived($page.form as { contactSuccess?: boolean; contactError?: string } | null);

  const inputClass =
    'mt-1 flex h-10 w-full border-primary bg-foreground px-3 py-2 text-base text-secondary placeholder:text-muted-foreground focus-visible:border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';
</script>

<section
  id="contact-form"
  data-directus={edit({ collection: 'block_contact_form', item: item.id as string, fields: ['employee'] })}
>
  <!-- angled transition into the dark contact band -->
  <div
    class="mt-20 h-14 w-full translate-y-[1px] bg-foreground [clip-path:polygon(100%_0,100%_100%,0_100%)] print:hidden"
  ></div>

  <div class="bg-foreground">
    <div class="flex w-full flex-col px-4 sm:container">
      <div
        class="mb-12 mt-16 grid h-full grid-cols-1 gap-x-8 bg-secondary/10 p-8 text-secondary md:grid-cols-5 lg:gap-x-12 xl:grid-cols-6"
      >
        <h2 class="col-span-1 mb-6 font-sans text-3xl font-bold md:col-span-5 xl:col-span-6">
          {t('contactHeading', lang)}
        </h2>

        {#if employee}
          <div class="col-span-1 mb-8 flex h-max flex-col bg-secondary/10 md:col-span-2 md:mb-0">
            {#if employee.contact_picture || employee.picture}
              <img
                class="h-[316px] w-full object-cover object-top"
                src={assetUrl((employee.contact_picture ?? employee.picture) as string, { width: 640, format: 'webp' })}
                alt={(employee.name as string) ?? ''}
                loading="lazy"
              />
            {/if}
            <div class="p-4">
              {#if employee.position}
                <h3 class="text-sm text-primary">{employee.position}</h3>
              {/if}
              <h2 class="font-sans text-3xl font-bold lg:text-4xl">{employee.name}</h2>
              {#if employee.tel}
                <a href={`tel:${employee.tel}`} class="mt-2 block text-sm text-secondary/80 hover:text-primary">{employee.tel}</a>
              {/if}
              {#if employee.email}
                <a href={`mailto:${employee.email}`} class="block text-sm text-secondary/80 hover:text-primary">{employee.email}</a>
              {/if}
            </div>
          </div>
        {/if}

        <form
          method="POST"
          action="?/contact"
          class="col-span-1 flex flex-col gap-2 md:col-span-3 xl:col-span-4 print:hidden"
          use:enhance={() => {
            submitting = true;
            return async ({ update }) => {
              submitting = false;
              await update({ reset: true });
            };
          }}
        >
          <input type="hidden" name="recipient" value={(employee?.id as string) ?? ''} />

          <div class="flex w-full flex-col gap-4 sm:flex-row">
            <label class="block w-full">
              <span class="text-sm font-medium">{t('formName', lang)}*</span>
              <input name="name" required class={inputClass} />
            </label>
            <label class="block w-full">
              <span class="text-sm font-medium">{t('formCompany', lang)}</span>
              <input name="company" class={inputClass} />
            </label>
          </div>
          <div class="flex w-full flex-col gap-4 sm:flex-row">
            <label class="block w-full">
              <span class="text-sm font-medium">{t('formEmail', lang)}*</span>
              <input name="email" type="email" required class={inputClass} />
            </label>
            <label class="block w-full">
              <span class="text-sm font-medium">{t('formPhone', lang)}</span>
              <input name="phone" type="tel" class={inputClass} />
            </label>
          </div>
          <label class="block w-full">
            <span class="text-sm font-medium">{t('formMessage', lang)}*</span>
            <textarea name="message" required rows="5" class="{inputClass} min-h-32 h-auto whitespace-pre-wrap"></textarea>
          </label>

          {#if result?.contactSuccess}
            <div class="mt-2 flex items-center gap-2 bg-secondary p-2 text-sm text-green-600">
              {t('formSuccess', lang)}
            </div>
          {:else if result?.contactError}
            <div class="mt-2 flex items-center gap-2 bg-secondary p-2 text-sm text-destructive">
              {t('formError', lang)}
            </div>
          {/if}

          <button
            type="submit"
            disabled={submitting}
            class="ml-auto mr-2 mt-2 inline-flex h-10 -skew-x-[15deg] items-center justify-center bg-primary px-4 py-2 font-sans font-bold tracking-wide text-white transition duration-200 hover:scale-105 hover:bg-primary/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <span class="skew-x-[15deg]">{submitting ? '…' : t('formSubmit', lang)}</span>
          </button>
        </form>
      </div>
      <div class="h-px w-full bg-white/20"></div>
    </div>
  </div>
</section>
