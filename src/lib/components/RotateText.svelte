<script lang="ts">
	import Icons from '$lib/components/Icons.svelte';
</script>

<div class="container_hero">
	<div class="row">
		<span>always</span>
		<div class="quote">
			<p>if you're going to do something,</p>
			<p class="center">do it to a death.</p>
			<p class="right">otherwise, don't bother starting.</p>
		</div>
	</div>
	<div class="row">
		<span>keep</span>
		<span>&nbsp;</span>
		<div class="stack">
			<Icons src="loader" />
			<span>in</span>
		</div>
		<span>&nbsp;</span>
		<span>mind :</span>
	</div>
	<div class="row">
		<span>Ne</span>
		<div class="stack">
			<span>v</span>
			<Icons src="vol" />
		</div>
		<span>er</span>
		<span>&nbsp;</span>
		<span>lo</span>
		<div class="stack">
			<span>s</span>
			<Icons src="zap" />
		</div>
		<span>e</span>
	</div>
	<div class="row">
		<span>terr</span>
		<div class="stack">
			<Icons src="egg" />
			<span>o</span>
		</div>
		<span>r</span>
	</div>
	<div class="row">
		<span class="circle" />
		<span>f</span>
	</div>

	<div class="row">
		<span>s</span>
		<div class="stack">
			<Icons src="candle" />
			<span>i</span>
		</div>
		<span>len</span>
		<span>c</span>
		<span>e</span>
	</div>
</div>

<style>
	.container_hero {
		font-size: clamp(2rem, calc(1.58rem + 6.07vw), 10rem);
		font-family: 'LINESeedKR-Bd';
		padding: 0.3em;
		line-height: 1;
		text-transform: uppercase;
		position: relative;
	}

	.row {
		display: flex;
		align-items: center;
		position: static;
	}

	.stack > span:nth-child(1),
	.stack > :global(.icon):nth-child(1) {
		animation: fadeOffBeat 1.5s ease-in 0s infinite;
	}

	.stack > span:nth-child(2),
	.stack > :global(.icon):nth-child(2) {
		animation: fade 1.5s ease-out 0s infinite;
	}

	:global(.icon) {
		padding-top: 0.2rem;
		position: absolute;
		font-size: clamp(2rem, calc(1.58rem + 6.07vw), 10rem);
	}

	.circle {
		border: clamp(0.5rem, calc(0.34rem + 0.69vw), 1.3rem) solid black; /* 0.5  1.3*/
		border-radius: 5rem;
		padding: clamp(0.8rem, calc(0.47rem + 1.39vw), 2.4rem); /* 0.8   2.4 */
		margin-top: clamp(0.05em, calc(0.07rem + -0.02vw), 0.07em); /* 0.07  0.05 */
		animation: long-O 3.5s ease-in-out 0s infinite;
	}

	.quote {
		width: 15rem;
		position: absolute;
		bottom: -20%;
		left: 5%;
		font-size: var(--fs-sm);
		font-family: 'Basis';
		line-height: 1.4;
		text-transform: lowercase;
	}
	.quote > .center {
		text-align: center;
	}
	.quote > .right {
		text-align: right;
	}

	@media (min-width: 768px) {
		.row {
			position: relative;
		}
		.quote {
			top: 10%;
			left: 50%;
			bottom: auto;
		}
	}

	@keyframes long-O {
		from {
			width: 3rem;
		}
		50% {
			width: 18rem;
		}
		70% {
			width: 18rem;
		}
		100% {
			width: 3rem;
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		33% {
			opacity: 1;
		}
		55% {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes fadeOffBeat {
		from {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
