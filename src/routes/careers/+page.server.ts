import { fail } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { ClientResponseError } from 'pocketbase';
import { careerSchema } from '$lib/schemas/career';
import type { PositionModel } from '$lib/interface/position';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;
	const position: PositionModel[] = await pb.collection('positions').getFullList();
	return {
		position: position
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		// Validate non-file inputs
		const rawData = {
			name: formData.get('name'),
			position: formData.get('position'),
			message: formData.get('message'),
			email: formData.get('email')
		};
		
		const validation = careerSchema.safeParse(rawData);

		if (!validation.success) {
			console.error('validation Wrong');
			const fieldErrors = validation.error.formErrors.fieldErrors;
			const errorResponse = Object.entries(fieldErrors).reduce(
				(acc, [field, errors]) => {
					if (errors?.[0]) acc[field] = errors[0];
					console.error(acc);
					return acc;
				},
				{} as Record<string, string>
			);
			

			return fail(400, {
				success: false,
				validation: errorResponse
			});
		}

		// Validate file input
		const file = formData.get('cv');
		if (!(file instanceof File) || file.size === 0) {
			return fail(400, {
				success: false,
				error: { file: ['Invalid file upload'] }
			});
		}

		try {
			const pb = locals.pb;

			await pb.collection('recruiters').create({
				...validation.data,
				cv: file
			});

			return { success: true };
		} catch (err) {
			if (err instanceof ClientResponseError) {
				return fail(500, {
					success: false,
					error: err.response
				});
			}
			return fail(500, {
				success: false,
				error: 'Unknown server error'
			});
		}
	}
};
