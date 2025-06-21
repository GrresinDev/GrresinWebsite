import type { PostModel, PostModelThumbNail } from '$lib/interface/post';
import type { ImagesModel } from '$lib/interface/images';
import type { PageServerLoad } from './$types';
import { ClientResponseError } from 'pocketbase';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, setHeaders }) => {
	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=${60 * 60}`
	});
	const pb = locals.pb;

	try {
		const [posts, recentPost, imagesCarousel]: [PostModel[], PostModel, ImagesModel] =
			await Promise.all([
				pb.collection('posts').getFullList<PostModel>(),
				pb.collection('posts').getFirstListItem<PostModel>('', { sort: '-created' }),
				pb.collection('website_images').getFirstListItem('name="blogs_carousel"')
			]);
		const carouselImageUrls = imagesCarousel.images.map((record) =>
			pb.files.getURL(imagesCarousel, record)
		);

		const postsWithImageUrls: PostModelThumbNail[] = posts.map((post) => ({
			...post,
			thumbnail: pb.files.getURL(post, post.image)
		}));

		const recentPostWithImageUrls: PostModelThumbNail = {
			...recentPost,
			thumbnail: pb.files.getURL(recentPost, recentPost.image)
		};

		return {
			posts: postsWithImageUrls,
			recentPost: recentPostWithImageUrls,
			carouselImageUrls
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
