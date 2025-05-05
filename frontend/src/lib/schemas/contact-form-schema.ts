import { z } from 'zod';

export const contactFormSchema = z.object({
	name: z.string().min(2).max(50),
	company: z.string().optional().nullable(),
	email: z.string().email().min(2).max(50),
	phone: z.string().optional().nullable(),
	message: z.string().min(2).max(500)
});

export type ContactFormSchema = typeof contactFormSchema;
