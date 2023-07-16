import type { ScrollEffect } from '$lib/abstract';
import { MarqueeImage } from '../marquee_image/model';
import { Marquee } from '../marquee_text/model';
import { images } from '$lib/config';

type Options = {
	sticky: HTMLDivElement | null;
};

export class StepFolder implements ScrollEffect {
	sticky: HTMLDivElement | null;
	children: NodeListOf<HTMLElement> | null;
	headerHeight: number;
	headerOffsetHeight: number;
	scrollHandler: () => void;
	resizeHandler: () => void;

	constructor(options: Options) {
		this.sticky = options.sticky;
		this.children = null;

		this.headerHeight = 2;
		this.headerOffsetHeight = 0;

		// TODO: nav length 3부터 한칸씩 밀어올릴 방법 궁리하기(23.07.13)

		this.scrollHandler = this.animate.bind(this);
		this.resizeHandler = this.setup.bind(this);

		this.createMarquee();
		this.setup();
		this.scrollSetup();
		this.resizeSetup();
	}

	setup() {
		if (this.sticky) {
			this.children = this.sticky.querySelectorAll('section');

			this.children.forEach((section) => {
				const title = section.querySelector('h3');
				title?.style.setProperty('--nav-height', `${this.headerHeight}vh`);
			});

			this.headerOffsetHeight = this.sticky.querySelector('h3')!.offsetHeight;
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

	createMarquee() {
		const newSection = document.createElement('section');
		const newDiv = document.createElement('div');
		newSection.appendChild(newDiv);
		newSection.classList.add('marquee-wrapper');
		newDiv.classList.add('marquee');

		new MarqueeImage({
			element: newDiv,
			images
		});

		this.sticky?.appendChild(newSection);
	}

	translateSection() {
		this.children?.forEach((section, i) => {
			const phase = innerHeight - this.headerOffsetHeight,
				s = innerHeight * i - this.headerOffsetHeight * (i - 1),
				e = innerHeight * (i + 1) - this.headerOffsetHeight * i,
				contentHeight = -100 + this.headerHeight * i;

			const image = section.querySelector('img');
			const marquee = section.querySelector('.marquee') as HTMLDivElement;
			if (image) image.style.height = Math.abs(contentHeight) - this.headerHeight + '%';

			if (scrollY <= s) {
				section.style.transform = `translate3d(0, 0, 0)`;
			} else if (scrollY >= e) {
				section.style.transform = `translate3d(0, ${contentHeight}% , 0)`;
				if (marquee) marquee.style.scale = `1`;
			} else {
				section.style.transform = `translate3d(0, ${
					((scrollY - s) / phase) * contentHeight
				}%, 0)`;

				if (marquee) marquee.style.scale = `${3 - ((scrollY - s) / phase) * 2}`;
			}
		});
	}

	imageScaleUp() {
		this.children?.forEach((section, i) => {
			const phase = innerHeight - this.headerOffsetHeight * 2,
				s = innerHeight * i + this.headerOffsetHeight * (2 - i),
				e = innerHeight * (i + 1) - this.headerOffsetHeight * i;

			const imageWrapper = section.querySelector('figure');
			if (!imageWrapper) return;

			if (scrollY <= s) {
				imageWrapper.style.transform = `scale(0)`;
			} else if (scrollY >= e) {
				imageWrapper.style.transform = 'scale(1)';
			} else {
				imageWrapper.style.transform = `scale(${(scrollY - s) / phase})`;
			}
		});
	}

	imageScaleDown() {
		this.children?.forEach((section, i) => {
			const phase = innerHeight - this.headerOffsetHeight,
				s = innerHeight * (i + 1) - this.headerOffsetHeight * i,
				e = innerHeight * (i + 2) - this.headerOffsetHeight * (i + 1);

			const imageWrapper = section.querySelector('figure');
			if (!imageWrapper) return;

			if (scrollY <= s) {
				imageWrapper.style.transformOrigin = 'right top';
			} else if (scrollY >= e) {
				imageWrapper.style.transform = 'scale(0)';
			} else {
				imageWrapper.style.transform = `scale(${1 - (scrollY - s) / phase})`;
				imageWrapper.style.transformOrigin = 'left top';
			}
		});
	}

	animate() {
		this.translateSection();
		this.imageScaleUp();
		this.imageScaleDown();
	}
}
