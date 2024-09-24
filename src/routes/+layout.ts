import { waitLocale } from "svelte-i18n";
import { loadDb } from "$lib/utils/db";
import type { LayoutLoad } from "./$types";

export const ssr = false;
export const prerender = true;

export const load: LayoutLoad = async () => {
    await waitLocale()
    await loadDb();
    const entityManager = await import("$lib/utils/crud").then((m) => m.default);
    return { em: entityManager };
};
