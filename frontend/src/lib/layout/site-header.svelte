<script lang="ts">
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, MegaMenu } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	let menu = [
		{ name: 'Online Stores', help: "Connect with third-party tools that you're already using." },
		{ name: 'Segmentation', help: "Connect with third-party tools that you're already using." },
		{ name: 'Marketing CRM', help: "Connect with third-party tools that you're already using." },

		{ name: 'Online Stores', help: "Connect with third-party tools that you're already using." },
		{ name: 'Segmentation', help: "Connect with third-party tools that you're already using." },
		{ name: 'Marketing CRM', help: "Connect with third-party tools that you're already using." },

		{
			name: 'Audience Management',
			help: "Connect with third-party tools that you're already using."
		},
		{ name: 'Creative Tools', help: "Connect with third-party tools that you're already using." },
		{
			name: 'Marketing Automation',
			help: "Connect with third-party tools that you're already using."
		}
	];
</script>

<Navbar let:hidden let:toggle class="z-50">
	<NavBrand href="/">
		<img
			src="https://flowbite-svelte.com/images/flowbite-svelte-icon-logo.svg"
			class="me-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold">Flowbite</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/">Home</NavLi>
		<NavLi class="cursor-pointer">
			Mega menu<ChevronDownOutline class="ms-2 inline h-6 w-6 text-primary-800 " />
		</NavLi>
		<MegaMenu full items={menu} let:item class="bg-white">
			<a href="/" class="block h-full rounded-lg p-3 hover:bg-gray-50">
				<div class="font-semibold">{item.name}</div>
				<span class="text-sm font-light text-gray-500">{item.help}</span>
			</a>
		</MegaMenu>
		<NavLi href="/services">Services</NavLi>
		<NavLi href="/services">Products</NavLi>
		<NavLi href="/services">Contact</NavLi>
	</NavUl>
</Navbar>
