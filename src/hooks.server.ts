import { error, type Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';

import PocketBase from 'pocketbase';
import { sequence } from '@sveltejs/kit/hooks';
import { ClientResponseError } from 'pocketbase';
import { POCKETBASE_URL } from '$env/static/private';

export const pocketBaseHandle: Handle = async ({ event, resolve }) => {
	const url = POCKETBASE_URL;

	try {
		event.locals.pb = new PocketBase(url);
	} catch (e: unknown) {
		// Use unknown for caught errors
		console.error('PocketBase client initialization failed in hook:', e);

		if (e instanceof ClientResponseError) {
			error(
				e.status,
				e.response?.message || e.message || 'PocketBase API connection error during setup.'
			);
		} else if (e instanceof Error) {
			error(500, `Failed to initialize backend connection: ${e.message}`);
		} else {
			// Catch anything else unknown
			error(500, 'Failed to establish backend connection due to an unknown error.');
		}
	}

	const response = await resolve(event);

	return response;
};
// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				const dir = locale === 'ar' ? 'rtl' : 'ltr';
				return html.replace('%lang%', locale).replace('%dir%', dir);
			}
		});
	});

export const handle = sequence(pocketBaseHandle, paraglideHandle);
