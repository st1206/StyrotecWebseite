<script lang="ts"> 
    import { Input, Textarea } from 'svelte-5-ui-lib';
    import { _ } from 'svelte-i18n';
    import * as Accordion from '$lib/components/ui/accordion';
    let checked = false;
    
    
</script>

<div class="w-full">
    <div
		class="from-primary/65 via-primary to-secondary-foreground relative z-0 h-auto w-full bg-gradient-to-b"
	>
		<div class="flex flex-col md:flex-row  justify-around py-[5%] ">
            <!-- Ansprechpartner Card -->
            <div class="w-[90%] md:w-[40%] bg-primary-foreground text-secondary rounded-lg bg-[url($lib/assets/images/rolf_schreibtisch.jpg)] bg-cover">
                <div class="w-full h-full bg-primary-foreground/35 rounded-lg">
                    <div class="flex flex-row">
                        <div class="w-[50%] text-left p-16">
                            <h1 class="text-3xl uppercase">Ihr Direkter Ansprechpartner: </h1> <br />
                            <span class="text-xl">Rolf Röhm </span> <br />
                            <span class="text-xl">Vertrieb</span>
                            <!-- TODO verlinkung zur richtigen kontaktSeite-->
                            
                        </div>
                    </div>
                    <div class="px-8 flex flex-row gap-4">
                        <div class="w-[50%]">
                            <h2 class="w-full">{$_(`kontaktformular.name`)}</h2>
                            <Input class="text-primary-foreground  bg-secondary border-primary w-full" />
                        </div>
                        <div class="w-[50%]">
                            <h2 class="w-full">{$_(`kontaktformular.firma`)}</h2>
                            <Input class="text-primary-foreground  bg-secondary border-primary w-full" />
                        </div>
                    </div>
                    <div class="px-8 mt-4 flex flex-row gap-4">
                        <div class="w-[50%]">
                            <h2 class="w-full">{$_(`kontaktformular.email`)}</h2>
                            <Input class="text-primary-foreground  bg-secondary border-primary w-full" />
                        </div>
                        <div class="w-[50%]">
                            <h2 class="w-full">{$_(`kontaktformular.tel`)}</h2>
                            <Input class="text-primary-foreground  bg-secondary border-primary w-full" />
                        </div>
                    </div>
                    <div class="px-8 pb-8">
                        <h2 class="w-full">{$_(`kontaktformular.nachricht`)}</h2>
                        <Textarea class="text-primary-foreground h-[100px] w-auto xl:w-[100%]" innerClass="bg-secondary " divClass="border-primary"/>
                    </div>
                </div> 
            </div>

            <!-- Newsletter + weiterleitung zu Kontaktformular-->
			<div class="w-[90%] md:w-[40%] h-[500px] bg-primary-foreground text-secondary rounded-lg p-16">
                <Accordion.Root
                    type="single"
                    class=""
                >
                    <Accordion.Item value="item-1">
                        <Accordion.Trigger>Newsletter</Accordion.Trigger>
                        <Accordion.Content class="xl:text-xl">
                            <!-- TODO: Inhalt zu news etc. -->
                            

                            
                            
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </div>
		</div>

        
	</div>


    <div>
        
        
    </div>
</div>

<div
    class="text-secondary absolute left-[5%] top-10 flex flex-col xl:left-[30%] xl:flex-row xl:flex-wrap"
>
    
</div>