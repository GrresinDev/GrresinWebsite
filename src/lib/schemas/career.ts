import { z } from 'zod';
import { sanitize } from '$lib/schemas/sanitize';

export const careerSchema = z
	.object({
		name: z
			.string()
			.min(1, { message: 'Name is Required' })
			.transform(sanitize)
			.refine((val) => val.length >= 2, 'Invalid content in subject'),
		position: z
			.string()
			.min(1, { message: 'Position is Required' })
			.transform(sanitize)
			.refine((val) => val.length >= 2, 'Invalid content in subject'),
		message: z
			.string()
			.min(1, { message: 'Message is Required' })
			.transform(sanitize)
			.refine((val) => val.length >= 1, 'Invalid content in message'),
		email: z.string().email({ message: 'Invalid Email' })
	})
	.strict();
