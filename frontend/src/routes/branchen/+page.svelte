<script lang="ts">
    import auto1 from '$lib/assets/images/branchen/auto_top.jpg';
    import auto2 from '$lib/assets/images/branchen/auto_bot.jpg';
    import beton1 from '$lib/assets/images/branchen/beton_top.jpg';
    import beton2 from '$lib/assets/images/branchen/beton_bot.jpg';
    import kunst1 from '$lib/assets/images/branchen/Kunst_top.jpg';
    import kunst2 from '$lib/assets/images/branchen/Kunst_bot.jpg';
    import luft1 from '$lib/assets/images/branchen/luft_top.jpg';
    import luft2 from '$lib/assets/images/branchen/luft_bot.jpg';
    import schiff1 from '$lib/assets/images/branchen/Schiffsbau_top.jpg';
    import schiff2 from '$lib/assets/images/branchen/Schiffsbau_bot.jpg';
    import * as Accordion from '$lib/components/ui/accordion';


</script>
<div class="bg-primary-foreground flex flex-col gap-8 md:gap-16 lg:gap-32 px-10 md:px-20">
<div class="relative mt-[85px]" >
    <div class="absolute h-[150px] lg:h-[380px] w-full bg-primary-foreground/50"></div>
    <div class="absolute -top-[130px]" id="automobil"></div>
    <img src={auto1} alt="FS10 Titelbild" class="h-[150px] w-full object-cover rounded-t-3xl lg:h-[380px]" />
    <Accordion.Root type="single" class="px-2 md:py-2 bg-primary-foreground text-secondary ">
        <Accordion.Item value="item-1">
            <Accordion.Trigger class="md:text-2xl font-boldFont">Erfahren sie mehr zu Automobilbranche </Accordion.Trigger>
            <Accordion.Content class="pt-4 xl:text-xl mx-1 ">
                <div class="flex flex-col md:flex-row justify-around ">
                    <div class="w-[45%] h-auto  bg-secondary/5 border border-secondary/15 p-4">
                        <h2>Maschinen im Bereich</h2>
                        <li><a href="/" class="hover:underline">Link 1</a></li>
                        <li><a href="/" class="hover:underline">Link 2</a></li>
                        <li><a href="/" class="hover:underline">Link 3</a></li>
                    </div>
                    <div class="w-[45%] h-auto  bg-secondary/5 border border-secondary/15 p-4">
                        <h2>Dienstleistungen für den Bereich</h2>
                        <li><a href="/" class="hover:underline">Link 1</a></li>
                        <li><a href="/" class="hover:underline">Link 2</a></li>
                        <li><a href="/" class="hover:underline">Link 3</a></li>
                    </div>
                </div>
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
    <div class="absolute h-[150px] lg:h-[380px] w-full bg-primary-foreground/50"></div>
    <img src={auto2} alt="FS10 Titelbild" class="h-[150px] w-full object-cover rounded-b-3xl lg:h-[380px]" />
</div>

<div class="relative">
    <div class="absolute h-[150px] lg:h-[380px] w-full bg-primary-foreground/50 "></div>
    <div class="absolute -top-[84px]" id="schiffsbau"></div>
    <img src={schiff1} alt="FS10 Titelbild" class="h-[150px] w-full object-cover rounded-t-3xl lg:h-[380px] " />
    <Accordion.Root type="single" class="px-2 md:py-2 bg-primary-foreground text-secondary">
        <Accordion.Item value="item-1">
            <Accordion.Trigger>Erfahren sie mehr zu Automobilbranche </Accordion.Trigger>
            <Accordion.Content class="pt-4 xl:text-xl mx-1 ">
               
                
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
    <div class="absolute h-[150px] lg:h-[380px] w-full bg-primary-foreground/50 "></div>
    <img src={schiff2} alt="FS10 Titelbild" class="h-[150px] w-full object-cover rounded-b-3xl lg:h-[380px]" />   
</div>

<div class="h-[400px] " id="modellbau">
    modell
</div>

<div class="relative">
    <div class="absolute h-[150px] lg:h-[380px] w-full bg-primary-foreground/50"></div>
    <div class="absolute -top-[84px]" id="kunst"></div>
    <img src={kunst1} alt="FS10 Titelbild" class="h-[150px] w-full object-cover rounded-t-3xl lg:h-[380px]" />
    <Accordion.Root type="single" class="px-2 md:py-2 bg-primary-foreground text-secondary">
        <Accordion.Item value="item-1">
            <Accordion.Trigger>Erfahren sie mehr zu Automobilbranche </Accordion.Trigger>
            <Accordion.Content class="pt-4 xl:text-xl mx-1 ">
               
                
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
    <div class="absolute h-[150px] lg:h-[380px] w-full bg-primary-foreground/50"></div>
    <img src={kunst2} alt="FS10 Titelbild" class="h-[150px] w-full object-cover rounded-b-3xl lg:h-[380px]" />   
</div>

<div class="relative">
    <div class="absolute h-[150px] lg:h-[380px] w-full bg-primary-foreground/50"></div>
    <div class="absolute -top-[84px]" id="betonindustrie"></div>
    <img src={beton1} alt="FS10 Titelbild" class="h-[150px] w-full object-cover rounded-t-3xl lg:h-[380px]" />
    <Accordion.Root type="single" class="px-2 md:py-2 bg-primary-foreground text-secondary">
        <Accordion.Item value="item-1">
            <Accordion.Trigger>Erfahren sie mehr zu Automobilbranche </Accordion.Trigger>
            <Accordion.Content class="pt-4 xl:text-xl mx-1 ">
               
                
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
    <div class="absolute h-[150px] lg:h-[380px] w-full bg-primary-foreground/50"></div>
    <img src={beton2} alt="FS10 Titelbild" class="h-[150px] w-full object-cover rounded-b-3xl lg:h-[380px]" />   
</div>

<div class="h-[400px] " id="werbetechnik">
    werbetechnik
</div>

<div class="relative" >
    <div class="absolute h-[150px] lg:h-[380px] w-full bg-primary-foreground/50"></div>
    <div class="absolute -top-[84px]" id="aerospace"></div>
    <img src={luft1} alt="FS10 Titelbild" class="h-[150px] w-full object-cover rounded-t-3xl lg:h-[380px]" />
    <Accordion.Root type="single" class="px-2 md:py-2 bg-primary-foreground text-secondary">
        <Accordion.Item value="item-1">
            <Accordion.Trigger>Erfahren sie mehr zu Automobilbranche </Accordion.Trigger>
            <Accordion.Content class="pt-4 xl:text-xl mx-1 ">
               
                
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
    <div class="absolute h-[150px] lg:h-[380px] w-full bg-primary-foreground/50"></div>
    <img src={luft2} alt="FS10 Titelbild" class="h-[150px] w-full object-cover rounded-b-3xl lg:h-[380px]" />
</div>

<div class="h-[400px] " id="kunststoffindustrie">
    kunst
</div>
</div>