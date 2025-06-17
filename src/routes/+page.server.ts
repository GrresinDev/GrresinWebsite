import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { contactUsSchema } from '$lib/schemas/contact';
import type { ProjectsProductsModel, ProjectsProductsModelWithThumb } from '$lib/interface/project';
import type { FAQModel } from '$lib/interface/faq';
import type { ArtProductsModel, ArtProductsModelwithThumb } from '$lib/interface/art';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;
	const art_products: ArtProductsModel[] = await pb.collection('art_products').getFullList();

	const faq: FAQModel[] = await pb.collection('faq').getFullList();

	const projects_products: ProjectsProductsModel[] = await pb
		.collection('projects_products')
		.getFullList();

	const projects_productsWithImageUrls: ProjectsProductsModelWithThumb[] = projects_products.map(
		(post) => ({
			...post,
			thumbnail: pb.files.getURL(post, post.image),
			tds_url: pb.files.getURL(post, post.tds)
		})
	);

	const art_products_WithImageUrls: ArtProductsModelwithThumb[] = art_products.map((post) => ({
		...post,
		thumbnail: pb.files.getURL(post, post.image)
	}));
	return { faq, projects_productsWithImageUrls, art_product: art_products_WithImageUrls };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const rawData = Object.fromEntries(formData);

		const result = contactUsSchema.safeParse({
			email: rawData.email,
			subject: rawData.subject,
			message: rawData.message
		});

		// Early return on validation failure
		if (!result.success) {
			const fieldErrors = result.error.formErrors.fieldErrors;
			const errorResponse = Object.entries(fieldErrors).reduce(
				(acc, [field, errors]) => {
					if (errors?.[0]) acc[field] = errors[0];
					return acc;
				},
				{} as Record<string, string>
			);

			return fail(400, {
				success: false,
				validation: errorResponse,
				submittedValues: rawData // Preserve original values for form re-population
			});
		}

		try {
			// Use validated/sanitized data from result
			const { email, message } = result.data;
			const pb = locals.pb;

			await pb.collection('contact').create({
				message,
				email
			});

			return { success: true, message: 'Message sent successfully!' };
		} catch (error) {
			console.error('PocketBase Error:', error);
			return fail(500, {
				success: false,
				message: 'Failed to send message. Please try again later.'
			});
		}
	}
};
