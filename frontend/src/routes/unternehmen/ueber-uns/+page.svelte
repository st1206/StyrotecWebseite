<script lang="ts">
	import header from '$lib/assets/images/ueberUns/halle_klein.jpg';
	import { Timeline, TimelineItem } from 'svelte-5-ui-lib';
	import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
    import kreislauf from '$lib/assets/images/styrotec-and-more_schaubild.jpg';
    import vid from '$lib/assets/videos/Imagefilm.mp4';
	import type { ApiMitarbeiterMitarbeiter } from '$lib/cmsTypes/contentTypes';
	import type { AttributesOf } from '$lib/cmsTypes/types';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
    let { data } = $props();
    
</script>

<div  class="">
	<div class="[clip-path:polygon(0%_0%,100%_0%,100%_80%,0%_100%)]">
        <video autoplay loop muted class="h-[800px] w-full object-cover">
            <source src={vid} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
	</div>
</div>
	<!--
<div class="p-4 md:p-10 xl:p-32 xl:mx-[300px]">
	<h1 class="text-xl lg:text-2xl xl:text-3xl ml-3 my-4"> {$_('news.header-titel')}</h1>
	<p class="text-lg lg:text-xl">{$_('news.header-text')}</p>
</div>
-->

<div id="werte"> 
    <div class="p-4 md:p-10 xl:p-32 xl:mx-[300px]">
    	<h1 class="text-xl lg:text-2xl xl:text-3xl ml-3 my-4"> {$_('ueber-uns.werte-titel')}</h1>
	    <p class="text-lg lg:text-xl">{$_('ueber-uns.werte-text')}</p>
    </div>
</div>




<div class="bg-primary" id=""> 

	<div
		class="bg-primary-foreground text-secondary flex w-full flex-col py-8 xl:flex-row xl:py-32 "
	>
		<Accordion.Root type="single" class="text-secondary  ml-4 xl:ml-[10%] xl:w-[80%] xl:text-3xl">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Info nummer 1</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">

                </Accordion.Content>
			</Accordion.Item>
            <Accordion.Item value="item-2">
				<Accordion.Trigger>Info nummer 1</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">

                </Accordion.Content>
			</Accordion.Item>
            <Accordion.Item value="item-3">
				<Accordion.Trigger>Info nummer 1</Accordion.Trigger>
				<Accordion.Content class="xl:text-xl">

                </Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>
</div>

<div class="relative grid h-[1100px] bg-white" id="nachhaltigkeit">
    <img
        src={kreislauf}
        alt="schaubild"
        class="absolute top-[250px] h-[400px] xl:left-[25%] xl:top-[10%] xl:h-[75%]"
    />
    <p class="font-boldItalicFont absolute left-5 top-5 text-xl xl:left-20 xl:top-52 xl:w-[400px]">
        "{$_(`homepage.and-more`)}"
    </p>
    <p
        class="font-boldItalicFont absolute left-5 top-[700px] text-xl xl:left-[75%] xl:right-20 xl:top-52 xl:w-[400px]"
    >
        "{$_(`homepage.and-more2`)}"
    </p>
    <p
        class="font-boldItalicFont absolute bottom-5 left-5 text-xl xl:bottom-52 xl:left-20 xl:w-[400px]"
    >
        "{$_(`homepage.and-more3`)}"
    </p>
</div>

<div class="p-6 md:p-12 lg:p-32  xl:px-96 bg-primary-foreground">
    <div class="bg-secondary lg:py-12 rounded-lg" id="historie">
        <h2 class="text-primary-foreground text-center text-5xl py-4 md:py-8 uppercase font-boldFont">Styrotec Historie</h2>
        <Timeline class="border-primary mx-[15%] " >
            <TimelineItem
                h3Class="mt-2 mb-1 text-xl md:text-lg lg:text-xl xl:text-3xl"
                title={$_('ueber-uns.gründung-titel')}
                dateFormat="year"
                date="2002"
                timeClass="text-primary-foreground font-boldFont text-2xl ml-12"
                divClass="border rounded-lg w-[40px] h-[20px] border-primary-foreground bg-primary"
            >
                <p class="mb-4 text-base font-normal text-primary-foreground ">
                    {$_('ueber-uns.gründung')}
                </p>
            </TimelineItem>
            <TimelineItem
                h3Class="mt-2 mb-1 text-md md:text-lg lg:text-xl xl:text-3xl"
                title={$_('ueber-uns.übernahme-titel')}
                dateFormat="year"
                date="2008"
                timeClass="text-primary-foreground font-boldFont text-2xl ml-12"
                divClass="border rounded-lg w-[40px] h-[20px] border-primary-foreground bg-primary"
            >
                <p class="mb-4 text-base font-normal text-primary-foreground ">
                    {$_('ueber-uns.übernahme')}
                </p>
            </TimelineItem>
            <TimelineItem
                h3Class="mt-2 mb-1 text-md md:text-lg lg:text-xl xl:text-3xl"
                title={$_('ueber-uns.umzug-titel')}
                dateFormat="year"
                date="2015"
                timeClass="text-primary-foreground font-boldFont text-2xl ml-12"
                divClass="border rounded-lg w-[40px] h-[20px] border-primary-foreground bg-primary"
            >
                <p class="mb-4 text-base font-normal text-primary-foreground ">
                    {$_('ueber-uns.umzug')}
                </p>
            </TimelineItem>
            <TimelineItem 
                h3Class="mt-2 mb-1 text-md md:text-lg lg:text-xl xl:text-3xl"
                title={$_('ueber-uns.umzug-2-titel')}
                dateFormat="year"
                date="2021"
                timeClass="text-primary-foreground font-boldFont text-2xl ml-12"
                divClass="border rounded-lg w-[40px] h-[20px] border-primary-foreground bg-primary"
            >
                <p class="mb-4 text-base font-normal text-primary-foreground pb-4">
                    {$_('ueber-uns.umzug-2')}
                </p>
            </TimelineItem>
        </Timeline>
        
    </div> 
</div>



<div class="w-full h-auto bg-primary-foreground" id="team" >
    <div class="pt-24">
        <h2 class="text-5xl text-secondary text-center font-boldFont uppercase">{$_('ueber-uns.team-titel')}</h2>
        <p class="text-2xl text-secondary px-[20%] pt-6">{$_('ueber-uns.team-text')}</p>
    </div>
    
    
    {#await data.mitarbeiter}
        <p>Waiting for Data</p>
    {:then mitarbeiter}
        
        <div class="p-[5%]  lg:p-32 flex flex-col md:flex-row gap-12 flex-wrap">
            {#each mitarbeiter as arbeiter}
                
                <div
                    class="bg-secondary w-[90%] h-[350px]  xl:h-[450px] rounded-lg bg-center bg-cover  md:w-[45%]"
                    style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
                        ? `${PUBLIC_BACKEND_URL}${arbeiter.Bilder.url}`
                        : arbeiter.Bilder.url})"
                >
                   <div class="m-4 p-2 relative top-48 xl:top-72 text-xl xl:text-3xl text-secondary bg-primary-foreground rounded-lg bg-opacity-70">
                        {arbeiter.Name} <br>
                        {arbeiter.Position}
                   </div>
                </div>
            {/each}
        </div>
    {:catch}
        <p>server Error</p>
    {/await}
    
</div>
