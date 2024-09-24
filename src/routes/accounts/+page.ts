import db from '$lib/utils/crud';
import type Account from '$lib/entity/Account';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const accounts = await db.all('Account') as Account[];
	return { accounts: accounts };
}
