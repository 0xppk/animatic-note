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
	headerHeight: number;
	contentBoxHeight: number;
	start: number;
	end: number;
	delay: number;
	scrollHandler: () => void;
	resizeHandler: () => void;

	constructor(options: Options) {
		this.wrapper = options.wrapper;
		this.sticky = options.sticky;
		this.children = this.sticky?.querySelectorAll('section');
		this.length = this.children?.length ?? 0;

		this.headerHeight = 6;
		this.contentBoxHeight = 100 - this.headerHeight * this.length; // 꽉찬화면(100) - 헤더 타이틀들의 높이

		this.start = 0;
		this.end = 0;
		this.delay = 0;

		this.scrollHandler = this.animate.bind(this);
		this.resizeHandler = this.setup.bind(this);

		this.setup();
		this.scrollSetup();
		this.resizeSetup();
	}

	setup() {
		if (this.wrapper) {
			this.start = this.wrapper.offsetTop + this.delay;
			this.end =
				this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight - this.delay;

			this.children?.forEach((child, i) => {
				child.style.bottom = -100 + this.headerHeight * (this.length - i) + 'vh';
				if (child.querySelector('h3') && child.querySelector('p')) {
					child.querySelector('h3')!.style.height = this.headerHeight + 'vh';
					child.querySelector('p')!.style.height = this.contentBoxHeight + 'vh';
				}
			});
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

	animate() {
		this.children?.forEach((child, i) => {
			const unit = (this.end - this.start) / this.length;
			const s = this.start + unit * i + this.delay;
			const e = this.start + unit * (i + 1);

			if (scrollY <= s) {
				child.style.transform = `translate3d(0, 0, 0)`;
			} else if (scrollY >= e) {
				child.style.transform = `translate3d(0, ${-this.contentBoxHeight}% , 0)`;
			} else {
				child.style.transform = `translate3d(0, ${
					((scrollY - s) / (unit - this.delay)) * -this.contentBoxHeight
				}%, 0)`;
			}
		});
	}
}
