<script lang="ts">
	import { onMount } from 'svelte';
	import './index.css';
	import { CardFlipOnScroll } from './model';

	let sticky_wrapper: HTMLDivElement | null;
	let sticky_content: HTMLDivElement | null;

	onMount(() => {
		const flipCard = new CardFlipOnScroll({ wrapper: sticky_wrapper, sticky: sticky_content });

		return () => flipCard.clearSetup();
	});
</script>

<div class="start-screen">
	<h1>SCROLL DOWN</h1>
</div>
<div bind:this={sticky_wrapper} class="sticky-wrapper">
	<div bind:this={sticky_content} class="sticky">
		<div class="sticky-bg">MY LIFE GOALS</div>
		<div class="card-frame">
			<div class="card">
				<div class="front">abc</div>
				<div class="back">하이1</div>
			</div>
			<div class="card">
				<div class="front">ㄱㄴㄷ</div>
				<div class="back">하이2</div>
			</div>
			<div class="card">
				<div class="front">123</div>
				<div class="back">하이3</div>
			</div>
			<div class="card">
				<div class="front">가나다</div>
				<div class="back">하이4</div>
			</div>
		</div>
	</div>
</div>
<div class="end-screen" />
