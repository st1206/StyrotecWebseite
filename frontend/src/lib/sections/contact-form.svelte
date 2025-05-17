<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import { contactFormSchema } from '$lib/models/contact-form-schema';
	import { Textarea } from '$lib/components/ui/textarea';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let data = $props();

	const form = superForm(data.contactFormBuilder, {
		validators: zodClient(contactFormSchema)
	});

	const { form: formData, enhance } = form;

	onMount(() => {
		const originUrl = page.url.pathname;
		formData.set({ ...$formData, originUrl, mailToContactPerson: data.employee.email });
		console.log($formData);
	});
</script>

<div
	class="bg-foreground mt-20 h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)] print:hidden"
></div>
<section class="bg-foreground container flex w-full flex-col" id="contact-form">
	<div
		class="bg-secondary/10 text-secondary mb-12 mt-16 grid h-full grid-cols-1 gap-x-8 p-8 sm:mx-auto md:grid-cols-3 lg:gap-x-12"
	>
		<h5 class="font-boldFont col-span-3 mb-6 text-3xl lg:text-4xl">Kontaktformular</h5>
		{#if data.employee.contactPicture}
			<div class="bg-secondary/10 col-span-1 print:hidden">
				<img
					class="object-cover"
					src={!PUBLIC_BACKEND_URL.includes('https')
						? `${PUBLIC_BACKEND_URL}${data.employee.contactPicture.formats['large']?.url || data.employee.picture.url}`
						: data.employee.contactPicture.url}
					alt={data.employee.name}
				/>
				<div class="p-4">
					<h4 class="text-sm">Ihr direkter Ansprechpartner:</h4>
					<h2 class="font-boldFont text-4xl">{data.employee.name}</h2>
					<h3 class="text-primary">{data.employee.position}</h3>
				</div>
			</div>
		{/if}

		<div class="col-span-1 md:col-span-2">
			<form method="POST" use:enhance class="flex flex-col gap-2 print:hidden">
				<div class="flex w-full flex-col gap-4 sm:flex-row">
					<Form.Field {form} name="name" class="w-full">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Name*</Form.Label>
								<Input {...props} bind:value={$formData.name} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="company" class="w-full">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Firma</Form.Label>
								<Input {...props} bind:value={$formData.company} />
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
								<Form.Label>Email*</Form.Label>
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
								<Input {...props} bind:value={$formData.tel} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Form.Field {form} name="message" class="w-full">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Ihre Nachricht*</Form.Label>
							<Textarea
								{...props}
								bind:value={$formData.message}
								class="min-h-32 whitespace-pre-wrap"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<div class="hidden">
					<Form.Field {form} name="mailToContactPerson">
						<Form.Control>
							{#snippet children({ props })}
								<Input {...props} bind:value={$formData.mailToContactPerson} />
							{/snippet}
						</Form.Control>
					</Form.Field>
					<Form.Field {form} name="originUrl">
						<Form.Control>
							{#snippet children({ props })}
								<Input {...props} bind:value={$formData.originUrl} />
							{/snippet}
						</Form.Control>
					</Form.Field>
				</div>
				<Form.Button class="ml-auto mr-2 mt-4">
					<span class="skew-x-[15deg]">Abschicken</span>
				</Form.Button>
			</form>
		</div>
	</div>
	<Separator class="w-full bg-white/20" orientation="horizontal" />
</section>
