import { z } from 'zod';

export const contactFormSchema = z.object({
	name: z
		.string({
			required_error: 'Bitte geben Sie Ihren Namen ein.',
			invalid_type_error: 'Ungültiger Name.'
		})
		.min(2, {
			message: 'Der Name muss mindestens 2 Zeichen lang sein.'
		})
		.max(50, {
			message: 'Der Name darf maximal 50 Zeichen lang sein.'
		}),
	company: z
		.string()
		.max(100, {
			message: 'Der Firmenname darf maximal 100 Zeichen lang sein.'
		})
		.optional(),
	email: z
		.string({
			required_error: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
			invalid_type_error: 'Ungültiges E-Mail-Format.'
		})
		.email({
			message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
		})
		.min(2, {
			message: 'Die E-Mail-Adresse muss mindestens 2 Zeichen lang sein.'
		})
		.max(50, {
			message: 'Die E-Mail-Adresse darf maximal 50 Zeichen lang sein.'
		}),
	phone: z
		.string()
		.max(20, {
			message: 'Die Telefonnummer darf maximal 20 Zeichen lang sein.'
		})
		.optional(),
	message: z
		.string({
			required_error: 'Bitte geben Sie Ihre Nachricht ein.',
			invalid_type_error: 'Ungültiges Nachrichtenformat.'
		})
		.min(2, {
			message: 'Die Nachricht muss mindestens 2 Zeichen lang sein.'
		})
		.max(500, {
			message: 'Die Nachricht darf maximal 500 Zeichen lang sein.'
		}),
	mailToContactPerson: z
		.string({
			required_error: 'Es wurde keine Kontaktperson ausgewählt.',
			invalid_type_error: 'Ungültiges E-Mail-Format für Kontaktperson.'
		})
		.email({
			message: 'Ungültige E-Mail-Adresse der Kontaktperson.'
		})
		.min(2, {
			message: 'Die E-Mail-Adresse der Kontaktperson muss mindestens 2 Zeichen lang sein.'
		}),
	originUrl: z.string().min(2)
});

export type ContactFormSchema = typeof contactFormSchema;
