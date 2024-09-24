<script lang="ts">
	import ThSort from '$lib/components/Datatable/ThSort.svelte';
	import ThFilter from '$lib/components/Datatable/ThFilter.svelte';
	import Search from '$lib/components/Datatable/Search.svelte';
	import RowsPerPage from '$lib/components/Datatable/RowsPerPage.svelte';
	import RowCount from '$lib/components/Datatable/RowCount.svelte';
	import Pagination from '$lib/components/Datatable/Pagination.svelte';
	import { DataHandler } from '@vincjo/datatables';
	import { _ } from 'svelte-i18n';
	import Account from '$lib/entity/Account';
	import type { PageData } from './$types';

	export let data: PageData;
	const em = data.em;
	let accounts = data.accounts;

	const entityName = 'Account';
	const handler = new DataHandler(accounts, { rowsPerPage: 5 });
	const rows = handler.getRows() || [];
	type AccountKey = keyof Account;
	const properties: AccountKey[] = Object.keys(new Account()) as AccountKey[];

	$: accounts, handler.setRows(accounts)

	async function loadFixtures() {
		await em.fixtures(entityName);
		accounts = await em.all(entityName);
	}
	async function deleteAll() {
		await em.deleteAll(entityName);
		accounts = await em.all(entityName);
	}
</script>

<h1>Accounts</h1>

<a href="/accounts/new" class="btn btn-primary" id="new-button">{$_('account.new')}</a>

<!-- DEBUG -->
<button on:click={loadFixtures}>{$_('load_fixtures')}</button>
<button on:click={deleteAll}>{$_('delete_all')}</button>
<!-- END DEBUG -->

<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				{#each properties as prop}
					<ThSort {handler} orderBy="{prop}">{$_(`account.${prop}`)}</ThSort>
				{/each}
			</tr>
			<tr>
				{#each properties as prop}
				<ThFilter {handler} filterBy="{prop}" />
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					{#each properties as prop}
						<td>{row[prop]}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>
