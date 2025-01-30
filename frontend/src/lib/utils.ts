import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DateFormatter } from '@internationalized/date';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const dateFormatter = new DateFormatter('de-DE', {
	dateStyle: 'short'
});

export const longDateFormatter = new DateFormatter('de-DE', {
	dateStyle: 'long'
});
