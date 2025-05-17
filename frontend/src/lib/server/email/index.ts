import contactFormTemplate from './contact-form-template.html?raw';
import contactFormText from './contact-form-template.txt?raw';

// ENHANCED REPLACEMENT FUNCTION FOR HTML
function fillHtmlTemplate(
	template: string,
	data: {
		name: string;
		company?: string;
		email: string;
		phone?: string;
		message: string;
		originUrl: string;
	}
): string {
	// Format message for HTML - convert newlines to <br> tags
	const messageHtml = data.message
		? data.message
				.replace(/\n/g, '<br>')
				.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
				.replace(/ {2}/g, '&nbsp;&nbsp;')
		: '-';

	return template
		.replace('{{name}}', data.name ?? '-')
		.replace('{{company}}', data.company ?? '-')
		.replace('{{email}}', data.email ?? '-')
		.replace('{{phone}}', data.phone ?? '-')
		.replace('{{message}}', messageHtml) // Using HTML-formatted message
		.replace('{{originUrl}}', data.originUrl ?? '-');
}

// STANDARD REPLACEMENT FUNCTION FOR PLAIN TEXT
function fillTextTemplate(
	template: string,
	data: {
		name: string;
		company?: string;
		email: string;
		phone?: string;
		message: string;
		originUrl: string;
	}
): string {
	// Plain text already preserves newlines naturally
	return template
		.replace('{{name}}', data.name ?? '-')
		.replace('{{company}}', data.company ?? '-')
		.replace('{{email}}', data.email ?? '-')
		.replace('{{phone}}', data.phone ?? '-')
		.replace('{{message}}', data.message ?? '-')
		.replace('{{originUrl}}', data.originUrl ?? '-');
}

// EXPORT FUNCTIONS
export function getContactFormTemplate(data: {
	name: string;
	company?: string;
	email: string;
	phone?: string;
	message: string;
	originUrl: string;
}): string {
	return fillHtmlTemplate(contactFormTemplate, data);
}

export function getContactFormText(data: {
	name: string;
	company?: string;
	email: string;
	phone?: string;
	message: string;
	originUrl: string;
}): string {
	return fillTextTemplate(contactFormText, data);
}
