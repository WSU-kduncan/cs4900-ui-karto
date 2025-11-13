import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retryWhen, mergeMap, take } from 'rxjs/operators';

export interface RetryConfig {
    maxRetries: number;
    retryDelay: number;
    backoffMultiplier: number;
    retryableStatusCodes: number[];
}

export function retryInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> {
    const defaultConfig: RetryConfig = {
        maxRetries: 3,
        retryDelay: 1000,
        backoffMultiplier: 2,
        retryableStatusCodes: [408, 429, 500, 502, 503, 504]
    };

    return next(request).pipe(
        retryWhen(errors =>
            errors.pipe(
                mergeMap((error: HttpErrorResponse, index: number) => {
                    const config = getRetryConfig(request, defaultConfig);

                    // Don't retry if we've exceeded max retries
                    if (index >= config.maxRetries) {
                        return throwError(() => error);
                    }

                    // Don't retry if the error status code is not retryable
                    if (!config.retryableStatusCodes.includes(error.status)) {
                        return throwError(() => error);
                    }

                    // Don't retry for certain HTTP methods
                    if (shouldNotRetry(request.method)) {
                        return throwError(() => error);
                    }

                    // Calculate delay with exponential backoff
                    const delayTime = config.retryDelay * Math.pow(config.backoffMultiplier, index);

                    console.log(`Retrying request (attempt ${index + 1}/${config.maxRetries + 1}) after ${delayTime}ms`);

                    return timer(delayTime);
                }),
                take(defaultConfig.maxRetries + 1)
            )
        )
    );
}

/**
 * Get retry configuration for the request
 */
function getRetryConfig(request: HttpRequest<unknown>, defaultConfig: RetryConfig): RetryConfig {
    // Check for custom retry headers
    const maxRetries = request.headers.get('X-Max-Retries');
    const retryDelay = request.headers.get('X-Retry-Delay');

    return {
        maxRetries: maxRetries ? parseInt(maxRetries, 10) : defaultConfig.maxRetries,
        retryDelay: retryDelay ? parseInt(retryDelay, 10) : defaultConfig.retryDelay,
        backoffMultiplier: defaultConfig.backoffMultiplier,
        retryableStatusCodes: defaultConfig.retryableStatusCodes
    };
}

/**
 * Determine if a request should not be retried based on HTTP method
 */
function shouldNotRetry(method: string): boolean {
    // Generally, we don't want to retry POST, PUT, PATCH, DELETE requests
    // as they might have side effects
    const nonRetryableMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    return nonRetryableMethods.includes(method.toUpperCase());
}