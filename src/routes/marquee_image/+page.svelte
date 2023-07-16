<script lang="ts">
	import { onMount } from 'svelte';
	import { MarqueeImage } from './model';
	import { images } from '$lib/config';

	let marqueeImage: HTMLDivElement | null;

	onMount(() => {
		new MarqueeImage({
			element: marqueeImage,
			images
		});
	});
</script>

<div class="container">
	<div bind:this={marqueeImage} class="marquee-image" />
</div>

<style>
	.container {
		min-height: 100vh;
		display: grid;
		place-items: center;
	}

	.marquee-image {
		height: 300px;
		scale: 1;
	}
</style>
