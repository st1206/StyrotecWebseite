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

<div  class="bg-primary-foreground mt-[66px]">
	<div class="[clip-path:polygon(0%_0%,100%_0%,100%_80%,0%_100%)]">
        <video autoplay loop muted class="h-[400px] md:lg-[500px] lg:h-[700px] xl:h-[800px] w-full object-cover">
            <source src={vid} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
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
                    class="bg-secondary w-[90%] h-[350px]  xl:h-[380px] rounded-lg bg-center bg-cover  md:w-[47%]"
                    style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
                        ? `${PUBLIC_BACKEND_URL}${arbeiter.Bilder.url}`
                        : arbeiter.Bilder.url})"
                >
                   <div class="m-4 p-2 relative top-52 md:top-52 xl:top-64 text-xl xl:text-3xl text-secondary bg-primary-foreground rounded-lg bg-opacity-70">
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

<!-- philosophie -->
<div class="p-[5%]" id="werte">
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


<!-- Historie -->
<div class="p-6 md:p-12 lg:p-32  xl:px-64 bg-primary-foreground" id="historie">
    
    <div class="bg-secondary h-auto w-full flex jsutify-center items-center p-4 md:p-8 lg:p-12 xl:p-16 rounded-lg">
        
        <div class="mx-auto w-full grid grid-cols-9">
            <h2 class="text-primary-foreground text-center col-span-9 text-5xl pb-4 md:pb-8 lg:pb-12 xl:pb-16 uppercase font-boldFont">Styrotec Historie</h2>
            <!-- 1. Punkt / links -->
            <div class="col-span-4 w-full h-full ">
                <div class="w-full h-full bg-primary-foreground text-secondary rounded-lg p-2 md:p-4">
                    <h2 class="text-md md:text-xl lg:text-2xl xl:text-3xl uppercase font-boldFont">{$_('ueber-uns.gründung-titel')}</h2>
                    <p>{$_('ueber-uns.gründung')}</p>
                </div>  
            </div>
            <div class="col-span-1 w-full h-full flex justify-center items-center">
                <div class="h-full w-1 bg-primary"></div>
                <div class="absolute w-12 h-12 rounded-full bg-primary z-10 text-center"><p class="pt-3 font-boldFont">2002</p></div>
            </div>
            <div class="col-span-4 w-full h-full "></div>
            <!-- Abstand -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center"><div class="h-[30px] md:h-[50px] lg:h-[70px] xl:[100px] w-1 bg-primary"></div></div>
            <div class="col-span-4 w-full h-full "></div>
               
            
            <!-- 2. Punkt / rechts -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center">
                <div class="h-full w-1 bg-primary"></div>
                <div class="absolute w-12 h-12 rounded-full bg-primary z-10 text-center"><p class="pt-3 font-boldFont">2003</p></div>
            </div>
            <div class="col-span-4 w-full h-full ">
                <div class="w-full h-full bg-primary-foreground text-secondary rounded-lg p-2 md:p-4">
                    <h2 class="text-md md:text-xl lg:text-2xl xl:text-3xl uppercase font-boldFont">{$_('ueber-uns.portfolio-titel')}</h2>
                    <p>{$_('ueber-uns.portfolio')}</p>
                </div>  
            </div>
            <!-- Abstand -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center"><div class="h-[30px] md:h-[50px] lg:h-[70px] xl:[100px] w-1 bg-primary"></div></div>
            <div class="col-span-4 w-full h-full "></div>


            <!-- 3. Punkt / links -->
            <div class="col-span-4 w-full h-full">
                <div class="w-full h-full bg-primary-foreground text-secondary rounded-lg p-2 md:p-4">
                    <h2 class="text-md md:text-xl lg:text-2xl xl:text-3xl uppercase font-boldFont">{$_('ueber-uns.erste-titel')}</h2>
                    <p>{$_('ueber-uns.erste')}</p>
                </div>  
            </div>
            <div class="col-span-1 w-full h-full flex justify-center items-center">
                <div class="h-full w-1 bg-primary"></div>
                <div class="absolute w-12 h-12 rounded-full bg-primary z-10 text-center"><p class="pt-3 font-boldFont">2004</p></div>
            </div>
            <div class="col-span-4 w-full h-full"></div>
            <!-- Abstand -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center"><div class="h-[30px] md:h-[50px] lg:h-[70px] xl:[100px] w-1 bg-primary"></div></div>
            <div class="col-span-4 w-full h-full "></div>


            <!-- 4. Punkt / rechts -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center">
                <div class="h-full w-1 bg-primary"></div>
                <div class="absolute w-12 h-12 rounded-full bg-primary z-10 text-center"><p class="pt-3 font-boldFont">2005</p></div>
            </div>
            <div class="col-span-4 w-full h-full ">
                <div class="w-full h-full bg-primary-foreground text-secondary rounded-lg p-2 md:p-4">
                    <h2 class="text-md md:text-xl lg:text-2xl xl:text-3xl uppercase font-boldFont">{$_('ueber-uns.gebrauma-titel')}</h2>
                    <p>{$_('ueber-uns.gebrauma')}</p>
                </div>  
            </div>
            <!-- Abstand -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center"><div class="h-[30px] md:h-[50px] lg:h-[70px] xl:[100px] w-1 bg-primary"></div></div>
            <div class="col-span-4 w-full h-full "></div>


            <!-- 5. Punkt / links -->
            <div class="col-span-4 w-full h-full">
                <div class="w-full h-full bg-primary-foreground text-secondary rounded-lg p-2 md:p-4">
                    <h2 class="text-md md:text-xl lg:text-2xl xl:text-3xl uppercase font-boldFont">{$_('ueber-uns.portal-titel')}</h2>
                    <p>{$_('ueber-uns.portal')}</p>
                </div>  
            </div>
            <div class="col-span-1 w-full h-full flex justify-center items-center">
                <div class="h-full w-1 bg-primary"></div>
                <div class="absolute w-12 h-12 rounded-full bg-primary z-10 text-center"><p class="pt-3 font-boldFont">2007</p></div>
            </div>
            <div class="col-span-4 w-full h-full"></div>
            <!-- Abstand -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center"><div class="h-[30px] md:h-[50px] lg:h-[70px] xl:[100px] w-1 bg-primary"></div></div>
            <div class="col-span-4 w-full h-full "></div>


            <!-- 6. Punkt / rechts -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center">
                <div class="h-full w-1 bg-primary"></div>
                <div class="absolute w-12 h-12 rounded-full bg-primary z-10 text-center"><p class="pt-3 font-boldFont">2009</p></div>
            </div>
            <div class="col-span-4 w-full h-full ">
                <div class="w-full h-full bg-primary-foreground text-secondary rounded-lg p-2 md:p-4">
                    <h2 class="text-md md:text-xl lg:text-2xl xl:text-3xl uppercase font-boldFont">{$_('ueber-uns.übernahme-titel')}</h2>
                    <p>{$_('ueber-uns.übernahme')}</p>
                </div>  
            </div>
            <!-- Abstand -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center"><div class="h-[30px] md:h-[50px] lg:h-[70px] xl:[100px] w-1 bg-primary"></div></div>
            <div class="col-span-4 w-full h-full "></div>


            <!-- 7. Punkt / links -->
            <div class="col-span-4 w-full h-full">
                <div class="w-full h-full bg-primary-foreground text-secondary rounded-lg p-2 md:p-4">
                    <h2 class="text-md md:text-xl lg:text-2xl xl:text-3xl uppercase font-boldFont">{$_('ueber-uns.umzug-titel')}</h2>
                    <p>{$_('ueber-uns.umzug')}</p>
                </div>  
            </div>
            <div class="col-span-1 w-full h-full flex justify-center items-center">
                <div class="h-full w-1 bg-primary"></div>
                <div class="absolute w-12 h-12 rounded-full bg-primary z-10 text-center"><p class="pt-3 font-boldFont">2015</p></div>
            </div>
            <div class="col-span-4 w-full h-full"></div>
            <!-- Abstand -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center"><div class="h-[30px] md:h-[50px] lg:h-[70px] xl:[100px] w-1 bg-primary"></div></div>
            <div class="col-span-4 w-full h-full "></div>


            <!-- 8. Punkt / rechts -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center">
                <div class="h-full w-1 bg-primary"></div>
                <div class="absolute w-12 h-12 rounded-full bg-primary z-10 text-center"><p class="pt-3 font-boldFont">2021</p></div>
            </div>
            <div class="col-span-4 w-full h-full ">
                <div class="w-full h-full bg-primary-foreground text-secondary rounded-lg p-2 md:p-4">
                    <h2 class="text-md md:text-xl lg:text-2xl xl:text-3xl uppercase font-boldFont">{$_('ueber-uns.umzug-2-titel')}</h2>
                    <p>{$_('ueber-uns.umzug-2')}</p>
                </div>  
            </div>
            <!-- Abstand -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center"><div class="h-[30px] md:h-[50px] lg:h-[70px] xl:[100px] w-1 bg-primary"></div></div>
            <div class="col-span-4 w-full h-full "></div>


            <!-- 9. Punkt / links -->
            <div class="col-span-4 w-full h-full">
                <div class="w-full h-full bg-primary-foreground text-secondary rounded-lg p-2 md:p-4">
                    <h2 class="text-md md:text-xl lg:text-2xl xl:text-3xl uppercase font-boldFont">{$_('ueber-uns.portfolio2-titel')}</h2>
                    <p>{$_('ueber-uns.portfolio2')}</p>
                </div>  
            </div>
            <div class="col-span-1 w-full h-full flex justify-center items-center">
                <div class="h-full w-1 bg-primary"></div>
                <div class="absolute w-12 h-12 rounded-full bg-primary z-10 text-center"><p class="pt-3 font-boldFont">2022</p></div>
            </div>
            <div class="col-span-4 w-full h-full"></div>
            <!-- Abstand -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center"><div class="h-[30px] md:h-[50px] lg:h-[70px] xl:[100px] w-1 bg-primary"></div></div>
            <div class="col-span-4 w-full h-full "></div>
            
            
            <!-- 10. Punkt / rechts -->
            <div class="col-span-4 w-full h-full "></div>
            <div class="col-span-1 w-full h-full flex justify-center items-center">
                <div class="h-full w-1 bg-primary"></div>
                <div class="absolute w-12 h-12 rounded-full bg-primary z-10 text-center"><p class="pt-3 font-boldFont">2023</p></div>
            </div>
            <div class="col-span-4 w-full h-full ">
                <div class="w-full h-full bg-primary-foreground text-secondary rounded-lg p-2 md:p-4">
                    <h2 class="text-xl md:text-2xl lg:text-3xl xl:text-3xl uppercase font-boldFont">{$_('ueber-uns.tobias-titel')}</h2>
                    <p>{$_('ueber-uns.tobias')}</p>
                </div>  
            </div>

        </div>
    </div>
</div>





<!-- Nachhaltigkeit -->
<div class="p-[5%] xl:p-[5%]" id="nachhaltigkeit">
    <div class="px-[10%]">
        <h2 class="text-xl md:text-2xl lg:text-3xl xl:text-5xl text-center font-boldFont uppercase pb-2 md:pb-4 lg:pb-6 xl:pb-8">{$_('ueber-uns.nachhaltigkeit-titel')}</h2>
        <p class="text-sm md:text-md lg:text-lg xl:text-xl text-center pb-3">{$_('ueber-uns.nachhaltigkeit-text1')}</p>
        <p class="text-sm md:text-md lg:text-lg xl:text-xl text-center pb-3">{$_('ueber-uns.nachhaltigkeit-text2')}</p>
        <p class="text-sm md:text-md lg:text-lg xl:text-xl text-center ">{$_('ueber-uns.nachhaltigkeit-text3')}</p>
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