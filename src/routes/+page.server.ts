import type { PageServerLoad, Actions } from './$types';
import { ClientResponseError } from 'pocketbase';
import { error, fail } from '@sveltejs/kit';
import { contactUsSchema } from '$lib/schemas/contact';
import type { ProjectsProductsModel, ProjectsProductsModelWithThumb } from '$lib/interface/project';
import type { FAQModel } from '$lib/interface/faq';
import type { ArtProductsModel, ArtProductsModelwithThumb } from '$lib/interface/art';
import type { PartnerModel, PartnerModelWithThumbNail } from '$lib/interface/partner';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;

	try {
		const [art_products, faq, projects_products, partners]: [
			ArtProductsModel[],
			FAQModel[],
			ProjectsProductsModel[],
			PartnerModel[]
		] = await Promise.all([
			pb.collection('art_products').getFullList<ArtProductsModel>(),
			pb.collection('faq').getFullList<FAQModel>(),
			pb.collection('projects_products').getFullList<ProjectsProductsModel>(),
			pb.collection('partners').getFullList()
		]);

		const projects_productsWithImageUrls: ProjectsProductsModelWithThumb[] = projects_products.map(
			(post) => ({
				...post,
				thumbnail: pb.files.getURL(post, post.image),

				tds_url: post.tds ? pb.files.getURL(post, post.tds) : undefined
			})
		);

		const partenerWithThumb: PartnerModelWithThumbNail[] = partners.map((partner) => ({
			...partner,
			thumbnail: pb.files.getURL(partner, partner.logo)
		}));
		const art_products_WithImageUrls: ArtProductsModelwithThumb[] = art_products.map((post) => ({
			...post,
			thumbnail: pb.files.getURL(post, post.image)
		}));

		return {
			faq,
			projects_productsWithImageUrls,
			art_products: art_products_WithImageUrls,
			partenerWithThumb
		};
	} catch (e: unknown) {
		console.error('Error fetching or processing data in load function:', e);

		if (e instanceof ClientResponseError) {
			if (e.isAbort) {
				error(408, 'Request timed out while loading data.');
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
