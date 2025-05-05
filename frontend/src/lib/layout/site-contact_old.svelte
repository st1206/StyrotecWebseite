<!-- <script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import imgMartin from '$lib/assets/images/martin_schreibtisch.jpg';
	import imgTobias from '$lib/assets/images/TobiasSchreibtisch_klein.jpg';
	import imgRolf from '$lib/assets/images/rolf_schreibtisch.jpg';
	import imgNorbert from '$lib/assets/images/norbert_schreibtisch.jpg';
	import { _ } from 'svelte-i18n';
	import Mail from 'lucide-svelte/icons/mail';

	const modalExample = uiHelpers();
	let modalStatus = $derived(modalExample.isOpen);

	let contactPerson: {
		name: string;
		role: string;
		imgSource: string;
	} = $derived.by(() => {
		const condition: string = 'tobias';
		switch (condition) {
			case 'rolf':
				return { name: 'Rolf', role: 'Vertrieb', imgSource: imgRolf };
			case 'tobias':
				return { name: 'Tobias', role: 'Projektmanager', imgSource: imgTobias };
			case 'norbert':
				return { name: 'Norbert', role: 'Vertrieb', imgSource: imgNorbert };
			case 'martin':
				return { name: 'Martin Schütze', role: 'Vertrieb', imgSource: imgMartin };
			default:
				return { name: 'Tobias', role: 'Vertrieb', imgSource: imgTobias };
		}
	});
</script>

<div class="modal -right-[27px] flex justify-center rounded-lg xl:-right-[42px]">
	<Button
		class="bg-primary-500 border-primary-foreground h-[50px] w-[100px] rounded-lg border-2 text-xl xl:h-[60px] xl:w-[130px] xl:text-2xl"
		onclick={modalExample.toggle}
	>
		<div class="w-full pr-1"><Mail size={22} /></div>
		{$_('contact.title')}
	</Button>
</div>
<Modal
	title="Kontakte"
	{modalStatus}
	closeModal={modalExample.close}
	size="md"
	position="center-right"
	transition={fly}
	params={{ duration: 350, easing: linear, x: 150 }}
>
	<div class="modal-box">
		<div class="column-left">{$_('contact.info')}</div>
		<div class="column-right">
			+49 751 5605020 <br />
			info@styrotec.de
		</div>
	</div>

	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
	<div class="modal-box">
		<div class="column-left">
			<span>{contactPerson.name}</span> <br />
			<span>{$_(`contact.${contactPerson.role}`)}</span> <br />
			<a
				href="/kontaktseite"
				class="bg-primary text-secondary absolute bottom-10 rounded-sm p-2 text-xl"
				>{$_(`contact.weiter`)}</a
			>
		</div>
		<div class="column-right">
			<img src={contactPerson.imgSource} alt={`${contactPerson.name} Profil`} />
		</div>
	</div>
</Modal>

<style>
	.modal-box {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.column-left {
		width: 50%;
		text-align: left;
	}
	.column-right {
		width: 50%;
		text-align: right;
	}
	.modal {
		position: fixed;
		top: 50%;
		background: #f6a312;
		transform: translateY(-50%);
		transform: rotate(-90deg);
		z-index: 10;
	}
</style> -->
