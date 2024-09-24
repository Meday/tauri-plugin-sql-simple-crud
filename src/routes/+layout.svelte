<script lang="ts">
	import '../app.css';
	import '$lib/utils/i18n';
</script>

<div>
	<nav>
		<ul class="flex space-x-2">
			<li><a href="/" class="btn variant-filled-surface">HOME</a></li>
			<li><a href="/accounts" class="btn variant-filled-surface">ACCOUNTS</a></li>
			<li><a href="/about" class="btn variant-filled-surface">ABOUT</a></li>
		</ul>
	</nav>
	<slot />
</div>
