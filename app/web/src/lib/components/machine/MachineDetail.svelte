<script lang="ts">
  import { assetUrl, srcset } from '$lib/assets';
  import { specLabels, conditionLabels, t } from '$lib/config/nav';
  import type { Lang } from '$lib/config/routes';
  import { editField } from '$lib/directus-visual-edit';
  import BlockEditorRenderer from '$lib/rich-text/BlockEditorRenderer.svelte';

  interface Props {
    machine: Record<string, unknown>;
    collection: string;
    lang: Lang;
    backHref: string;
  }
  let { machine, collection, lang, backHref }: Props = $props();

  const pictures = $derived(
    ((machine.pictures as Array<{ directus_files_id: string }> | null) ?? [])
      .map((p) => p?.directus_files_id)
      .filter(Boolean),
  );
  let activePicture = $state(0);

  const specRows = $derived(
    Object.entries(specLabels)
      .map(([field, label]) => {
        let value = machine[field];
        if (field === 'condition_key' && typeof value === 'string') {
          value = conditionLabels[value]?.[lang] ?? value;
        }
        return [label[lang], value] as const;
      })
      .filter(([, v]) => v !== null && v !== undefined && v !== ''),
  );

  const contact = $derived(machine.contact_person as Record<string, unknown> | null);
</script>

<section class="grid grid-cols-1 gap-x-16 gap-y-12 px-4 py-12 sm:container lg:grid-cols-2">
  <!-- Gallery -->
  <div class="flex flex-col">
    {#if pictures.length > 0}
      <div class="w-full bg-white">
        <img
          src={assetUrl(pictures[activePicture], { width: 1200, format: 'webp' })}
          srcset={srcset(pictures[activePicture], [600, 1200, 1800]) ?? undefined}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt={machine.name as string}
          class="h-[330px] w-full object-contain object-center md:h-[550px]"
        />
      </div>
      {#if pictures.length > 1}
        <div class="mx-auto mt-4 w-full max-w-2xl lg:max-w-none">
          <div class="grid grid-cols-5 gap-2 sm:gap-4">
            {#each pictures as pic, i}
              <button
                class="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden bg-white focus:outline-none {i === activePicture ? 'ring-2 ring-primary ring-offset-2 ring-offset-secondary' : ''}"
                onclick={() => (activePicture = i)}
              >
                <img
                  src={assetUrl(pic, { width: 240, height: 240, fit: 'cover', format: 'webp' })}
                  alt=""
                  class="h-full w-full object-cover object-center"
                />
              </button>
            {/each}
          </div>
        </div>
      {/if}
    {/if}
  </div>

  <!-- Data sheet -->
  <div class="flex flex-col">
    <a href={backHref} class="text-sm text-primary hover:underline">← {t('backToOverview', lang)}</a>

    <h1
      class="mt-4 font-sans text-3xl font-bold tracking-tight sm:text-4xl"
      data-directus={editField(collection, machine.id as string, 'translations')}
    >
      {machine.name}
    </h1>
    {#if machine.designation}
      <p class="mt-1 text-lg text-muted-foreground">{machine.designation}</p>
    {/if}

    <div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
      <span
        class="inline-flex -skew-x-[15deg] items-center px-3 py-1 font-sans text-sm font-bold {machine.available ? 'bg-primary text-primary-foreground' : 'bg-foreground text-secondary'}"
      >
        <span class="skew-x-[15deg]">{machine.available ? t('available', lang) : t('sold', lang)}</span>
      </span>
      {#if machine.location}
        <span class="text-sm text-muted-foreground">{t('location', lang)}: {machine.location}</span>
      {/if}
      {#if machine.internal_id}
        <span class="text-sm text-muted-foreground">{t('internalId', lang)}: {machine.internal_id}</span>
      {/if}
    </div>

    <!-- Technical data -->
    <div class="mt-6">
      <div class="border-b border-primary bg-foreground/10 p-4 font-sans font-medium uppercase">
        {t('specifications', lang)}
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <tbody>
            {#each specRows as [label, value]}
              <tr class="border-b border-foreground/20 bg-foreground/5 hover:bg-foreground/10">
                <th class="w-1/3 bg-foreground/10 px-4 py-2 text-left align-middle font-medium sm:w-1/4">
                  {label}
                </th>
                <td class="px-4 py-2 align-middle font-medium">{value}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Description -->
    {#if machine.description}
      <div class="my-10">
        <h2 class="mb-4 font-sans text-2xl font-bold">{t('descriptionHeading', lang)}</h2>
        <div
          class="prose prose-neutral max-w-none text-justify"
          data-directus={editField(collection, machine.id as string, 'translations')}
        >
          <BlockEditorRenderer content={machine.description} />
        </div>
      </div>
    {/if}

    <!-- Contact person card (mirrors the old dark-band employee card, light variant) -->
    {#if contact}
      <div class="mt-auto max-w-sm">
        <div class="mb-2 text-xs uppercase tracking-wide text-muted-foreground">{t('contactPerson', lang)}</div>
        <div class="flex flex-col bg-foreground/10 shadow-primary">
          {#if contact.contact_picture || contact.picture}
            <img
              src={assetUrl((contact.contact_picture ?? contact.picture) as string, { width: 640, format: 'webp' })}
              alt={(contact.name as string) ?? ''}
              class="h-[240px] w-full object-cover object-top"
              loading="lazy"
            />
          {/if}
          <div class="p-4">
            {#if contact.position}
              <div class="text-sm text-primary">{contact.position}</div>
            {/if}
            <div class="font-sans text-2xl font-bold">{contact.name}</div>
            {#if contact.email}
              <a class="mt-2 block text-sm hover:text-primary hover:underline" href={`mailto:${contact.email}`}>{contact.email}</a>
            {/if}
            {#if contact.tel}
              <a class="block text-sm hover:text-primary hover:underline" href={`tel:${contact.tel}`}>{contact.tel}</a>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
