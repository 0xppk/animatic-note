<script lang="ts">
	import './index.css';
	import { onMount } from 'svelte';
	import { StepFolder } from './model';
	import { piled_menu_showList as showList } from '$lib/config';

	let wrapper: HTMLDivElement | null;
	let sticky: HTMLDivElement | null;

	onMount(() => {
		const stepFolder = new StepFolder({ sticky });
		return () => stepFolder.clearSetup();
	});
</script>

<div bind:this={wrapper} class="container">
	<div bind:this={sticky} class="sticky">
		<div class="hero" />
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
