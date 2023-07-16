import type { MarqueeEffect } from '$lib/abstract';

type Options = {
	text: string;
	element: HTMLElement;
	direction?: 1 | -1;
};

export class Marquee implements MarqueeEffect {
	element: HTMLElement;
	direction: 1 | -1;
	distance: number;
	velocity: number;
	rafId: number;
	scrollHandler: () => void;

	constructor({ text, element, direction = -1 }: Options) {
		this.element = element;
		this.direction = direction;
		this.distance = 0;
		this.velocity = 3;

		const textArray = text.split(' ');
		// for 클리너
		this.rafId = 0;
		this.scrollHandler = () => {
			this.distance += this.velocity * 2;
		};

		this.setup(textArray);
		this.scrollSetup();
		this.animate();
	}

	setup(textArray: string[]) {
		// 3배로 늘려서 무한 스크롤링 효과를 준다.
		textArray.push(...textArray, ...textArray);
		textArray.forEach((text) => {
			this.element.innerText += `${text}\u00A0\u00A0`;
		});
	}

	appendTo(parentElement: HTMLElement) {
		parentElement.appendChild(this.element);
	}

	scrollSetup() {
		addEventListener('scroll', this.scrollHandler);
	}

	clearSetup() {
		removeEventListener('scroll', this.scrollHandler);
		cancelAnimationFrame(this.rafId);
	}

	flow() {
		// 한바퀴 돌았으면 리셋하고
		if (
			this.distance >
			(this.element.scrollWidth * Number(this.element.style.scale ?? 1)) / 3
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

// 잘못된 예. bind를 사용하면 removeEventListener가 안된다. 왜냐하면 bind를 사용하면 새로운 함수를 만들기 때문이다.
// 그래서 컨스트럭터에서 this.scrollHandler를 걸어놓고 사용한다.
// @see link{https://stackoverflow.com/questions/33859113/javascript-removeeventlistener-not-working-inside-a-class}
// scrollSetup() {
// 	addEventListener('scroll', this.scrollSetup.bind(this));
// }
