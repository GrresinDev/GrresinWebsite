import type { PostModel, PostModelThumbNail } from '$lib/interface/post';
import type { ProjectModel, ProjectWithThumbNail } from '$lib/interface/project';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
export const GET: RequestHandler = async ({ locals }) => {
	const pb = locals.pb;
	const [posts, projects]: [PostModel[], ProjectModel[]] = await Promise.all([
		pb.collection('posts').getFullList<PostModel[]>(),
		pb.collection('projects').getList<ProjectModel[]>(1, 500, {})
	]);

	const projectsWithImages: ProjectWithThumbNail[] = projects.items.map(
		(project: ProjectModel) => ({
			...project,
			before_thumbnail:
				project.before_images && project.before_images.length > 0
					? pb.files.getURL(project, project.before_images[0])
					: null,
			after_thumbnail:
				project.after_images && project.after_images.length > 0
					? pb.files.getURL(project, project.after_images[0])
					: null
		})
	);
	const postsWithImageUrls: PostModelThumbNail[] = posts.map((post) => ({
		...post,
		thumbnail: pb.files.getURL(post, post.image)
	}));
	return json({
		projects: projectsWithImages,
		posts: postsWithImageUrls
	});
};
