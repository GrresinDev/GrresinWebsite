import type { ReviewModel } from '$lib/interface/review';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ClientResponseError } from 'pocketbase';
export const prerender = true;

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;

	try {
		const records: ReviewModel[] = await pb.collection('reviews').getFullList();
		return { reviews: records };
	} catch (e: unknown) {
		console.error('Error fetching reviews:', e);

		if (e instanceof ClientResponseError) {
			if (e.isAbort) {
				error(408, 'Request timed out while fetching reviews.');
			} else {
				const errorMessage = e.response?.message || e.message || 'An unexpected error occurred.';
				error(e.status, errorMessage);
			}
		} else {
			error(500, 'Failed to load reviews due to an internal server error.');
		}
	}
};
