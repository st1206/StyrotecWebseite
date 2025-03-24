<script lang="ts">
	import header from '$lib/assets/images/ueberUns/halle_klein.jpg';
	import { Button, Timeline, TimelineItem } from 'svelte-5-ui-lib';
	import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
    
    import vid from '$lib/assets/videos/Imagefilm.mp4';
	import type { ApiMitarbeiterMitarbeiter } from '$lib/cmsTypes/contentTypes';
	import type { AttributesOf } from '$lib/cmsTypes/types';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
    let { data } = $props();
    
</script>

<div  class="">
	<div class="[clip-path:polygon(0%_0%,100%_0%,100%_80%,0%_100%)]">
        <video autoplay loop muted class="h-[400px] md:lg-[500px] lg:h-[700px] xl:h-[800px] w-full object-cover">
            <source src={vid} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
	</div>
</div>
	



<!-- Werte Vision Mission -->
<div class="px-[5%] pb-[5%]" id="werte">
    <h1 class="text-xl md:text-2xl lg:text-4xl xl:text-5xl ml-3  font-boldFont uppercase text-center pb-4 md:pb-6 lg:pb-8 xl:pb-12"> {$_('ueber-uns.werte-titel')}</h1>
    <div class="flex flex-col md:flex-row flex-wrap justify-around gap-2 lg:gap-8">
        <div class="w-[95%] md:w-[48%] bg-primary-foreground text-secondary p-4 md:p-8 lg:p-12 xl:p-16 rounded-lg">
            <h2 class="text-xl md:text-2xl lg:text-3xl xl:text-5xl uppercase font-boldFont text-primary pb-4">{$_('ueber-uns.wert1')}</h2>
            <p class="text-justify">{$_('ueber-uns.wert1-text')}</p>
        </div>

        <div class="w-[95%] md:w-[48%] bg-primary-foreground text-secondary p-4 md:p-8 lg:p-12 xl:p-16 rounded-lg">
            <h2 class="text-xl md:text-2xl lg:text-3xl xl:text-5xl uppercase font-boldFont text-primary pb-4">{$_('ueber-uns.wert2')}</h2>
            <p class="text-justify">{$_('ueber-uns.wert2-text')}</p>
        </div>

        <div class="w-[95%] md:w-[48%] bg-primary-foreground text-secondary p-4 md:p-8 lg:p-12 xl:p-16 rounded-lg">
            <h2 class="text-xl md:text-2xl lg:text-3xl xl:text-5xl uppercase font-boldFont text-primary pb-4">{$_('ueber-uns.wert3')}</h2>
            <p class="text-justify">{$_('ueber-uns.wert3-text')}</p>
        </div>
    </div>
</div>






<!-- Nachhaltigkeit -->
<div class="p-[5%] xl:p-[5%]" id="nachhaltigkeit">
    <div class="px-[10%]">
        <h2 class="text-xl md:text-2xl lg:text-3xl xl:text-5xl text-center font-boldFont uppercase pb-2 md:pb-4 lg:pb-6 xl:pb-8">{$_('ueber-uns.nachhaltigkeit-titel')}</h2>
        <p class="text-lg md:text-xl lg:text-2xl xl:text-3xl text-center pb-3">{$_('ueber-uns.nachhaltigkeit-text1')}</p>
        <p class="text-lg md:text-xl lg:text-2xl xl:text-3xl text-center pb-3">{$_('ueber-uns.nachhaltigkeit-text2')}</p>
        <p class="text-lg md:text-xl lg:text-2xl xl:text-3xl text-center ">{$_('ueber-uns.nachhaltigkeit-text3')}</p>
    </div>

    <div class=" flex flex-col md:flex-row flex-wrap justify-around gap-2 md:gap-4 lg:gap-6 xl:gap-8 pt-8 md:pt-10 lg:pt-14 xl:pt-20">
        <div class="relative md:w-[48%] bg-primary-foreground text-secondary rounded-lg p-4 md:p-6 lg:p-8 xl:p-12">
            <h3 class="text-xl md:text-2xl lg:text-3xl xl:text-5xl text-primary uppercase font-boldFont pb-4 md:pb-6 lg:pb-8 xl:pb-10">{$_('ueber-uns.wiederverwendung')}</h3>
            <p class=" text-justify pb-8 md:pb-10 lg:pb-12 xl:pb-16">{$_('ueber-uns.wiederverwendung-text')}</p>
            <Button href="/produkte/gebrauchtmaschinen" class="absolute right-4 md:right-6 lg:right-8 xl:right-10 bottom-4 md:bottom-6 lg:bottom-8 xl:bottom-10  bg-primary text-secondary">{$_('portalfraes.cta')}</Button>
        </div>
        <div class="relative md:w-[48%] bg-primary-foreground text-secondary rounded-lg p-4 md:p-6 lg:p-8 xl:p-12">
            <h3 class="text-xl md:text-2xl lg:text-3xl xl:text-5xl text-primary uppercase font-boldFont pb-4 md:pb-6 lg:pb-8 xl:pb-10">{$_('ueber-uns.abfall')}</h3>
            <p class=" text-justify pb-8 md:pb-10 lg:pb-12 xl:pb-16">{$_('ueber-uns.abfall-text')}</p>
            <Button href="/produkte/spaenepressen" class="absolute right-4 md:right-6 lg:right-8 xl:right-10 bottom-4 md:bottom-6 lg:bottom-8 xl:bottom-10  bg-primary text-secondary">{$_('portalfraes.cta')}</Button>
        </div>
        <div class="relative md:w-[48%] bg-primary-foreground text-secondary rounded-lg p-4 md:p-6 lg:p-8 xl:p-12">
            <h3 class="text-xl md:text-2xl lg:text-3xl xl:text-5xl text-primary uppercase font-boldFont pb-4 md:pb-6 lg:pb-8 xl:pb-10">{$_('ueber-uns.wiederverwertung')}</h3>
            <p class=" text-justify pb-8 md:pb-10 lg:pb-12 xl:pb-16">{$_('ueber-uns.wiederverwertung-text')}</p>
            <Button href="/dienstleistungen/maschinenmodernisierung" class="absolute right-4 md:right-6 lg:right-8 xl:right-10 bottom-4 md:bottom-6 lg:bottom-8 xl:bottom-10  bg-primary text-secondary">{$_('portalfraes.cta')}</Button>
        </div>
    </div>
</div>

<!-- Historie -->
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


<!-- Team -->
<div class="w-full h-auto bg-primary-foreground" id="team" >
    <div class="pt-4 xl:pt-24">
        <h2 class="text-4xl xl:text-5xl text-secondary text-center font-boldFont uppercase">{$_('ueber-uns.team-titel')}</h2>
        <p class="text-xl text-secondary lg:px-32 px-[5%] xl:px-[20%] pt-6 lg:pt-12 text-justify">{$_('ueber-uns.team-text')}</p>
    </div>
    
    
    {#await data.mitarbeiter}
        <p>Waiting for Data</p>
    {:then mitarbeiter}
        
        <div class="p-[5%]  lg:px-32 flex flex-col md:flex-row gap-2 lg:gap-10 flex-wrap">
            {#each mitarbeiter as arbeiter}
                
                <div
                    class="bg-secondary w-[90%] h-[350px]  xl:h-[450px] rounded-lg bg-center bg-cover  md:w-[47%]"
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
