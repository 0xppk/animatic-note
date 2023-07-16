import type { MarqueeEffect } from '$lib/abstract';

type Image = {
	title: string;
	src: string;
};

type Options = {
	element: HTMLDivElement | null;
	images: Image[];
	direction?: 1 | -1;
};

export class MarqueeImage implements MarqueeEffect {
	element: HTMLDivElement | null;
	children: NodeListOf<HTMLImageElement> | null;
	images: Image[];
	distance: number;
	velocity: number;
	direction: 1 | -1;
	rafId: number;

	constructor(options: Options) {
		this.element = options.element;
		this.images = options.images;
		this.direction = options.direction ?? -1;
		this.children = null;
		this.distance = 0;
		this.velocity = 3;
		this.rafId = 0;

		this.setup();
		this.animate();
	}

	appendTo(parentElement: HTMLElement) {
		if (this.element) parentElement.appendChild(this.element);
	}

	setup() {
		if (this.images && this.element) {
			this.element.style.display = 'flex';
			this.images.push(...this.images);
			this.images.forEach((image) => {
				const img = document.createElement('img');
				img.src = image.src;
				img.alt = image.title;
				img.style.maxWidth = '100%';
				this.element!.appendChild(img);
			});
			this.children = this.element.querySelectorAll('img')!;
			this.element.querySelector('img')!.style.height = '100%';
		}
	}

	scrollSetup() {
		// 스크롤에 따른 가속 설정 --> 일단 x
	}

	clearSetup() {
		cancelAnimationFrame(this.rafId);
	}

	flow() {
		if (!this.element) return;
		if (
			this.distance >
			(this.element.scrollWidth * Number(this.element.style.scale ?? 1)) / 2
		) {
			this.element.style.translate = '0';
			this.distance = 0;
		}

		this.distance += this.velocity;
		this.element.style.translate = `${this.distance * this.direction}px`;
	}

	animate() {
		this.flow();
		this.rafId = requestAnimationFrame(this.animate.bind(this));
	}
}
