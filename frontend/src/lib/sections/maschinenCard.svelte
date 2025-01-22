<script lang="ts">
	import type { ApiArticleArticle, ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
	import type { APIResponseCollection } from '$lib/cmsTypes/types';
	import { Card } from 'svelte-5-ui-lib';

	let { maschines }: { maschines: APIResponseCollection<ApiMaschineMaschine> } = $props();
	console.log(maschines)
</script>

<div class="flex flex-col gap-8">
    <div class="flex flex-wrap gap-4">
        {#each maschines.data as maschine}
            <Card class="max-w-[250px]">
                <!-- <span class="text-sm">{dateFormatter.format(new Date(article.publishedAt))}</span> -->
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {maschine.Titel}
                </h5>
                <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
                    {maschine.Bezeichnung}
                </p>
                <span class="font-medium dark:text-white">Baujahr: {maschine.Baujahr}, {maschine.slug} </span>    
                <p><a href={`/produkte/gebrauchtmaschinen/cnc-maschinen/${maschine.slug}`}>Weiter zur maschine</a></p>
            </Card>
        {/each}    
    </div>
</div>