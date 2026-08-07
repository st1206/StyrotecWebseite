<script lang="ts">
  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();

  const heightClass = $derived(
    ({
      xs: 'h-4 md:h-8',
      sm: 'h-8 md:h-12',
      md: 'h-16 md:h-24',
      lg: 'h-24 md:h-32',
      xl: 'h-32 md:h-48',
    })[(item.height as string) ?? 'md'] ?? 'h-16 md:h-24',
  );
</script>

<div class="flex w-full items-center {item.is_dark_mode ? 'bg-foreground' : ''} {heightClass}">
  {#if item.with_separator_line}
    <div class="h-px w-full sm:container {item.is_dark_mode ? 'bg-secondary/20' : 'bg-border/20'}"></div>
  {/if}
</div>
