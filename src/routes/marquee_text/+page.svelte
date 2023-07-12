<script lang="ts">
	import { onMount } from 'svelte';
	import './index.css';
	import { Marquee } from './model';

	let marqueeP1: HTMLParagraphElement | null;
	let marqueeP2: HTMLParagraphElement | null;

	let marquee1: Marquee;
	let marquee2: Marquee;

	onMount(() => {
		if (marqueeP1 && marqueeP2) {
			marquee1 = new Marquee({
				text: '기다려봐 가고 있는 중이야 이거 메시지가 좀 더 길어야지 초기화',
				element: marqueeP1
			});

			marquee2 = new Marquee({
				text: '기다려봐 가고 있는 중이야 이거 메시지가 좀 더 길어야지 초기화',
				element: marqueeP2,
				direction: 1
			});
		}

		return () => {
			marquee1.clearSetup();
			marquee2.clearSetup();
		};
	});
</script>

<div class="container">
	<div class="wrapper">
		<p bind:this={marqueeP1} />
	</div>

	<div class="wrapper">
		<p class="t" bind:this={marqueeP2} />
	</div>
</div>
