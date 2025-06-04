import { type Icon as IconType } from '@lucide/svelte';
import { type ClassValue, clsx } from 'clsx';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export function flyAndScale(
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
}

export function styleToString(style: Record<string, number | string | undefined>): string {
	return Object.keys(style).reduce((str, key) => {
		if (style[key] === undefined) return str;
		return `${str}${key}:${style[key]};`;
	}, '');
}

export type BentoGridItem = {
	id: number;
	icon: IconType;
	href: string;
	backgroundImageUrl: string;
};

export type BentoGridItems = [
	BentoGridItem,
	BentoGridItem,
	BentoGridItem,
	BentoGridItem,
	BentoGridItem,
	BentoGridItem,
	BentoGridItem,
	BentoGridItem,
	BentoGridItem
];

class CountUp {
	static countUp({
		targetNumber,
		durationMs,
		callback
	}: {
		targetNumber: number;
		durationMs: number;
		callback: (formattedNumber: string) => void; // Callback now receives a formatted string
	}): void {
		let currentNumber = 0;
		const increment = Math.ceil(targetNumber / (durationMs / 16));

		callback(this.formatNumber(currentNumber)); // Initial formatted number

		const interval = setInterval(() => {
			currentNumber += increment;

			if (currentNumber >= targetNumber) {
				currentNumber = targetNumber;
				clearInterval(interval);
			}

			callback(this.formatNumber(currentNumber)); // Formatted number in each update
		}, 16);
	}

	// Helper function to format numbers
	private static formatNumber(number: number): string {
		if (number >= 1000000) {
			return `${(number / 1000000).toFixed(1)}M`;
		} else if (number >= 1000) {
			return `${(number / 1000).toFixed(1)}k`;
		} else {
			return number.toString();
		}
	}
}

export default CountUp;
