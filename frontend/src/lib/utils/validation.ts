/**
 * Data validation utilities for CMS sections
 */

export interface ValidationError {
	field: string;
	message: string;
	severity: 'error' | 'warning';
}

export interface ValidationResult {
	isValid: boolean;
	errors: ValidationError[];
	warnings: ValidationError[];
}

/**
 * Helper to check for a valid URL within a CMS image object (Strapi v3/v4)
 */
function hasImageUrl(image: any): boolean {
	if (!image || typeof image !== 'object') return false;
	// Check for Strapi v4 structure first
	const attributes = image.data?.attributes;
	if (attributes) {
		return typeof attributes.url === 'string' && attributes.url.length > 0;
	}
	// Fallback to Strapi v3 structure
	return typeof image.url === 'string' && image.url.length > 0;
}

/**
 * Creates a validation error
 */
export function createError(field: string, message: string): ValidationError {
	return { field, message, severity: 'error' };
}

/**
 * Creates a validation warning
 */
export function createWarning(field: string, message: string): ValidationError {
	return { field, message, severity: 'warning' };
}

/**
 * Validates that a field exists and is not null/undefined
 */
export function validateRequired(
	data: any,
	field: string,
	friendlyName?: string
): ValidationError | null {
	const value = data?.[field];
	if (value === null || value === undefined) {
		return createError(field, `${friendlyName || field} is required but missing`);
	}
	return null;
}

/**
 * Validates that an array field exists and has items
 */
export function validateArrayNotEmpty(
	data: any,
	field: string,
	friendlyName?: string
): ValidationError | null {
	const value = data?.[field];
	if (!Array.isArray(value)) {
		return createError(field, `${friendlyName || field} should be an array but is ${typeof value}`);
	}
	if (value.length === 0) {
		return createWarning(field, `${friendlyName || field} is empty`);
	}
	return null;
}

/**
 * Validates that a string field is not empty
 */
export function validateStringNotEmpty(
	data: any,
	field: string,
	friendlyName?: string
): ValidationError | null {
	const value = data?.[field];
	if (typeof value !== 'string') {
		return createError(field, `${friendlyName || field} should be a string but is ${typeof value}`);
	}
	if (value.trim().length === 0) {
		return createWarning(field, `${friendlyName || field} is empty`);
	}
	return null;
}

/**
 * Validates image data structure
 */
export function validateImage(
	data: any,
	field: string,
	friendlyName?: string
): ValidationError | null {
	const image = data?.[field];
	if (!image) {
		return createError(field, `${friendlyName || field} image is missing`);
	}
	if (!hasImageUrl(image)) {
		return createError(field, `${friendlyName || field} image URL is missing`);
	}
	return null;
}

/**
 * Validates an array of images
 */
export function validateImages(data: any, field: string, friendlyName?: string): ValidationError[] {
	const errors: ValidationError[] = [];
	const images = data?.[field];

	if (!Array.isArray(images)) {
		errors.push(
			createError(field, `${friendlyName || field} should be an array but is ${typeof images}`)
		);
		return errors;
	}

	if (images.length === 0) {
		errors.push(createWarning(field, `${friendlyName || field} array is empty`));
		return errors;
	}

	images.forEach((image, index) => {
		if (!image) {
			errors.push(createError(`${field}[${index}]`, `Image at index ${index} is null/undefined`));
		} else if (!hasImageUrl(image)) {
			errors.push(createError(`${field}[${index}]`, `Image at index ${index} is missing URL`));
		}
	});

	return errors;
}

/**
 * Validates button/link data
 */
export function validateButton(button: any, index?: number): ValidationError[] {
	const errors: ValidationError[] = [];
	const prefix = index !== undefined ? `button[${index}]` : 'button';

	if (!button) {
		errors.push(createError(prefix, 'Button data is missing'));
		return errors;
	}

	if (!button.label || typeof button.label !== 'string' || button.label.trim().length === 0) {
		errors.push(createError(`${prefix}.label`, 'Button label is missing or empty'));
	}

	if (
		!button.redirectSlug ||
		typeof button.redirectSlug !== 'string' ||
		button.redirectSlug.trim().length === 0
	) {
		errors.push(createError(`${prefix}.redirectSlug`, 'Button redirect slug is missing or empty'));
	}

	return errors;
}

/**
 * Comprehensive section data validator
 */
export class SectionValidator {
	private errors: ValidationError[] = [];
	private warnings: ValidationError[] = [];

	constructor(
		private sectionKey: string,
		private data: any
	) {}

	addError(field: string, message: string): this {
		this.errors.push(createError(field, message));
		return this;
	}

	addWarning(field: string, message: string): this {
		this.warnings.push(createWarning(field, message));
		return this;
	}

	required(field: string, friendlyName?: string): this {
		const error = validateRequired(this.data, field, friendlyName);
		if (error) this.errors.push(error);
		return this;
	}

