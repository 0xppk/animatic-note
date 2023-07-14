import type { ScrollEffect } from '$lib/abstract';
import { Marquee } from '../marquee_text/model';

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

		this.setup();
		this.scrollSetup();
		this.resizeSetup();
	}

	setup() {
		if (this.sticky) {
			// append marquee
			const marqueeSection = this.makeMarquee();
			this.sticky.appendChild(marqueeSection);

			// default settings for each section
			this.children = this.sticky.querySelectorAll('section');

			this.children.forEach((section) => {
				section.style.top = '100vh';

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

	makeMarquee() {
		const newSection = document.createElement('section');
		const newDiv = document.createElement('div');
		newSection.appendChild(newDiv);
		newSection.style.borderTop = '1px solid black';
		newDiv.classList.add('marquee');

		new Marquee({
			element: newDiv,
			text: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 일편 단심일세'
		});

		return newSection;
	}

	translateSection() {
		this.children?.forEach((section, i) => {
			const phase = innerHeight - this.headerOffsetHeight,
				s = innerHeight * i - this.headerOffsetHeight * (i - 1),
				e = innerHeight * (i + 1) - this.headerOffsetHeight * i,
				contentHeight = -100 + this.headerHeight * i;

			const image = section.querySelector('figure');
			const marquee = section.querySelector('.marquee');

			if (image) image.style.height = Math.abs(contentHeight) - this.headerHeight + '%';

			if (scrollY <= s) {
				section.style.transform = `translate3d(0, 0, 0)`;
			} else if (scrollY >= e) {
				section.style.transform = `translate3d(0, ${contentHeight}% , 0)`;
			} else {
				section.style.transform = `translate3d(0, ${
					((scrollY - s) / phase) * contentHeight
				}%, 0)`;
				if (marquee) {
					(marquee as HTMLDivElement).style.scale = `${3 - ((scrollY - s) / phase) * 2}`;
				}
			}
		});
	}

	imageScaleUp() {
		this.children?.forEach((section, i) => {
			const phase = innerHeight - this.headerOffsetHeight * 2,
				s = innerHeight * i + this.headerOffsetHeight * 2 - this.headerOffsetHeight * i,
				e = innerHeight * (i + 1) - this.headerOffsetHeight * i;

			const image = section.querySelector('figure');
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
		this.children?.forEach((section, i) => {
			const phase = innerHeight - this.headerOffsetHeight,
				s = innerHeight * (i + 1) - this.headerOffsetHeight * i,
				e = innerHeight * (i + 2) - this.headerOffsetHeight * (i + 1);

			const image = section.querySelector('figure');
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
