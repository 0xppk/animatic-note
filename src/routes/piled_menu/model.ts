import type { ScrollEffect } from '$lib/abstract';

type Options = {
	wrapper: HTMLDivElement | null;
	sticky: HTMLDivElement | null;
};

export class StepFolder implements ScrollEffect {
	wrapper: HTMLDivElement | null;
	sticky: HTMLDivElement | null;
	children?: NodeListOf<HTMLElement>;
	length: number;
	now: number;
	headerHeight: number;
	headerOffsetHeight: number;
	scrollHandler: () => void;
	resizeHandler: () => void;

	constructor(options: Options) {
		this.wrapper = options.wrapper;
		this.sticky = options.sticky;
		this.children = this.sticky?.querySelectorAll('section');
		this.length = this.children?.length ?? 0;

		this.headerHeight = 2;
		this.headerOffsetHeight = 0;

		// TODO: nav length 3부터 한칸씩 밀어올릴 방법 궁리하기(23.07.13)
		this.now = 0;

		this.scrollHandler = this.animate.bind(this);
		this.resizeHandler = this.setup.bind(this);

		this.setup();
		this.scrollSetup();
		this.resizeSetup();
	}

	setup() {
		if (this.wrapper) {
			this.children?.forEach((child, i) => {
				child.style.top = i === 0 ? '0vh' : '100vh';

				const title = child.querySelector('h3');
				const content = child.querySelector('p');
				const image = child.querySelector('img');

				if (title && content && image) {
					title.style.height = this.headerHeight + 'vh';
					image.style.transform = `scale(0)`;
					image.style.transformOrigin = `100% 0`;
				}
			});

			this.headerOffsetHeight = this.wrapper.querySelector('h3')!.offsetHeight;
		}
	}

	scrollSetup() {
		addEventListener('scroll', this.scrollHandler);
	}

	resizeSetup() {
		addEventListener('resize', this.resizeHandler);
	}

	clearSetup() {
		removeEventListener('scroll', this.scrollHandler);
		removeEventListener('resize', this.resizeHandler);
	}

	translateSection() {
		this.children?.forEach((child, i) => {
			if (i === 0) return;

			const phase = innerHeight - this.headerOffsetHeight;
			const s = innerHeight * i - this.headerOffsetHeight * (i - 1);
			const e = innerHeight * (i + 1) - this.headerOffsetHeight * i;
			const contentHeight = -100 + this.headerHeight * i;

			if (scrollY <= s) {
				child.style.transform = `translate3d(0, 0, 0)`;
			} else if (scrollY >= e) {
				child.style.transform = `translate3d(0, ${contentHeight}% , 0)`;
			} else {
				this.now = i;
				child.style.transform = `translate3d(0, ${
					((scrollY - s) / phase) * contentHeight
				}%, 0)`;
			}
		});
	}

	getNow(count: number) {
		if (count > 2) {
			return count - 2;
		}
		return 0;
	}

	imageScaleUp() {
		this.children?.forEach((child, i) => {
			const phase =
				i === 0
					? innerHeight - this.headerOffsetHeight
					: innerHeight - this.headerOffsetHeight * 2;
			const s =
				i === 0
					? innerHeight * i + this.headerOffsetHeight
					: innerHeight * i + this.headerOffsetHeight - this.headerOffsetHeight * (i - 1);
			const e = innerHeight * (i + 1) - this.headerOffsetHeight * i;

			const image = child.querySelector('img');
			if (!image) return;

			if (scrollY <= s) {
				image.style.transform = `scale(0)`;
			} else if (scrollY >= e) {
				image.style.transform = 'scale(1)';
			} else {
				image.style.transform = `scale(${(scrollY - s) / phase})`;
			}
		});
	}

	imageScaleDown() {
		this.children?.forEach((child, i) => {
			const phase = innerHeight - this.headerOffsetHeight;
			const s = innerHeight * (i + 1) - this.headerOffsetHeight * i;
			const e = innerHeight * (i + 2) - this.headerOffsetHeight * (i + 1);

			const image = child.querySelector('img');
			if (!image) return;

			if (scrollY <= s) {
				image.style.transformOrigin = '100% 0';
			} else if (scrollY >= e) {
				image.style.transform = 'scale(0)';
			} else {
				image.style.transform = `scale(${1 - (scrollY - s) / phase})`;
				image.style.transformOrigin = '0 0';
			}
		});
	}

	animate() {
		this.translateSection();
		this.imageScaleUp();
		this.imageScaleDown();
	}
}
