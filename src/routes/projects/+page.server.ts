import type { ProjecctTypeModel, ProjectModel, ProjectWithThumbNail } from '$lib/interface/project';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ClientResponseError } from 'pocketbase';
/*
export const load: PageServerLoad = async ({ locals, setHeaders }) => {
	setHeaders({
		'Cache-Control': `max-age=0, s-maxage=60`
	});

	const pb = locals.pb;

	try {
		const [projectsResult, projectTypesResult] = await Promise.all([
			pb.collection('projects').getList<ProjectModel>(1, 500, {}),
			pb.collection('project_types').getList<ProjecctTypeModel>(1, 500, {
				fields: 'id,types,types_ar'
			})
		]);

		const projects = projectsResult.items;

		const projectTypes = projectTypesResult.items;

		// Process projects to include thumbnail URLs
		const projectsWithImages: ProjectWithThumbNail[] = projects.map((project: ProjectModel) => ({
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

		// Assuming projectTypes is already sorted or doesn't need further sorting
		const sortedProjectTypes = projectTypes;

		return {
			projects: projectsWithImages,
			projectTypes: sortedProjectTypes
		};
	} catch (e: unknown) {
		// Log the error for debugging purposes on the server.
		// In production, consider using a dedicated logging service.
		console.error('Error fetching or processing data in load function:', e);

		if (e instanceof ClientResponseError) {
			if (e.status === 404) {
				// Specific error for content not found
				error(404, 'Some critical content for this page was not found. Please try again later.');
			} else if (e.isAbort) {
				// Specific error for request timeout
				error(
					408,
					'Request timed out while loading page content. Please check your internet connection.'
				);
			} else {
				// General ClientResponseError. Be cautious about exposing raw messages.
				// A generic message is often safer for users in production.
				const userErrorMessage =
					e.response?.message || 'An unexpected error occurred while fetching data.';
				error(e.status, userErrorMessage);
			}
		} else {
			// Catch-all for any other unexpected errors (e.g., programming errors).
			// Always return a generic 500 error message to the client for security.
			error(
				500,
				'Failed to load page content due to an internal server error. We are working to fix this.'
			);
		}
	}
};
*/
export const load: PageServerLoad = async ({ locals, setHeaders }) => {
    setHeaders({
        'Cache-Control': `max-age=0, s-maxage=60`
    });

    const pb = locals.pb;

    try {
        // Fetch project types immediately (non-streamed)
        const projectTypesResult = await pb.collection('project_types').getList<ProjecctTypeModel>(1, 500, {
            fields: 'id,types,types_ar'
        });
        const projectTypes = projectTypesResult.items;
        const sortedProjectTypes = projectTypes; // Assuming no further sorting needed

        // Define the promise for projects (to be streamed)
        const projectsPromise = pb.collection('projects').getList<ProjectModel>(1, 500, {});

        return {
            // projectTypes are returned directly (not a promise), so they are non-streamed
            projectTypes: sortedProjectTypes,

            // projects are returned as a promise, enabling streaming
            projects: projectsPromise.then(projectsResult => {
                const projects = projectsResult.items;
                const projectsWithImages: ProjectWithThumbNail[] = projects.map((project: ProjectModel) => ({
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
                return projectsWithImages;
            }).catch(e => {
                // Important: If you want to return an empty array or null on error
                // for the streamed data, do it here. If you re-throw, it goes to the global catch.
                console.error('Error processing streamed projects:', e);
                // Option 1: Re-throw to be caught by the outer try-catch block for a global error page
                throw e;
                // Option 2: Return an empty array or null to handle gracefully in the component's #await catch block
                // return []; // Or return null;
            })
        };
    } catch (e: unknown) {
        // This catch block handles errors that occur during:
        // 1. Initial setup (like pb not being available)
        // 2. The synchronous fetch of projectTypes
        // 3. Any errors re-thrown from the 'projects' promise's .catch block
        console.error('Error in load function (critical path or re-thrown streamed error):', e);

        if (e instanceof ClientResponseError) {
            if (e.status === 404) {
                error(404, 'Some critical content for this page was not found. Please try again later.');
            } else if (e.isAbort) {
                error(
                    408,
                    'Request timed out while loading page content. Please check your internet connection.'
                );
            } else {
                const userErrorMessage =
                    e.response?.message || 'An unexpected error occurred while fetching data.';
                error(e.status, userErrorMessage);
            }
        } else {
            error(
                500,
                'Failed to load page content due to an internal server error. We are working to fix this.'
            );
        }
    }
};