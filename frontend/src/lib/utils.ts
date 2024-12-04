import { DateFormatter } from '@internationalized/date';

export const dateFormatter = new DateFormatter('de-DE', {
	dateStyle: 'short'
});

export const longDateFormatter = new DateFormatter('de-DE', {
	dateStyle: 'long'
});
