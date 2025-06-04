import type { ProjectModel } from '$lib/interface/project';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const pb = locals.pb;

	try {
		const project: ProjectModel = await pb
			.collection('projects')
			.getFirstListItem<ProjectModel>(`slug="${params.id}"`);
		// Generate URLs for images
		const beforeImages = project.before_images.map((filename: string) =>
			pb.files.getURL(project, filename)
		);
		const afterImages = project.after_images.map((filename: string) =>
			pb.files.getURL(project, filename)
		);
		return { project, beforeImages, afterImages };
	} catch (_) {
		error(401, 'Project Not Found');
	}
};
