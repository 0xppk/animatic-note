<script lang="ts">
	import './index.css';
	import { onMount } from 'svelte';
	import { StepFolder } from './model';

	let wrapper: HTMLDivElement | null;
	let sticky: HTMLDivElement | null;

	onMount(() => {
		const stepFolder = new StepFolder({ wrapper, sticky });
		return () => stepFolder.clearSetup();
	});

	const showList = [
		{ title: '안녕하세요', content: '안녕하세요' },
		{ title: '어서오세요', content: '안녕하세요' },
		{ title: '반가워요', content: '안녕하세요' },
		{ title: '배고파요', content: '안녕하세요' }
	];
</script>

<div style:height={'100vh'} />
<div bind:this={wrapper} class="container">
	<div bind:this={sticky} class="sticky">
		{#each showList as { title, content }, i (title)}
			<section>
				<h3>{title}</h3>
				<p class="content">{content}</p>
			</section>
		{/each}
	</div>
</div>
