<script lang="ts">
	import Account from '$lib/entity/Account';
	import { goto } from '$app/navigation';
	import Fa from 'svelte-fa';
	import { faSave } from '@fortawesome/free-regular-svg-icons'
	import type { PageData } from './$types';

	export let data: PageData;
	const em = data.em;

	const entityName = 'Account';
	let account = new Account();
	let submit_button_disabled = true;

	function onChange() {
		submit_button_disabled = !account.email || !account.password || !account.alias;
	}


	async function submitForm(e: Event) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();

		try {
			const id = await em.create(entityName, account.serialize());
			console.log('Account created with id', id);
		} catch (e) {
			console.error(e);
			return;
		}

		await goto('/accounts');

		return false;
	}
</script>

<h1>Accounts</h1>

<form action="#" on:submit={submitForm}>
	<h2>Create account</h2>
	<input class="input" title="Email" type="email" placeholder="john@example.com" autocomplete="email" bind:value={account.email} on:keyup={onChange} />
	<input class="input" title="Password" type="text" placeholder="1234" bind:value={account.password} on:keyup={onChange} />
	<input class="input" title="Alias" type="text" placeholder="Jojo" bind:value={account.alias} on:keyup={onChange} />
	<button type="submit" class="btn variant-filled{submit_button_disabled ? '-filled-warning' : ''}" disabled={submit_button_disabled} >
		<Fa icon={faSave} />
		<span>Save</span>
	</button>
</form>
