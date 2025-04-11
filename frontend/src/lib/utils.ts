import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DateFormatter } from '@internationalized/date';
import type { SvelteComponent } from 'svelte';
import { Icons } from './assets/icons';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const dateFormatter = new DateFormatter('de-DE', {
	dateStyle: 'short'
});

export const longDateFormatter = new DateFormatter('de-DE', {
	dateStyle: 'long'
});

// Helper function to get the correct icon for each language
export function getIconComponent(code: string): typeof SvelteComponent {
	if (!code) {
		return Icons['spinner'] as typeof SvelteComponent;
	}
	const iconKey = code.split('-').join('') as keyof typeof Icons;
	return Icons[iconKey] as typeof SvelteComponent;
}
export function clickOutside(node: HTMLElement, callback: () => void) {
	function handleClick(event: MouseEvent) {
		if (node && !node.contains(event.target as Node)) {
			callback();
		}
	}

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
}
