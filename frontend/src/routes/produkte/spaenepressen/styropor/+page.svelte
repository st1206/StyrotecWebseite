<script lang="ts">
    import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
    import top from '$lib/assets/images/portalfraesmaschinen/FS10ST_klein.jpg';
</script>



<div class="relative ">
	<div
		class="bg-primary-foreground absolute hidden lg:block h-[230px] w-[50%] opacity-95 [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)]"
	>
		<h1 class="text-secondary hidden lg:block font-boldFont pl-10 pt-24 text-4xl xl:text-5xl">Schlagwort.</h1>
	</div>
	<img src={top} alt="FS10 Titelbild" class="h-[300px] w-full object-cover lg:h-[700px]" />
	<div
		class="bg-primary-foreground absolute hidden lg:block bottom-0 right-0 h-[200px] w-[40%] [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)]"
	></div>
</div>

<div class="relative text-xl">
	<div class="bg-primary-foreground h-[30px] w-full"></div>
	<img
		src={top}
		alt="FS10 Titelbild"
		class="absolute -top-[170px] hidden lg:block right-0  w-[40%] object-cover [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:h-[700px]"
	/>
	<div
		class="from-primary-foreground/25 hidden lg:block via-primary-foreground/15 to-secondary absolute -top-[170px] right-0 h-[300px] w-[40%] bg-gradient-to-bl [clip-path:polygon(0%_28.5%,100%_0%,100%_100%,0%_100%)] lg:h-[700px]"
	></div>
	<div class="mx-4 pb-3 ml-[30px] lg:ml-[0px]  lg:mr-[520px] xl:mr-[720px] mt-8 lg:mt-[50px]">
		<div>
			<h1 class="font-boldFont  text-5xl text-center uppercase">
				{$_(`cnc-maschinen.titel`)}
			</h1>
			<p class="p-4 md:px-8 lg:px-16 text-sm sm:text-xl">{$_(`cnc-maschinen.text`)}</p>
			
		</div>
	</div>
	
</div>