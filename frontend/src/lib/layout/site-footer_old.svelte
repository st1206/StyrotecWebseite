<script lang="ts">
	import { Icons } from '$lib/assets/icons';
	import { _ } from 'svelte-i18n';
</script>

<div class="bottom-0 z-10 size-full bg-primary-foreground">
	<div></div>
	<div class="flex flex-col xl:flex-row xl:justify-between">
		<div class="mb-6 w-[140px] md:mb-0 xl:ml-16 xl:w-[200px]">
			<a href="/"><img src={Icons.logo} alt="Logo" /></a>
		</div>

		<div class="w-[80%] bg-secondary-foreground text-secondary xl:w-[40%]">
			<hr
				class="my-6 border-gray-200 bg-primary-foreground dark:border-gray-700 sm:mx-auto lg:my-1"
			/>
			<div class="flex flex-col xl:flex-row xl:justify-between">
				<div>
					Styrotec GmbH + Co KG <br />
					Kartonstr. 2<br />
					88255 Baienfurt <br />
					{$_(`contact.land`)} <br />
				</div>
				<div>
					tel.: +49 751 56050-20 <br />
					mail: info@styrotec.com
				</div>
			</div>
		</div>

		<div class=" mt-10 sm:flex sm:justify-between xl:mr-16 xl:mt-0">
			<div>
				<h2 class="mb-2 text-sm font-semibold uppercase text-primary">{$_(`legal.rechtliches`)}</h2>
				<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-1" />
				<ui>
					<li>
						<a class="mb-2 text-white" href="/rechtliches/datenschutz">{$_(`legal.privacy`)}</a>
					</li>
					<li>
						<a class="mb-2 text-white" href="/rechtliches/impressum">Impressum</a>
					</li>
				</ui>
			</div>
		</div>
	</div>

	<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
	<!-- trennlinie-->
	<div class="mb-4 flex flex-row justify-around bg-center sm:mt-0 xl:px-[40%]">
		<!-- <FooterIcon
			href="https://www.linkedin.com/company/styrotec-gmbh-co-kg/posts/?feedView=all"
			target="_blank"
		>
			<LinkedinSolid
				class="hover:text-background h-10  w-10 dark:text-gray-500 dark:hover:text-white"
			/>
		</FooterIcon>
		<FooterIcon href="https://www.youtube.com/@styrotec" target="_blank">
			<YoutubeSolid
				class="hover:text-background h-10  w-10 dark:text-gray-500 dark:hover:text-white"
			/>
		</FooterIcon>
		<FooterIcon href="https://www.instagram.com/styrotec.de/?hl=de" target="_blank">
			<InstagramSolid
				class="hover:text-background h-10 w-10 dark:text-gray-500 dark:hover:text-white"
			/>
		</FooterIcon> -->
	</div>

	<!-- <FooterCopyright href="/" by="Styrotec GmbH & Co KG" /> -->
</div>
