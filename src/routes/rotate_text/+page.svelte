<script lang="ts">
	import Icons from '$lib/components/icons.svelte';
	import './index.css';
</script>

<div class="container">
	<section>
		<span>always</span>
		<div class="quote">
			<p>if you're going to do something,</p>
			<p class="center">do it to a death.</p>
			<p class="right">otherwise, don't bother starting.</p>
		</div>
	</section>
	<section>
		<span>k</span>
		<div class="stack">
			<span>ee</span>
			<Icons src="eyes" />
		</div>
		<span>p</span>
		<span>&nbsp;</span>
		<span>in</span>
		<span>&nbsp;</span>
		<span>mind : </span>
	</section>
	<section>
		<span>Never</span>
		<span>&nbsp;</span>
		<span>lo</span>
		<div class="stack">
			<span>s</span>
			<Icons src="zap" />
		</div>
		<span>e</span>
	</section>
	<section>
		<span>terr</span>
		<div class="stack">
			<span>o</span>
			<Icons src="egg" />
		</div>
		<span>r</span>
	</section>
	<section>
		<span class="circle" />
		<span>f</span>
	</section>

	<section>
		<span>s</span>
		<div class="stack">
			<span>i</span>
			<Icons src="candle" />
		</div>
		<span>len</span>
		<span>c</span>
		<span>e</span>
	</section>
</div>

<style>
	.quote {
		width: 15rem;
		position: absolute;
		top: 10%;
		right: 0%;
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
</style>
