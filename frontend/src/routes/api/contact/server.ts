import { json } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_ADRESS, EMAIL_PASSWORD } from '$env/static/private';
import { contactFormSchema } from '$lib/models/contact-form-schema';
import { getContactFormTemplate, getContactFormText } from '$lib/server/email';

export async function POST({ request }: { request: Request }) {
	const form = await superValidate(request, zod(contactFormSchema));

	if (!form.valid) {
		return json({ form }, { status: 400 });
	}

	const transportData = {
		host: EMAIL_HOST,
		port: 587,
		secure: false,
		auth: {
			user: EMAIL_ADRESS,
			pass: EMAIL_PASSWORD
		}
	};

	const transporter = nodemailer.createTransport(transportData);

	const mailOptions = {
		from: EMAIL_ADRESS,
		to: form.data.mailToContactPerson,
		subject: 'Kontaktanfrage',
		text: getContactFormText(form.data),
		html: getContactFormTemplate(form.data),
		replyTo: form.data.email
	};

	try {
		await transporter.verify();
		console.log('Server is ready to take messages');
	} catch (err) {
		console.error('Verification failed', err);
		return json(
			{
				form: message(form, 'SMTP server not reachable')
			},
			{ status: 403 }
		);
	}

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);
		return json({ form: message(form, 'success') });
	} catch (err) {
		console.error('Error while sending mail', err);
		return json(
			{
				form: message(form, err)
			},
			{ status: 403 }
		);
	}
}
