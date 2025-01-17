<script>
	import { Modal, uiHelpers } from 'svelte-5-ui-lib';
	import { blur, fly, slide, scale } from 'svelte/transition';
	import { linear, sineIn } from 'svelte/easing';
	import { Button } from 'svelte-5-ui-lib';
	import imgMartin from '$lib/images/Martin Schreibtisch 05.jpg';
	import imgTobias from '$lib/images/Tobias Schreibtisch 15.jpg';
	import imgRolf from '$lib/images/Rolf Schreibtisch_überarbeitet 01.jpg';
	import imgNorbert from '$lib/images/Norbert Schreibtisch 05.jpg';

	let showRolf = false;
	let showTobias = true;
	let showNorbert = false;
	let showMartin = false;

	/* TODO: implement abfrage nach zuständigkeit -> änder showName zu true */

	const modalExample = uiHelpers();
	let modalStatus = $state(false);
	const closeModal = modalExample.close;
	$effect(() => {
		modalStatus = modalExample.isOpen;
	});
</script>

<div class="modal flex justify-center">
	<Button class="bg-primary-500" onclick={modalExample.toggle}>Kontakt</Button>
</div>
<Modal
	title="Kontakte"
	{modalStatus}
	{closeModal}
	size="md"
	position="center-right"
	transition={slide}
	params={{ duration: 350, easing: linear, x: -150 }}
>
	<div class="modal-box">
		<!-- evtl variabel machen je nach maschine und welche seite man sich befindet (forEach kontakt hinterlegt do unten)-->
		<div class="column-left">Info / Durchwahl</div>
		<div class="column-right">
			+49 751 5605020 <br />
			info@styrotec.de
		</div>
	</div>


	{#if showMartin}
		<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
		<div class="modal-box">
			<div class="column-left">Martin Schütze <br> Vertrieb</div>
			<div class="column-right">
				<img src={imgMartin} alt="Martin Schütze Profil">
			</div>
		</div>
	{/if}

	

	{#if showRolf}
		<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
		<div class="modal-box">
			<div class="column-left">Rolf Röhm <br> Marketing </div>
			<div class="column-right">
				<img src={imgRolf} alt="Rolf Röhm Profil">
			</div>
			
		</div>
	{/if}

	{#if showTobias}
		<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
		<div class="modal-box">
			<div class="column-left">Tobias Schuster <br> Projetk Manager</div>
			<div class="column-right">
				<img src={imgTobias} alt="Rolf Röhm Profil">
			</div>
			
		</div>
	{/if}

	{#if showNorbert}
		<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
		<div class="modal-box">
			<div class="column-left">Norbert Schuster <br> Geschäftsführer</div>
			<div class="column-right">
				<img src={imgNorbert} alt="Rolf Röhm Profil">
			</div>
			
		</div>
	{/if}
	
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
		right: 0px;
		top: 50%;
		background: #f6a312;
		transform: translateY(-50%);
		transform: rotate(-90deg);
		z-index: 10;
	}
</style>
