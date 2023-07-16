<script lang="ts">
	import { piled_menu_showList as showList } from '$lib/config';
	import { onMount } from 'svelte';
	import './index.css';
	import { StepFolder } from './model';
	import { RotateText } from '$lib/components';

	let sticky: HTMLDivElement | null;

	onMount(() => {
		scrollTo({ top: 0 });
		const stepFolder = new StepFolder({ sticky });
		return () => stepFolder.clearSetup();
	});
</script>

<div class="container">
	<div bind:this={sticky} class="sticky">
		<div class="hero">
			<svelte:component this={RotateText} />
		</div>
		{#each showList as { title, src }, i (title)}
			<section>
				<h3 class="title">{title}</h3>
				<figure>
					<img {src} alt={title} />
				</figure>
			</section>
		{/each}
	</div>
</div>

<footer>
	<div>triangle</div>
	<div>maetsor</div>
	<div>julio Cortasar</div>
	<div>Juan Lulpo</div>
	<div>Nicanor Parra</div>
</footer>
