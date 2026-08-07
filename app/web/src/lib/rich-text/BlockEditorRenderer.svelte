<script lang="ts">
  interface Node {
    type: string;
    content?: Node[];
    text?: string;
    marks?: Array<{ type: string; attrs?: Record<string, unknown> }>;
    attrs?: Record<string, unknown>;
  }

  interface Props {
    /** Block-Editor / ProseMirror-style document — accepts unknown for caller convenience */
    content: unknown;
  }

  let { content: rawContent }: Props = $props();
  const content = $derived(rawContent as Node | null | undefined);
</script>

{#snippet renderNode(node: Node)}
  {#if node.type === 'text'}
    {@const marks = node.marks ?? []}
    {#if marks.some((m) => m.type === 'bold')}
      <strong>{node.text}</strong>
    {:else if marks.some((m) => m.type === 'italic')}
      <em>{node.text}</em>
    {:else if marks.some((m) => m.type === 'code')}
      <code>{node.text}</code>
    {:else if marks.some((m) => m.type === 'link')}
      {@const link = marks.find((m) => m.type === 'link')?.attrs as { href?: string } | undefined}
      <a href={link?.href} class="text-primary-500 underline">{node.text}</a>
    {:else}
      {node.text}
    {/if}
  {:else if node.type === 'paragraph'}
    <p>{#each node.content ?? [] as c}{@render renderNode(c)}{/each}</p>
  {:else if node.type === 'heading'}
    {@const level = (node.attrs?.level as number) ?? 2}
    {#if level === 1}
      <h1>{#each node.content ?? [] as c}{@render renderNode(c)}{/each}</h1>
    {:else if level === 2}
      <h2>{#each node.content ?? [] as c}{@render renderNode(c)}{/each}</h2>
    {:else if level === 3}
      <h3>{#each node.content ?? [] as c}{@render renderNode(c)}{/each}</h3>
    {:else}
      <h4>{#each node.content ?? [] as c}{@render renderNode(c)}{/each}</h4>
    {/if}
  {:else if node.type === 'bulletList'}
    <ul>{#each node.content ?? [] as c}{@render renderNode(c)}{/each}</ul>
  {:else if node.type === 'orderedList'}
    <ol>{#each node.content ?? [] as c}{@render renderNode(c)}{/each}</ol>
  {:else if node.type === 'listItem'}
    <li>{#each node.content ?? [] as c}{@render renderNode(c)}{/each}</li>
  {:else if node.type === 'blockquote'}
    <blockquote>{#each node.content ?? [] as c}{@render renderNode(c)}{/each}</blockquote>
  {:else if node.type === 'codeBlock'}
    <pre><code>{#each node.content ?? [] as c}{@render renderNode(c)}{/each}</code></pre>
  {:else if node.type === 'image'}
    {@const src = node.attrs?.src as string | undefined}
    {@const alt = node.attrs?.alt as string | undefined}
    {#if src}<img {src} alt={alt ?? ''} class="rounded-lg" />{/if}
  {:else if node.content}
    {#each node.content as c}{@render renderNode(c)}{/each}
  {/if}
{/snippet}

{#if content}
  {@render renderNode(content as Node)}
{/if}
