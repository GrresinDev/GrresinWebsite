import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const pb = locals.pb;
	// Use Promise.all to fetch both lists concurrently
	const [blog_slugs_data, project_slugs_data] = await Promise.all([
		pb.collection('posts').getFullList({ fields: 'slug' }),
		pb.collection('projects').getFullList({ fields: 'slug' })
	]);

	// Extract slugs after both promises have resolved
	const blogSlugs = blog_slugs_data.map((blog) => blog.slug);
	const projectSlugs = project_slugs_data.map((project) => project.slug); // Corrected variable name

	return await sitemap.response({
		origin: 'http://localhost:5173/',
		paramValues: {
			'/blog/[id]': blogSlugs,
			'/projects/[id]': projectSlugs
		}
	});
};
