import type { PostModel } from '$lib/interface/post';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { ClientResponseError } from 'pocketbase';

export const load: PageServerLoad = async ({ params, locals }) => {
	const pb = locals.pb;

	const getPost = async (): Promise<PostModel> => {
		return await pb.collection('posts').getFirstListItem(`slug="${params.id}"`);
	};
	return { getPost: getPost() };
};
export const actions: Actions = {
	/**
	 * Handles liking a post. Expects 'likes' in FormData.
	 * Updates the 'posts' collection record identified by the route parameter 'id'.
	 */
	like: async ({ request, locals, params }) => {
		const pb = locals.pb;
		if (!pb) {
			console.error('PocketBase client instance not found in locals.');
			return fail(503, { message: 'Service configuration error.' });
		}

		const postId = params.id;
		if (!postId) {
			// This usually indicates a routing setup issue rather than a client error.
			console.error('Post ID missing from route parameters.');
			return fail(400, { message: 'Required post ID is missing.' });
		}

		let formData: FormData;
		try {
			formData = await request.formData();
		} catch (error) {
			console.error('Failed to parse FormData:', error);
			return fail(400, { message: 'Invalid form data submitted.' });
		}

		const likesValue = formData.get('likes');

		// Validate that 'likes' exists and is a string (FormData can contain Files)
		if (likesValue === null || typeof likesValue !== 'string') {
			return fail(400, { message: 'Missing or invalid "likes" field.' });
		}

		const likesNumber = Number(likesValue);
		if (isNaN(likesNumber)) {
			return fail(400, { message: '"likes" field must be a valid number.' });
		}
		try {
			const POSTS_COLLECTION = 'posts';
			const add = likesNumber + 1;
			await pb.collection(POSTS_COLLECTION).update(postId, {
				likes: add
			});

			return { success: true, remove: true };
		} catch (error: unknown) {
			if (error instanceof ClientResponseError) {
				console.error('PocketBase API Error:', {
					url: error.url,
					status: error.status,
					response: error.response,
					isAbort: error.isAbort,
					originalError: error.originalError
				});

				let userMessage = 'Failed to update likes due to an API error.';
				if (error.status === 404) {
					userMessage = 'The post could not be found.';
				} else if (error.status === 400) {
					userMessage = error.response?.message || 'Invalid data submitted for update.';
				} else if (error.status === 403) {
					userMessage = 'You do not have permission to perform this action.';
				}
				return fail(error.status, { message: userMessage, remove: true });
			}

			console.error('Unexpected error in "like" action:', error);
			return fail(500, {
				message: 'An unexpected internal error occurred. Please try again later.',
				remove: true
			});
		}
	}
};
