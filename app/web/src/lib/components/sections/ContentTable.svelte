<script lang="ts">
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();

  const tables = $derived((item.tables as Array<Record<string, unknown>> | null) ?? []);
  const dark = $derived(Boolean(item.is_dark_mode));

  type TableRow = { label?: string; value?: string };
  const rowsOf = (table: Record<string, unknown>) => ((table.rows as TableRow[] | null) ?? []);
</script>

<section
  data-dark={dark ? 'true' : undefined}
  data-directus={edit({ collection: 'block_content_table', item: item.id as string, fields: ['tables'] })}
>
  {#if dark}
    <div
      class="mt-24 h-14 w-full translate-y-[1px] bg-foreground [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28 [[data-dark]+[data-dark]_&]:hidden"
    ></div>
  {/if}

  <div class={dark ? 'bg-foreground text-secondary' : ''}>
    <div class="px-4 sm:container 2xl:px-0">
      <div
        class="grid grid-cols-1 gap-8 py-16 {tables.length > 1 ? 'md:grid-cols-2' : 'md:mx-16 lg:mx-36 xl:mx-48'}"
      >
        {#each tables as table (table.id)}
          <div class="mx-auto h-full w-full">
            {#if table.title}
              <h4
                class="border-b border-primary p-4 text-left font-sans font-medium uppercase {dark
                  ? 'bg-secondary/10 text-secondary'
                  : 'bg-foreground/10 text-foreground'}"
              >
                {table.title}
              </h4>
            {/if}
            <div class="overflow-x-auto">
              <table class="w-full text-sm {dark ? 'text-secondary' : 'text-foreground'}">
                <tbody>
                  {#each rowsOf(table) as row}
                    <tr
                      class="border-b {dark
                        ? 'border-secondary/20 even:bg-secondary/5 hover:bg-secondary/10'
                        : 'border-foreground/20 even:bg-foreground/5 hover:bg-foreground/10'}"
                    >
                      <th class="w-1/2 p-3 text-left align-middle font-medium {dark ? 'bg-secondary/10' : 'bg-foreground/10'}">
                        {row.label}
                      </th>
                      <td class="p-3 align-middle font-medium">{row.value}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  {#if dark}
    <div
      class="mb-32 h-14 w-full -translate-y-[1px] bg-foreground [clip-path:polygon(100%_0%,0%_0%,0%_100%)] [[data-dark]:has(+[data-dark])_&]:hidden"
    ></div>
  {/if}
</section>
