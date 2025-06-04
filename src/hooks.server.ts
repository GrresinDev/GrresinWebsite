import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';

import PocketBase from 'pocketbase';
import { sequence } from '@sveltejs/kit/hooks';

export const pocketBaseHandle: Handle = async ({ event, resolve }) => {
	const url = 'http://127.0.0.1:8090';

	event.locals.pb = new PocketBase(url);
	
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

export const handle = sequence(paraglideHandle, pocketBaseHandle);
