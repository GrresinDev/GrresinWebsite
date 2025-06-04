import type { PostModel,PostModelThumbNail } from '$lib/interface/post';
import type { ImagesModel } from '$lib/interface/images';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;

	// Fetch all data in parallel
	const [posts, recentPost, imagesCarousel]: [PostModel[], PostModel, ImagesModel] =
		await Promise.all([
			pb.collection('posts').getFullList<PostModel>(),
			pb.collection('posts').getFirstListItem<PostModel>('', { sort: '-created' }),
			pb.collection('website_images').getOne<ImagesModel>('0e3c5430xuvt90m')
		]);
	const carouselImageUrls = imagesCarousel.images.map((record) =>
		pb.files.getURL(imagesCarousel, record)
	);
	const postsWithImageUrls:PostModelThumbNail[] = posts.map(post => ({
		...post,
		thumbnail: pb.files.getURL(post, post.image)
	}));
	const recentPostWithImageUrls:PostModelThumbNail = {
		...recentPost,
		thumbnail: pb.files.getURL(recentPost, recentPost.image)
	};
	return {
		posts:postsWithImageUrls,
		recentPost:recentPostWithImageUrls,
		carouselImageUrls
	};
};
