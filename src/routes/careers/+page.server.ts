import type { Actions, PageServerLoad } from './$types';
import { ClientResponseError } from 'pocketbase';
import { careerSchema } from '$lib/schemas/career';
import type { PositionModel } from '$lib/interface/position';
import { error, fail } from '@sveltejs/kit'; // Import fail from @sveltejs/kit

export const load: PageServerLoad = async ({ locals, setHeaders }) => {
	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${60 * 60}`
	});
	const pb = locals.pb;
	try {
		const position: PositionModel[] = await pb.collection('positions').getFullList({});
		return {
			position: position
		};
	} catch (e: unknown) {
		console.error('Error fetching or processing data in load function:', e);

		if (e instanceof ClientResponseError) {
			if (e.isAbort) {
				error(408, 'Request timed out while loading page content.');
			} else if (e.status === 404) {
				error(404, 'One or more required content items were not found.');
			} else {
				const errorMessage =
					e.response?.message || e.message || 'An unexpected API error occurred.';
				error(e.status, errorMessage);
			}
		} else {
			error(500, 'Failed to load page content due to an internal server error.');
		}
	}
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
			console.error('Validation Wrong:', validation.error.formErrors.fieldErrors);
			const fieldErrors = validation.error.formErrors.fieldErrors;
			const errorResponse = Object.entries(fieldErrors).reduce(
				(acc, [field, errors]) => {
					// Only take the first error message for each field
					if (errors && errors[0]) {
						acc[field] = errors[0];
					}
					return acc;
				},
				{} as Record<string, string>
			);

			return fail(400, {
				success: false,
				validation: errorResponse,
				data: rawData // Return rawData to pre-fill form fields
			});
		}

		// Validate file input
		const file = formData.get('cv');
		// Ensure file is a File object and has a size greater than 0
		if (!(file instanceof File) || file.size === 0) {
			return fail(400, {
				success: false,
				error: { cv: 'Invalid file upload or no file provided.' }, // Changed to 'cv' to match input name
				data: rawData
			});
		}

		// Basic file type validation (optional, but good practice)
		const allowedFileTypes = [
			'application/pdf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		];
		if (!allowedFileTypes.includes(file.type)) {
			return fail(400, {
				success: false,
				error: { cv: 'Invalid file type. Only PDF, DOC, and DOCX are allowed.' },
				data: rawData
			});
		}

		// Basic file size validation (optional)
		const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
		if (file.size > MAX_FILE_SIZE) {
			return fail(400, {
				success: false,
				error: { cv: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit.` },
				data: rawData
			});
		}

		try {
			const pb = locals.pb;

			// Prepare form data for PocketBase, including the file
			const recordData = new FormData();
			recordData.append('name', validation.data.name);
			recordData.append('position', validation.data.position);
			recordData.append('message', validation.data.message);
			recordData.append('email', validation.data.email);
			recordData.append('cv', file); // Append the file directly

			await pb.collection('recruiters').create(recordData);

			return { success: true };
		} catch (err) {
			console.error('Server error during form submission:', err);
			if (err instanceof ClientResponseError) {
				// PocketBase specific error handling
				return fail(err.status, {
					success: false,
					error: err.response,
					data: rawData
				});
			}
			return fail(500, {
				success: false,
				error: 'Unknown server error during form submission.',
				data: rawData
			});
		}
	}
};
