<script lang="ts">
	import Icon from '@iconify/svelte';

	export let src: keyof typeof list;
	export let style: string = '';

	const list = {
		mango: 'twemoji:mango',
		kimchi: 'twemoji:victory-hand-medium-light-skin-tone',
		eyes: 'twemoji:eyes',
		egg: 'tabler:egg-cracked',
		zap: 'prime:bolt',
		moon: 'mdi:moon-waning-crescent',
		pac: 'iconoir:pacman',
		vic: 'fluent-emoji:victory-hand-light',
		peach: 'twemoji:peach',
		candle: 'noto-v1:candle',
		tongue: 'emojione:tongue'
	};
</script>

<svelte:component this={Icon} icon={list[src]} class="icon" {style} />
