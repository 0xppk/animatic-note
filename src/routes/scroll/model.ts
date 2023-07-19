import type { ScrollEffect } from '$lib/abstract';

export class Scroll implements ScrollEffect {
	handler: () => void;

	constructor() {
		this.handler = this.setup.bind(this);

		this.setup();
		this.scrollSetup();
		this.resizeSetup();
	}

	setup() {
		const htmlElement = document.documentElement,
			scrolled = htmlElement.scrollTop / htmlElement.clientHeight;

		htmlElement.style.setProperty('--scroll', `${Math.min(scrolled * 100, 100)}`);
	}

	scrollSetup() {
		addEventListener('scroll', this.handler);
	}

	resizeSetup() {
		addEventListener('resize', this.handler);
	}

	clearSetup(): void {
		removeEventListener('scroll', this.handler);
		removeEventListener('resize', this.handler);
	}
	animate(): void {}
}
