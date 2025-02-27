<script lang="ts">
	import header from '$lib/assets/images/ueberUns/halle_klein.jpg';
	import { Timeline, TimelineItem } from 'svelte-5-ui-lib';
	import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
</script>

<div class="bg-primary/70">
	<div class="[clip-path:polygon(0%_10%,100%_0%,100%_80%,0%_100%)]">
		<img src={header} alt="messestand" class="h-[400px] w-full object-cover" />
	</div>
	<!--
<div class="p-4 md:p-10 xl:p-32 xl:mx-[300px]">
	<h1 class="text-xl lg:text-2xl xl:text-3xl ml-3 my-4"> {$_('news.header-titel')}</h1>
	<p class="text-lg lg:text-xl">{$_('news.header-text')}</p>
</div>
-->
    <div class="">
        <h1 class="text-primary-foreground text-center text-5xl lg:my-[100px]">Unsere Historie</h1>
        <Timeline class="border-primary mx-10 md:mx-32 lg:ml-[400px] xl:ml-[500px]" >
            <TimelineItem
                h3Class="mt-4 mb-2 text-md md:text-lg lg:text-xl xl:text-3xl"
                title={$_('ueber-uns.gründung-titel')}
                dateFormat="year"
                date="2002"
                timeClass="text-primary-foreground text-xl ml-4"
                divClass="border w-[20px] border-primary-foreground bg-primary"
            >
                <p class="mb-4 text-base font-normal text-primary-foreground dark:text-gray-400">
                    {$_('ueber-uns.gründung')}
                </p>
            </TimelineItem>
            <TimelineItem
                h3Class="mt-4 mb-2 text-md md:text-lg lg:text-xl xl:text-3xl"
                title={$_('ueber-uns.übernahme-titel')}
                dateFormat="year"
                date="2008"
                divClass="border-2 border-primary-foreground bg-primary "
            >
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                    {$_('ueber-uns.übernahme')}
                </p>
            </TimelineItem>
            <TimelineItem
                h3Class="mt-4 mb-2 text-md md:text-lg lg:text-xl xl:text-3xl"
                title={$_('ueber-uns.umzug-titel')}
                dateFormat="year"
                date="2015"
                divClass="border-2 border-primary-foreground bg-primary "
            >
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                    {$_('ueber-uns.umzug')}
                </p>
            </TimelineItem>
            <TimelineItem
                h3Class="mt-4 mb-2 text-md md:text-lg lg:text-xl xl:text-3xl"
                title={$_('ueber-uns.umzug-2-titel')}
                dateFormat="year"
                date="2021"
                divClass="border-2 border-primary-foreground bg-primary "
            >
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                    {$_('ueber-uns.umzug-2')}
                </p>
            </TimelineItem>
        </Timeline>
        <div class="h-[100px]">

        </div>
    </div> 
</div>

<div class="bg-primary"> 

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

    <div class="p-4 md:p-10 xl:p-32 xl:mx-[300px]">
    	<h1 class="text-xl lg:text-2xl xl:text-3xl ml-3 my-4"> {$_('ueber-uns.werte-titel')}</h1>
	    <p class="text-lg lg:text-xl">{$_('ueber-uns.werte-text')}</p>
    </div>
</div>
