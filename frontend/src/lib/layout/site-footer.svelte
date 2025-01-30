<script lang="ts">
	import { Footer, FooterLi, FooterUl, FooterCopyright, FooterIcon } from 'svelte-5-ui-lib';
	import { LinkedinSolid, YoutubeSolid, InstagramSolid } from 'flowbite-svelte-icons';
	import imgLogo from '$lib/images/Logo_weiseSchrift_orange.png';
</script>

<Footer class="bg-primary-foreground bottom-0 size-full" footerType="socialmedia">
	<div></div>
	<div class="move md:flex md:justify-between">
		<div class="mb-6 md:mb-0">
			<a href="/"><img src={imgLogo} alt="Logo" /></a>
		</div>

		<div class="kontaktbox">
			<h2 class="pl-8 text-lg">Kontakt</h2>
			<hr
				class="bg-primary-foreground my-6 border-gray-200 sm:mx-auto lg:my-1 dark:border-gray-700"
			/>
			<div class="container">
				<div class="column-left">
					Styrotec GmbH + Co KG <br />
					Kartonstr. 2<br />
					88255 Baienfurt <br />
					Deutschland<br />
				</div>
				<div class="column-right">
					tel.: +49 751 5605020 <br />
					fax : +49 751 5605029
				</div>
			</div>
		</div>

		<div class="sm:items-top sm:flex sm:justify-between">
			<div>
				<h2 class="text-primary mb-2 text-sm font-semibold uppercase">Legal</h2>
				<hr class="my-6 border-gray-200 sm:mx-auto lg:my-1 dark:border-gray-700" />
				<FooterUl>
					<FooterLi liClass="mb-2 text-white" href="/rechtliches/datenschutz"
						>Privacy Policy</FooterLi
					>
					<FooterLi liClass="mb-2 text-white" href="/rechtliches/impressum">Impressum</FooterLi>
				</FooterUl>
			</div>
		</div>
	</div>

	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
	<!-- trennlinie-->
	<div class="mb-4 mt-8 flex space-x-10 sm:mt-0 sm:justify-center rtl:space-x-reverse">
		<FooterIcon
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
		</FooterIcon>
	</div>

	<FooterCopyright href="/" by="Styrotec GmbH & Co KG" />
</Footer>

<style>
	img {
		width: 200px;
	}
	div {
		background-color: #33312e;
		color: #f6edde;
	}
	.kontaktbox {
		background-color: #33312e;
		width: 600px;
		height: 130px;
	}
	.container {
		display: flex;
	}
	.column-left {
		width: 50%;
		text-align: left;
	}
	.column-right {
		width: 50%;
		text-align: right;
	}
	div.move {
		margin-left: 100px;
		margin-right: 100px;
	}
</style>
