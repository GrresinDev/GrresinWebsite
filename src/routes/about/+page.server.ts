import type { ReviewModel } from '$lib/interface/review';
import type { PageServerLoad } from './$types';


 
  

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;
	const records: ReviewModel[] = await pb.collection('reviews').getFullList();
	return { reviews: records };
};