	arrayNotEmpty(field: string, friendlyName?: string): this {
		const error = validateArrayNotEmpty(this.data, field, friendlyName);
		if (error) {
			if (error.severity === 'error') this.errors.push(error);
			else this.warnings.push(error);
		}
		return this;
	}

	stringNotEmpty(field: string, friendlyName?: string): this {
		const error = validateStringNotEmpty(this.data, field, friendlyName);
		if (error) {
			if (error.severity === 'error') this.errors.push(error);
			else this.warnings.push(error);
		}
		return this;
	}

	image(field: string, friendlyName?: string): this {
		const error = validateImage(this.data, field, friendlyName);
		if (error) this.errors.push(error);
		return this;
	}

	images(field: string, friendlyName?: string): this {
		const errors = validateImages(this.data, field, friendlyName);
		errors.forEach((error) => {
			if (error.severity === 'error') this.errors.push(error);
			else this.warnings.push(error);
		});
		return this;
	}

	buttons(field: string, friendlyName?: string): this {
		const buttons = this.data?.[field];
		if (!Array.isArray(buttons)) {
			this.errors.push(
				createError(field, `${friendlyName || field} should be an array but is ${typeof buttons}`)
			);
			return this;
		}
		if (buttons.length === 0) {
			this.warnings.push(createWarning(field, `${friendlyName || field} array is empty`));
			return this;
		}
		buttons.forEach((button, index) => {
			const buttonErrors = validateButton(button, index);
			buttonErrors.forEach((error) => {
				error.field = `${field}.${error.field}`;
				this.errors.push(error);
			});
		});
		return this;
	}

	custom(validator: (data: any) => ValidationError[]): this {
		const errors = validator(this.data);
		errors.forEach((error) => {
			if (error.severity === 'error') this.errors.push(error);
			else this.warnings.push(error);
		});
		return this;
	}

	getResult(): ValidationResult {
		return {
			isValid: this.errors.length === 0,
			errors: this.errors,
			warnings: this.warnings
		};
	}

	getErrorMessage(): string {
		if (this.errors.length === 0) return '';
		const errorMessages = this.errors.map((e) => `${e.field}: ${e.message}`);
		return `Section "${this.sectionKey}" has ${
			this.errors.length
		} error(s): ${errorMessages.join('; ')}`;
	}

	getWarningMessage(): string {
		if (this.warnings.length === 0) return '';
		const warningMessages = this.warnings.map((w) => `${w.field}: ${w.message}`);
		return `Section "${this.sectionKey}" has ${
			this.warnings.length
		} warning(s): ${warningMessages.join('; ')}`;
	}
}

/**
 * Safe data access with fallbacks for unpredictable CMS data.
 */
export class SafeData {
	constructor(private data: any) {}

	getString(field: string, fallback: string = ''): string {
		const value = this.data?.[field];
		return typeof value === 'string' ? value : fallback;
	}

	getNumber(field: string, fallback: number = 0): number {
		const value = this.data?.[field];

		if (typeof value === 'number' && !isNaN(value)) {
			return value;
		}

		if (typeof value === 'string') {
			const parsed = parseFloat(value);
			if (!isNaN(parsed)) {
				return parsed;
			}
		}

		return fallback;
	}

	getBoolean(field: string, fallback: boolean = false): boolean {
		const value = this.data?.[field];
		return typeof value === 'boolean' ? value : fallback;
	}

	getArray<T>(field: string, fallback: T[] = []): T[] {
		const value = this.data?.[field];
		return Array.isArray(value) ? value : fallback;
	}

	/**
	 * IMPROVEMENT: Enhanced to handle nested Strapi v4 data and prioritize
	 * larger image formats automatically.
	 */
	getImageUrl(field: string = '', fallback: string = ''): string {
		// If a field is passed, get the object from that field.
		// Otherwise, assume `this.data` is the image object itself.
		let image: any = field ? this.data?.[field] : this.data;
		if (!image) return fallback;

		// Handle Strapi v4 data nesting
		if (image.data?.attributes) {
			image = image.data.attributes;
		}

		if (!image || typeof image !== 'object') return fallback;

		// Prioritize larger formats, then fall back to main URL
		const formats = image.formats;
		if (formats) {
			if (formats.large?.url) return formats.large.url;
			if (formats.medium?.url) return formats.medium.url;
			if (formats.small?.url) return formats.small.url;
		}

		return typeof image.url === 'string' ? image.url : fallback;
	}

	getObject<T>(field: string, fallback: T | null = null): T | null {
		const value = this.data?.[field];
		return value && typeof value === 'object' ? value : fallback;
	}

	has(field: string): boolean {
		const value = this.data?.[field];
		return value !== null && value !== undefined;
	}

	hasItems(field: string): boolean {
		const value = this.data?.[field];
		return Array.isArray(value) && value.length > 0;
	}
}
