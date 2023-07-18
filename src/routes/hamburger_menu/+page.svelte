<script lang="ts">
	let buttonThree: HTMLButtonElement;

	function clickOutside(e: MouseEvent) {
		// 타겟이 버튼이거나 버튼에 포함된 자식이면 리턴
		if (e.target === buttonThree || buttonThree.contains(e.target as Node)) return;
		buttonThree.setAttribute('aria-expanded', 'false');
	}

	function onClick() {
		const isOpen = buttonThree.getAttribute('aria-expanded');
		if (isOpen === 'false') buttonThree.setAttribute('aria-expanded', 'true');
		else buttonThree.setAttribute('aria-expanded', 'false');
	}
</script>

<svelte:window on:click={(e) => clickOutside(e)} />

<div class="examples">
	<button
		class="button-one"
		aria-controls="primary-navigation"
		aria-expanded="false"
	>
		<svg
			class="hamburger"
			fill="currentColor"
			viewBox="0 0 100 100"
			width="250"
		>
			<rect
				class="line top"
				width="80"
				height="10"
				x="10"
				y="25"
				rx="5"
			/>
			<rect
				class="line middle"
				width="80"
				height="10"
				x="10"
				y="45"
				rx="5"
			/>
			<rect
				class="line bottom"
				width="80"
				height="10"
				x="10"
				y="65"
				rx="5"
			/>
		</svg>
	</button>

	<button
		bind:this={buttonThree}
		on:click={onClick}
		class="button-three"
		aria-controls="primary-navigation"
		aria-expanded="false"
	>
		<svg
			class="hamburger"
			stroke="currentColor"
			fill="none"
			viewBox="-10 -10 120 120"
			width="250"
		>
			<path
				class="line"
				stroke-width="10"
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
			/>
		</svg>
	</button>
</div>

<style>
	.button-three {
		color: black;
	}

	.button-three .line {
		transition: 1s;
		stroke-dasharray: 60 31.5 60 300;
	}
	:global(.button-three[aria-expanded='true']) .hamburger {
		transition: translate 1s, rotate 1s;
	}
	:global(.button-three[aria-expanded='true']) .line {
		stroke-dasharray: 60 105 60 300;
		stroke-dashoffset: -90;
	}
	:global(.button-three[aria-expanded='true']) .hamburger {
		translate: 10px -10px;
		rotate: 0.125turn;
	}

	.examples {
		padding: 3rem;
		display: flex;
		gap: clamp(2rem, 8vw, 4rem);
		max-width: 1200px;
	}

	button {
		background: transparent;
		border-radius: 6rem;
		border: 10px solid var(--border-color, black);
		padding: 0;
	}

	.button-one .line {
		transition: y 300ms ease-in 300ms, rotate 300ms ease-in, opacity 0ms 300ms;
		transform-origin: center;
	}

	.button-one:hover .line {
		transition: y 300ms ease-in, rotate 300ms ease-in 300ms, opacity 0ms 300ms;
	}

	.button-one:hover :is(.top, .bottom) {
		y: 45;
	}

	.button-one:hover .top {
		rotate: 45deg;
	}
	.button-one:hover .middle {
		opacity: 0;
	}
	.button-one:hover .bottom {
		rotate: -45deg;
	}

	.button-one {
		--border-color: blue;
		color: red;
	}

	@keyframes to-close-icon {
		from {
			stroke-dashoffset: 0;
		}
		40% {
			stroke-dashoffset: 79.9;
		}
		60% {
			stroke-dashoffset: 79.9;
			rotate: var(--rotation);
		}
		to {
			stroke-dashoffset: 0;
			rotate: var(--rotation);
		}
	}
	@keyframes to-open-icon {
		from {
			stroke-dashoffset: 79.9;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
