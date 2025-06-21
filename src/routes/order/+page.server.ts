import { OrderSchema } from '$lib/schemas/order';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};
export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const rawData = Object.fromEntries(formData);
		console.log(rawData);

		const result = OrderSchema.safeParse(rawData);
		if (!result.success) {
			const fieldErrors = result.error.formErrors.fieldErrors;
			const errorResponse = Object.entries(fieldErrors).reduce(
				(acc, [field, errors]) => {
					if (errors?.[0]) acc[field] = errors[0];
					return acc;
				},
				{} as Record<string, string>
			);
			console.log(errorResponse);
			return fail(400, {
				success: false,
				validation: errorResponse,
				submittedValues: rawData // Preserve original values for form re-population
			});
		}
		try {
			// Use validated/sanitized data from result

			const pb = locals.pb;

			await pb.collection('floor_order').create(result.data);

			return { success: true, message: 'Message sent successfully!' };
		} catch (error) {
			console.error('PocketBase Error:', error);
			return fail(500, {
				success: false,
				message: 'Failed to send message. Please try again later.'
			});
		}
	}
};
/*
export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const rawData = Object.fromEntries(formData);

		const result = contactUsSchema.safeParse({
			email: rawData.email,
			subject: rawData.subject,
			message: rawData.message
		});

		// Early return on validation failure
		if (!result.success) {
			const fieldErrors = result.error.formErrors.fieldErrors;
			const errorResponse = Object.entries(fieldErrors).reduce(
				(acc, [field, errors]) => {
					if (errors?.[0]) acc[field] = errors[0];
					return acc;
				},
				{} as Record<string, string>
			);

			return fail(400, {
				success: false,
				validation: errorResponse,
				submittedValues: rawData // Preserve original values for form re-population
			});
		}

		try {
			// Use validated/sanitized data from result
			const { email, message } = result.data;
			const pb = locals.pb;

			await pb.collection('contact').create({
				message,
				email
			});

			return { success: true, message: 'Message sent successfully!' };
		} catch (error) {
			console.error('PocketBase Error:', error);
			return fail(500, {
				success: false,
				message: 'Failed to send message. Please try again later.'
			});
		}
	}
};
*/
