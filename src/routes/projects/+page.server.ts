import type { ImagesModel } from '$lib/interface/images';
import type { ProjecctTypeModel, ProjectModel, ProjectWithThumbNail } from '$lib/interface/project';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	console.log('Load Runing');
	const pb = locals.pb;

	// Fetch all data in parallel using Promise.all
	const [projects, recentProject, imagesCarousel, projectTypes]: [
		ProjectModel[],
		ProjectModel,
		ImagesModel,
		ProjecctTypeModel[]
	] = await Promise.all([
		pb.collection('projects').getFullList<ProjectModel>(),
		pb.collection('projects').getFirstListItem<ProjectModel>('', { sort: '-created' }),
		pb.collection('website_images').getOne<ImagesModel>('a9622cf854s90a4'),
		pb.collection('project_types').getFullList<ProjecctTypeModel[]>()
	]);

	const projectsWithImages: ProjectWithThumbNail[] = projects.map((project) => ({
		...project,
		before_thumbnail:
			project.before_images.length > 0 ? pb.files.getURL(project, project.before_images[0]) : null,
		after_thumbnail:
			project.after_images.length > 0 ? pb.files.getURL(project, project.after_images[0]) : null // Handle case with no images
	}));

	const recentProjectWithImages: ProjectWithThumbNail = {
		...recentProject,
		before_thumbnail:
			recentProject.before_images.length > 0
				? pb.files.getURL(recentProject, recentProject.before_images[0])
				: null,
		after_thumbnail:
			recentProject.after_images.length > 0
				? pb.files.getURL(recentProject, recentProject.after_images[0])
				: null
	};

	// Generate image URLs using map
	const carouselImageUrls = imagesCarousel.images.map((record) =>
		pb.files.getURL(imagesCarousel, record)
	);
	const sortedProjectTypes = projectTypes.sort((a, b) => {
		if (a.types === 'all') return -1;
		if (b.types === 'all') return 1;
		return 0;
	});

	return {
		projects: projectsWithImages,
		recentProject: recentProjectWithImages,
		images: carouselImageUrls,
		projectTypes: sortedProjectTypes
	};
};
