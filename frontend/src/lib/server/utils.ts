import { BACKEND_API_TOKEN } from '$env/static/private';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { error } from '@sveltejs/kit';

// Simple in-memory cache for CMS data (5 minute TTL)
const cmsCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = import.meta.env.DEV ? 0 : 5 * 60 * 1000; // 5 minutes

export function getRequestHeaders(): Record<string, string> {
	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${BACKEND_API_TOKEN}`
	};
}

export interface CMSError {
	code: string;
	message: string;
	details?: unknown;
	statusCode?: number;
}

export class CMSFetchError extends Error {
	public readonly code: string;
	public readonly statusCode: number;
	public readonly details?: unknown;

	constructor(message: string, code: string, statusCode: number, details?: unknown) {
		super(message);
		this.name = 'CMSFetchError';
		this.code = code;
		this.statusCode = statusCode;
		this.details = details;
	}
}

/**
 * Retry configuration for CMS requests
 */
interface RetryConfig {
	maxRetries: number;
	baseDelay: number;
	maxDelay: number;
	retryCondition?: (error: CMSFetchError) => boolean;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
	maxRetries: 1, // Reduced from 3 to 1 for faster failures
	baseDelay: 500, // Reduced from 1000ms to 500ms
	maxDelay: 2000, // Reduced from 10000ms to 2000ms
	retryCondition: (error) => error.statusCode >= 500 || error.statusCode === 429
};

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Calculate exponential backoff delay with jitter
 */
function calculateDelay(attempt: number, config: RetryConfig): number {
	const exponentialDelay = config.baseDelay * Math.pow(2, attempt);
	const jitter = Math.random() * 0.1 * exponentialDelay;
	return Math.min(exponentialDelay + jitter, config.maxDelay);
}

/**
 * Enhanced CMS data fetching with comprehensive error handling and retry logic
 */
export const loadCMSData = async <T>(
	apiSlug: string,
	lang: string,
	apiParams?: string,
	retryConfig: Partial<RetryConfig> = {}
): Promise<AttributesOf<T>> => {
	const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
	const url = `${PUBLIC_BACKEND_URL}/api/${apiSlug}?${apiParams || 'populate=*'}&locale=${lang}`;

	// Check cache first
	const cacheKey = `${apiSlug}:${lang}:${apiParams || 'populate=*'}`;
	const cached = cmsCache.get(cacheKey);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return cached.data;
	}

	let lastError: CMSFetchError | null = null;

	for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000); // Reduced from 30s to 10s timeout

			const res = await fetch(url, {
				method: 'GET',
				headers: getRequestHeaders(),
				signal: controller.signal
			});

			clearTimeout(timeoutId);

			if (!res.ok) {
				let errorDetails: unknown;
				try {
					errorDetails = await res.json();
				} catch {
					errorDetails = await res.text();
				}

				const cmsError = new CMSFetchError(
					`HTTP ${res.status}: Failed to fetch CMS data for "${apiSlug}"`,
					'HTTP_ERROR',
					res.status,
					errorDetails
				);

				// Don't retry client errors (4xx) except 429 (rate limit)
				if (res.status >= 400 && res.status < 500 && res.status !== 429) {
					console.error(`CMS fetch failed (non-retryable):`, {
						apiSlug,
						lang,
						status: res.status,
						error: errorDetails
					});
					throw cmsError;
				}

				lastError = cmsError;
			} else {
				const response = await res.json();

				if (!response.data) {
					throw new CMSFetchError(
						`Invalid CMS response format for "${apiSlug}": missing data field`,
						'INVALID_RESPONSE',
						200,
						response
					);
				}

				// Cache the successful response
				cmsCache.set(cacheKey, { data: response.data, timestamp: Date.now() });
				return response.data;
			}
		} catch (err) {
			if (err instanceof CMSFetchError) {
				lastError = err;
			} else if (err instanceof Error) {
				if (err.name === 'AbortError') {
					lastError = new CMSFetchError(`Request timeout for "${apiSlug}"`, 'TIMEOUT', 408);
				} else {
					lastError = new CMSFetchError(
						`Network error fetching "${apiSlug}": ${err.message}`,
						'NETWORK_ERROR',
						0,
						err
					);
				}
			} else {
				lastError = new CMSFetchError(
					`Unknown error fetching "${apiSlug}"`,
					'UNKNOWN_ERROR',
					0,
					err
				);
			}
		}

		// Check if we should retry
		if (attempt < config.maxRetries && lastError && config.retryCondition?.(lastError)) {
			const delay = calculateDelay(attempt, config);
			console.warn(
				`CMS fetch attempt ${attempt + 1} failed for "${apiSlug}", retrying in ${delay}ms:`,
				{
					error: lastError.message,
					code: lastError.code,
					statusCode: lastError.statusCode
				}
			);
			await sleep(delay);
		}
	}

	// All retries exhausted
	if (lastError) {
		console.error(`CMS fetch failed after ${config.maxRetries + 1} attempts:`, {
			apiSlug,
			lang,
			error: lastError.message,
			code: lastError.code,
			statusCode: lastError.statusCode,
			details: lastError.details
		});

		// Convert to SvelteKit error
		error(lastError.statusCode || 500, `Failed to load content: ${lastError.message}`);
	}

	// This should never happen, but TypeScript needs it
	error(500, `Unexpected error loading CMS data for "${apiSlug}"`);
};

/**
 * Safe CMS data loading that returns null on error instead of throwing
 */
export const loadCMSDataSafe = async <T>(
	apiSlug: string,
	lang: string,
	apiParams?: string,
	retryConfig: Partial<RetryConfig> = {}
): Promise<AttributesOf<T> | null> => {
	try {
		return await loadCMSData<T>(apiSlug, lang, apiParams, retryConfig);
	} catch (err) {
		console.error(`Safe CMS fetch failed for "${apiSlug}":`, err);
		return null;
	}
};
