import type { ProjecctTypeModel, ProjectModel, ProjectWithThumbNail } from '$lib/interface/project';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ClientResponseError } from 'pocketbase';
export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;

	try {
		const [projects, projectTypes]: [ProjectModel[], ProjecctTypeModel[]] = await Promise.all([
			pb.collection('projects').getFullList<ProjectModel>(),

			pb.collection('project_types').getFullList<ProjecctTypeModel>() // Note: Removed the extra [] here, as getFullList returns Array<T>
		]);

		const projectsWithImages: ProjectWithThumbNail[] = projects.map((project) => ({
			...project,
			before_thumbnail:
				project.before_images && project.before_images.length > 0
					? pb.files.getURL(project, project.before_images[0])
					: null,
			after_thumbnail:
				project.after_images && project.after_images.length > 0
					? pb.files.getURL(project, project.after_images[0])
					: null
		}));

		// Sort project types
		const sortedProjectTypes = projectTypes.sort((a, b) => {
			if (a.types === 'all') return -1;
			if (b.types === 'all') return 1;
			return 0;
		});

		return {
			projects: projectsWithImages,
			projectTypes: sortedProjectTypes
		};
	} catch (e: unknown) {
		console.error('Error fetching or processing data in load function:', e);

		// --- Robust Error Handling ---
		if (e instanceof ClientResponseError) {
			if (e.status === 404) {
				error(404, 'Some critical content for this page was not found.');
			} else if (e.isAbort) {
				error(408, 'Request timed out while loading page content.');
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
