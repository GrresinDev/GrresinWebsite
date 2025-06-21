import { z } from 'zod';
import { sanitize } from '$lib/schemas/sanitize';

export const OrderSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Too Short' })
		.transform(sanitize)
		.refine((val) => val.length >= 2, 'Invalid content in name'),
	email: z.string().email(),
	phone: z
		.string()
		.transform(sanitize)
		.refine((val) => val.length >= 2, 'Invalid content in Phone'),
	city: z
		.string()
		.transform(sanitize)
		.refine((val) => val.length >= 2, 'Invalid content in City'),
	place: z
		.string()
		.transform(sanitize)
		.refine((val) => val.length >= 2, 'Invalid content in place')
});
