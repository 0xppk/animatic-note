<script lang="ts">
	import './index.css';
	import { onMount } from 'svelte';
	import { StepFolder } from './model';
	import { Marquee } from '../marquee_text/model';

	let wrapper: HTMLDivElement | null;
	let sticky: HTMLDivElement | null;
	let marquee: HTMLParagraphElement | null;

	onMount(() => {
		const stepFolder = new StepFolder({ wrapper, sticky });
		new Marquee({
			text: '기다려봐 가고 있는 중이야 이거 메시지가 좀 더 길어야지 초기화',
			element: marquee!
		});
		return () => stepFolder.clearSetup();
	});

	const showList = [
		{ title: 'world', src: 'image.png' },
		{ title: 'scenario', src: 'image.png' },
		{ title: 'portfolio', src: 'image.png' },
		{ title: 'crayon', src: 'image.png' },
		{ title: 'project', src: 'image.png' }
	];
</script>

<div style:height={'100vh'} />
<div bind:this={wrapper} class="container">
	<div bind:this={sticky} class="sticky">
		{#each showList as { title, src }, i (title)}
			<section>
				<h3 class="title">{title}</h3>
				<p class="image">
					<img {src} alt={title} />
				</p>
			</section>
		{/each}
	</div>
	<!-- <p bind:this={marquee} class="marquee" /> -->
</div>

<footer>
	<div>triangle</div>
	<div>maetsor</div>
	<div>creator</div>
	<div>bolano</div>
	<div>borges</div>
	<div>sylvina ocampo</div>
	<div>julio Cortasar</div>
	<div>Juan Lulpo</div>
	<div>Nicanor Parra</div>
</footer>
<!-- <div style:height={'10vh'} /> -->
