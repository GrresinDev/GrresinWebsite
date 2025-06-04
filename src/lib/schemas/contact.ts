import { z } from 'zod';
import { sanitize } from '$lib/schemas/sanitize';

export const contactUsSchema = z
	.object({
		email: z.string().email({ message: 'Email is Required' }),
		subject: z
			.string()
			.min(2, { message: 'Subject is Required' })
			.transform(sanitize)
			.refine((val) => val.length >= 2, 'Invalid content in subject'),
		message: z
			.string()
			.min(2, { message: 'Message is Required' })
			.transform(sanitize)
			.refine((val) => val.length >= 2, 'Invalid content in subject')
	})
	.strict();

