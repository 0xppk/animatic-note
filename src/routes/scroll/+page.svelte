<script lang="ts">
	import { onMount } from 'svelte';
	import './index.css';
	import { Scroll } from './model';

	onMount(() => {
		const scrollEvent = new Scroll();

		const observer = new IntersectionObserver((entries) => {
			for (let i = 0; i <= entries.length - 1; i++) {
				const entry = entries[i];
				if (entry.isIntersecting) {
					document.querySelectorAll('[data-img]').forEach((img) => {
						img.classList.remove('show');
					});
					const target = entry.target as HTMLElement;
					const img = document.querySelector(`${target.dataset.imgToShow}`);
					img?.classList.add('show');
					break;
				}
			}
		});

		document.querySelectorAll('[data-img-to-show]').forEach((section) => {
			observer.observe(section);
		});
		return () => scrollEvent.clearSetup();
	});
</script>

<article>
	<div class="imgs">
		<img
			src="scroll/img-1.png"
			data-img
			id="img-1"
			alt="img-1"
			class="top-section-img show"
		/>
		<img
			src="scroll/img-2.png"
			data-img
			id="img-2"
			alt="img-2"
		/>
		<img
			src="scroll/img-3.png"
			data-img
			id="img-3"
			alt="img-3"
		/>
	</div>
	<section class="top-section full-screen-section">
		<div class="left">
			<h1>Build Better Backends</h1>
			<p>
				The only platform that gives AI the ability to autonomously build web services.
			</p>
		</div>
		<div class="right" />
	</section>
	<section class="full-screen-section first-main-section">
		<h1>Completely Visual</h1>
		<p>Never touch the command line, from provision to production.</p>
		<div data-img-to-show="#img-1" />
	</section>
	<section class="full-screen-section">
		<h1>Full Stack</h1>
		<p>
			Never manage infrastructure again. One click gets you: a database, APIs,
			deployments, hosting, etc.
		</p>
		<div data-img-to-show="#img-2" />
	</section>
	<section class="full-screen-section">
		<h1>Launch Faster</h1>
		<p>Logical can get systems to market in minutes instead of weeks.</p>
		<div data-img-to-show="#img-3" />
	</section>
</article>

<style>
</style>
