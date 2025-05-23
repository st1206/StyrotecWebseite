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
	import { _ } from 'svelte-i18n';
	import type { Employee } from '$lib/models/employee';
	import { Icons } from '$lib/assets/icons';
	import { locale } from 'svelte-i18n';

	let data: {
		contactForm: any;
		employee: Employee;
	} = $props();

	const form = superForm(data.contactForm, {
		validators: zodClient(contactFormSchema)
	});

	const { form: formData, enhance, message } = form;

	onMount(() => {
		const originUrl = page.url.pathname;
		formData.set({ ...$formData, originUrl, mailToContactPerson: data.employee.email });
	});
</script>

<div
	class="bg-foreground mt-20 h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)] print:hidden"
></div>
<div class="bg-foreground">
	<section class="flex w-full flex-col sm:container" id="contact-form">
		<div
			class="bg-secondary/10 text-secondary mb-12 mt-16 grid h-full grid-cols-1 gap-x-8 p-8 md:grid-cols-5 lg:gap-x-12 xl:grid-cols-6"
		>
			<h5 class="font-boldFont col-span-1 mb-6 text-3xl md:col-span-5">
				{$_('yourContact')}
			</h5>

			{#if data.employee.contactPicture}
				<div class="bg-secondary/10 col-span-1 mb-8 flex h-max flex-col md:col-span-2 md:mb-0">
					<img
						class="h-[292px] object-cover object-top"
						src={!PUBLIC_BACKEND_URL.includes('https')
							? `${PUBLIC_BACKEND_URL}${data.employee.contactPicture.formats['large']?.url || data.employee.picture.url}`
							: data.employee.contactPicture.url}
						alt={data.employee.name}
					/>
					<div class="p-4">
						<h3 class="text-primary text-sm">{data.employee.position}</h3>
						<h2 class="font-boldFont text-3xl lg:text-4xl">{data.employee.name}</h2>
						<div class="mt-1 flex items-center gap-1 text-sm">
							<Icons.mail class="size-3" />
							<h3>{data.employee.email}</h3>
						</div>
					</div>
				</div>
			{/if}

			<div class="col-span-1 md:col-span-3 xl:col-span-4">
				<form method="POST" use:enhance class="flex flex-col gap-2 print:hidden">
					<div class="flex w-full flex-col gap-4 sm:flex-row">
						<Form.Field {form} name="name" class="w-full">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>{$_('name')}*</Form.Label>
									<Input {...props} bind:value={$formData.name} />
								{/snippet}
							</Form.Control>
							<Form.Description />
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field {form} name="company" class="w-full">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>{$_('company')}</Form.Label>
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
									<Form.Label>{$_('yourEmail')}*</Form.Label>
									<Input {...props} bind:value={$formData.email} />
								{/snippet}
							</Form.Control>
							<Form.Description />
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field {form} name="phone" class="w-full">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>{$_('phone')}</Form.Label>
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
								<Form.Label>{$_('yourMessage')}*</Form.Label>
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

					{#if $message && $message !== 'success'}
						<div class="bg-secondary text-destructive mt-2 flex items-center gap-2 p-2 text-sm">
							<Icons.error class="size-4" />
							{$message}
						</div>
					{:else if $message === 'success'}
						<div class="bg-secondary mt-2 flex items-center gap-2 p-2 text-sm text-green-500">
							<Icons.check class="size-4" />
							{$locale === 'de-DE' ? 'E-Mail erfolgreich gesendet!' : 'E-Mail sent successfully!'}
						</div>
					{/if}
					<Form.Button class="ml-auto mr-2 mt-4">
						<Icons.send class="mr-1 size-4 skew-x-[15deg]" />
						<span class="skew-x-[15deg]">
							{$_('button.send')}
						</span>
					</Form.Button>
				</form>
			</div>
		</div>
		<Separator class="w-full bg-white/20" orientation="horizontal" />
	</section>
</div>
