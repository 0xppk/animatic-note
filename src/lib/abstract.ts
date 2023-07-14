export abstract class Effect {
	abstract setup(...params: any): void;
	abstract clearSetup(): void;
	abstract animate(): void;
}

export interface BaseEffect extends Effect {}

export interface ScrollEffect extends Effect {
	scrollSetup(): void;
	resizeSetup(): void;
}

export interface MarqueeEffect extends Effect {
	scrollSetup(): void;
	flow(): void;
}
