<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ApiMaschineMaschine } from '$lib/cmsTypes/contentTypes';
	import type { APIResponseCollection } from '$lib/cmsTypes/types';
	import {
		Carousel,
		CarouselContent,
		CarouselItem,
		CarouselNext,
		CarouselPrevious
	} from '$lib/components/ui/carousel';

	let { gefilterteMaschine }: { gefilterteMaschine: APIResponseCollection<ApiMaschineMaschine> } =
		$props();
</script>

{#each gefilterteMaschine.data as masch}
	<Carousel>
		<CarouselContent>
			{#each masch.Bilder as bild}
				<CarouselItem class="object-cover object-center">
                    <span>TEST ITEM</span>
					<img src={`${PUBLIC_BACKEND_URL}${bild.url}`} alt="bildergallerie" />
				</CarouselItem>
			{/each}
		</CarouselContent>
		<CarouselPrevious class="left-10" />
		<CarouselNext class="right-10" />
	</Carousel>
{/each}
