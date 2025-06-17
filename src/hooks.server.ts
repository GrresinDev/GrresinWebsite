import { error, type Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';

import PocketBase from 'pocketbase';
import { sequence } from '@sveltejs/kit/hooks';
import { POCKETBASE_URL } from '$env/static/private';

export const pocketBaseHandle: Handle = async ({ event, resolve }) => {
	const url = POCKETBASE_URL;

	try {
		event.locals.pb = new PocketBase(url);
	} catch (e) {
		console.error('PocketBase connection failed:', e);

		error(500, {
			message: 'Failed to connect to the backend services. Please try again later.'
		});
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
