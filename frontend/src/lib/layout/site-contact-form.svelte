<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import rolfImage from '$lib/assets/images/rolf_schreibtisch.jpg';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import { contactFormSchema } from '$lib/models/contact-form-schema';
	import { Textarea } from '$lib/components/ui/textarea';

	let { contactForm } = $props();

	const form = superForm(contactForm, {
		validators: zodClient(contactFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div
	class="bg-foreground mt-20 h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
></div>
<section class="bg-foreground flex w-full flex-col">
	<div class="mx-2 mb-12 mt-16 grid h-full grid-cols-1 sm:container sm:mx-auto md:grid-cols-3">
		{#if rolfImage}
			<div class="col-span-1">
				<img class="h-full w-full object-cover" src={rolfImage} alt="Rolf" />
			</div>
		{/if}
		<div class="bg-secondary/10 text-secondary col-span-1 p-8 md:col-span-2">
			<h4 class="mb-1 text-sm">Ihr direkter Ansprechpartner:</h4>
			<h2 class="font-boldFont text-4xl">Rolf Röhm</h2>
			<h3 class="text-primary">Vertrieb</h3>

			<form method="POST" use:enhance class="mt-8 flex flex-col gap-2">
				<div class="flex w-full flex-col gap-4 sm:flex-row">
					<Form.Field {form} name="name" class="w-full">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Name</Form.Label>
								<Input {...props} bind:value={$formData.email} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="company" class="w-full">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Firma</Form.Label>
								<Input {...props} bind:value={$formData.email} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="flex w-full flex-col gap-4 sm:flex-row">
					<Form.Field {form} name="email" class="w-full">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email</Form.Label>
								<Input {...props} bind:value={$formData.email} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="phone" class="w-full">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Telefonnummer</Form.Label>
								<Input {...props} bind:value={$formData.email} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Form.Field {form} name="message" class="w-full">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Ihre Nachricht</Form.Label>
							<Textarea {...props} bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button class="ml-auto mr-2 mt-4">
					<span class="skew-x-[15deg]">Abschicken</span>
				</Form.Button>
			</form>
		</div>
	</div>
	<div class="mx-2 sm:container sm:mx-auto">
		<Separator class="w-full bg-white/20" orientation="horizontal" />
	</div>
</section>
