<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: className = '' }: { children: Snippet; class?: string } = $props();
</script>

<div class={['mx-auto w-full max-w-site px-4 sm:px-6 lg:px-10', className]}>
	{@render children()}
</div>
