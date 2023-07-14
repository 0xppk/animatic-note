import type { BaseEffect } from '$lib/abstract';
import { random_shape_combination as combination } from '$lib/config';
import './index.css';

type Options = {
	wrapper: HTMLDivElement | null;
};

export class RandomShape implements BaseEffect {
	wrapper: HTMLDivElement | null;
	setupLength: number;
	timerId: number;

	constructor(options: Options) {
		this.wrapper = options.wrapper;
		this.setupLength = 7;
		this.timerId = 0;

		this.setup();
		this.animate();
	}

	setup() {
		if (!this.wrapper) return;

		this.wrapper.classList.add('shape-wrapper');
		this.wrapper.dataset.config = '1';
		this.wrapper.dataset.roundness = '1';

		for (let i = 0; i < this.setupLength; i++) {
			const child = document.createElement('div');
			child.classList.add('shape');

			this.wrapper.appendChild(child);
		}
	}

	clearSetup() {
		clearInterval(this.timerId);
	}

	getRanomIndex(min: number, max: number, prev: number) {
		let next = prev;
		const rand = (min: number, max: number) =>
			Math.floor(Math.random() * (max - min + 1) + min);

		while (prev === next) next = rand(min, max);

		return next;
	}

	animate() {
		let prev = 0;

		this.timerId = setInterval(() => {
			const index = this.getRanomIndex(0, combination.length - 1, prev),
				combo = combination[index];

			if (this.wrapper) {
				this.wrapper.dataset.config = combo.config.toString();
				this.wrapper.dataset.roundness = combo.roundness.toString();
			}

			prev = index;
		}, 3000);
	}
}
