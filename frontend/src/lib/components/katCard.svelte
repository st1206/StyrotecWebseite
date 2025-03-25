<script lang="ts">
    import { _ } from 'svelte-i18n';
    let {
		titel,
		text,
		image,
        link
	}: { titel: any; text: String; image: any ;link: any} = $props();
    import logo1 from '$lib/assets/images/homepage/logo1.jpeg';
</script>

<div
    class="mt-[5%] h-auto w-[90%] rounded-lg  bg-cover md:w-[45%]"
    style="background-image: url({image})"
>
    <div class="bg-primary-foreground/80 relative h-full w-full rounded-lg">
        <h1 class="text-secondary font-boldFont px-[10%] pb-[5%] pt-[10%] text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            {titel}
        </h1>
        <p
            class="text-secondary w-full px-[10%] pb-[20%] text-justify text-sm md:text-md lg:text-lg xl:text-xl  md:pb-[30%]  lg:pb-[30%]"
        >
           {text}
        </p>

        <a
            href={link}
            class="bg-primary text-secondary font-boldFont absolute bottom-4 left-4 rounded-md p-2 text-xl hover:scale-105 md:bottom-8 md:left-8 lg:bottom-16 lg:left-16"
            >{$_('portalfraes.cta')}</a
        >
    </div>
</div>