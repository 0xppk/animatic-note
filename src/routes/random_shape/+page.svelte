<script lang="ts">
	import { onMount } from 'svelte';
	import { RandomShape } from './model';

	let wrapper: HTMLDivElement | null;

	onMount(() => {
		const rs = new RandomShape({ wrapper });
		return () => rs.clearSetup();
	});
</script>

<div class="hero">
	<svelte:element this="div" bind:this={wrapper} />
</div>
