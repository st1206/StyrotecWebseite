import { z } from 'zod';

export const contactFormSchema = z.object({
	name: z.string().min(2).max(50),
	company: z.string().optional(),
	email: z.string().email().min(2).max(50),
	phone: z.string().optional(),
	message: z.string().min(2).max(500),
	mailToContactPerson: z.string().email().min(2),
	originUrl: z.string().min(2)
});

export type ContactFormSchema = typeof contactFormSchema;
