<script lang="ts">
	import Icon from '@iconify/svelte';

	export let src: keyof typeof list;
	export let style: string = '';

	const list = {
		mango: 'twemoji:mango',
		eyes: 'twemoji:eyes',
		egg: 'tabler:egg-cracked',
		zap: 'prime:bolt',
		apple: 'ep:cherry',
		candle: 'noto-v1:candle',
		vol: 'ph:heart-break-duotone',
		bomb: 'noto:bomb',
		loader: 'eva:loader-outline'
	};
</script>

<svelte:component this={Icon} icon={list[src]} class="icon" {style} />
