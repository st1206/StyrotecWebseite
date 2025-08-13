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
	import { SafeData } from '$lib/utils/validation';
	import { handleImageError, optimizeImageUrl } from '$lib/utils/image';

	let data: {
		contactForm: any;
		employee: Employee;
	} = $props();

	const form = superForm(data.contactForm, {
		validators: zodClient(contactFormSchema)
	});

	const { form: formData, enhance, message, submitting } = form;

	// Safely process employee data
	const safe = new SafeData(data);
	const employee = safe.getObject('employee');
	const employeeSafe = new SafeData(employee);

	const processedEmployee = employee
		? {
				name: employeeSafe.getString('name', 'Contact Person'),
				position: employeeSafe.getString('position', ''),
				email: employeeSafe.getString('email', 'info@styrotec.de'),
				contactPicture: employeeSafe.getObject('contactPicture'),
				picture: employeeSafe.getObject('picture')
			}
		: null;

	// Helper function to get employee image URL with fallbacks
	function getEmployeeImageUrl(): string {
		if (!processedEmployee) return '';

		const contactPicture = processedEmployee.contactPicture;
		const fallbackPicture = processedEmployee.picture;

		// Try contact picture first
		if (contactPicture) {
			const contactSafe = new SafeData(contactPicture);
			const formats = contactSafe.getObject('formats', {}) as Record<string, any>;
			const url = formats.large?.url || formats.medium?.url || contactSafe.getString('url');
			if (url) {
				return optimizeImageUrl(url, PUBLIC_BACKEND_URL);
			}
		}

		// Fallback to regular picture
		if (fallbackPicture) {
			const pictureSafe = new SafeData(fallbackPicture);
			const formats = pictureSafe.getObject('formats', {}) as Record<string, any>;
			const url = formats.large?.url || formats.medium?.url || pictureSafe.getString('url');
			if (url) {
				return optimizeImageUrl(url, PUBLIC_BACKEND_URL);
			}
		}
		return '';
	}

	const employeeImageUrl = getEmployeeImageUrl();
	const hasValidEmployee = processedEmployee && (processedEmployee.name || processedEmployee.email);

	onMount(() => {
		const originUrl = page.url.pathname;
		const contactEmail = processedEmployee?.email || 'info@styrotec.de';

		formData.set({
			...$formData,
			originUrl,
			mailToContactPerson: contactEmail
		});
	});
</script>

<div
	class="bg-foreground mt-20 h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)] print:hidden"
></div>
<div class="bg-foreground">
	<section class="flex w-full flex-col px-4 sm:container" id="contact-form">
		<div
			class="bg-secondary/10 text-secondary mb-12 mt-16 grid h-full grid-cols-1 gap-x-8 p-8 md:grid-cols-5 lg:gap-x-12 xl:grid-cols-6"
		>
			<h5 class="col-span-1 mb-6 font-sans text-3xl font-bold md:col-span-5">
				{$_('yourContact')}
			</h5>

			{#if hasValidEmployee}
				<div class="bg-secondary/10 col-span-1 mb-8 flex h-max flex-col md:col-span-2 md:mb-0">
					{#if employeeImageUrl}
						<!-- Employee image with fallback -->
						<img
							class="h-[316px] object-cover object-top"
							src={employeeImageUrl}
							alt={processedEmployee.name}
							style="display: block;"
							onerror={handleImageError}
							loading="lazy"
						/>

						<!-- Fallback for broken employee image -->
						<div
							class="bg-secondary/20 text-muted-foreground flex h-[316px] flex-col items-center justify-center"
							style="display: none;"
						>
							<Icons.user class="mb-4 size-16 opacity-50" />
							<p class="text-sm font-medium">{processedEmployee.name}</p>
							<p class="mt-1 text-xs opacity-75">
								{$_('common.imageNotAvailable') || 'Image not available'}
							</p>
						</div>
					{:else}
						<!-- No image available - show placeholder -->
						<div
							class="bg-secondary/20 text-muted-foreground flex h-[316px] flex-col items-center justify-center"
						>
							<Icons.user class="mb-4 size-16 opacity-50" />
							<p class="text-sm font-medium">{processedEmployee.name}</p>
							<p class="mt-1 text-xs opacity-75">
								{$_('contact.noImageAvailable') || 'No image available'}
							</p>
						</div>
					{/if}

					<div class="p-4">
						{#if processedEmployee.position}
							<h3 class="text-primary text-sm">{processedEmployee.position}</h3>
						{/if}
						<h2 class="font-sans text-3xl font-bold lg:text-4xl">{processedEmployee.name}</h2>
						<!-- <div class="mt-1 flex items-center gap-1 text-sm">
							<Icons.mail class="size-3" />
							<h3>{processedEmployee.email}</h3>
						</div> -->
					</div>
				</div>
			{:else}
				<!-- No employee data - show generic contact -->
				<div class="bg-secondary/10 col-span-1 mb-8 flex h-max flex-col md:col-span-2 md:mb-0">
					<div
						class="bg-secondary/20 text-muted-foreground flex h-[316px] flex-col items-center justify-center"
					>
						<Icons.mail class="mb-4 size-16 opacity-50" />
						<p class="text-sm font-medium">
							{$_('contact.generalContact') || 'General Contact'}
						</p>
						<p class="mt-1 text-xs opacity-75">info@styrotec.de</p>
					</div>

					<div class="p-4">
						<h3 class="text-primary text-sm">
							{$_('contact.contactTeam') || 'Contact Team'}
						</h3>
						<h2 class="font-sans text-3xl font-bold lg:text-4xl">
							{$_('contact.getInTouch') || 'Get in Touch'}
						</h2>
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
						{#if $submitting}
							<Icons.spinner class="mr-1 size-4 animate-spin" />
						{:else}
							<Icons.send class="mr-1 size-4 skew-x-[15deg]" />
						{/if}
						<span class="h-5 skew-x-[15deg]">
							{$_('button.send')}
						</span>
					</Form.Button>
				</form>
			</div>
		</div>
		<Separator class="w-full bg-white/20" orientation="horizontal" />
	</section>
</div>
