import type { ScrollEffect } from '$lib/abstract';

type Options = {
	wrapper: HTMLDivElement | null;
	sticky: HTMLDivElement | null;
};

export class CardFlipOnScroll implements ScrollEffect {
	wrapper: HTMLDivElement | null;
	sticky: HTMLDivElement | null;
	cards?: NodeListOf<HTMLDivElement>;
	length: number;
	start: number;
	end: number;
	step: number;
	scrollHandler: () => void;
	resizeHandler: () => void;

	constructor(options: Options) {
		this.wrapper = options.wrapper;
		this.sticky = options.sticky;

		this.cards = this.sticky?.querySelectorAll('.card');
		this.length = this.cards?.length ?? 0;

		this.start = 0;
		this.end = 0;
		this.step = 0;

		this.scrollHandler = this.animate.bind(this);
		this.resizeHandler = this.setup.bind(this);

		this.setup();
		this.resizeSetup();
		this.scrollSetup();
	}

	setup() {
		if (this.wrapper) {
			this.start = this.wrapper.offsetTop - 100;
			this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight * 1.2;
			this.step = (this.end - this.start) / (this.length * 2);
		}
	} // init end

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
		this.cards?.forEach((card, i) => {
			const s = this.start + this.step * i;
			const e = s + this.step * (this.length + 1);

			if (scrollY <= s) {
				card.style.transform = `
            perspective(100vw)
            translateX(100vw)
            rotateY(180deg)
          `;
			} else if (scrollY > s && scrollY <= e - this.step) {
				card.style.transform = `
                perspective(100vw)
                translateX(${100 - ((scrollY - s) / (e - s)) * 100}vw)
                rotateY(180deg)
              `;
			} else if (scrollY > e - this.step && scrollY <= e) {
				card.style.transform = `
                perspective(100vw)
                translateX(${100 - ((scrollY - s) / (e - s)) * 100}vw)
                rotateY(${180 - ((scrollY - (e - this.step)) / this.step) * 180}deg)
              `;
			} else if (scrollY > e) {
				card.style.transform = `
                perspective(100vw)
                translateX(0vw) 
                rotateY(0deg)
              `;
			}
		});
	} // animate end
}
