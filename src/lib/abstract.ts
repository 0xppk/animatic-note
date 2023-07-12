abstract class BaseEffect {
	abstract setup(...params: any): void;
	abstract clearSetup(): void;
	abstract animate(): void;
}

export interface ScrollEffect extends BaseEffect {
	scrollSetup(): void;
	resizeSetup(): void;
}

export interface MarqueeEffect extends BaseEffect {
	scrollSetup(): void;
	flow(): void;
}
