import { ApiError } from '@/lib/api/types';

export function isNetworkError(error: ApiError): boolean {
    return error.type === 'NETWORK_ERROR' || error.status === 0;
}

export function isAuthError(error: ApiError): boolean {
    return error.status === 401 || error.status === 403;
}

export function isServerError(error: ApiError): boolean {
    return error.status >= 500;
}

export function isClientError(error: ApiError): boolean {
    return error.status >= 400 && error.status < 500;
}

export function getErrorMessage(error: ApiError): string {
    if (isNetworkError(error)) {
        return 'Please check your internet connection and try again.';
    }

    if (isAuthError(error)) {
        return 'You are not authorized to perform this action.';
    }

    if (isServerError(error)) {
        return 'Server error. Please try again later.';
    }

    return error.message || 'An unexpected error occurred.';
}

export function shouldRetry(error: ApiError): boolean {
    // Retry on network errors and server errors, but not on client errors
    return isNetworkError(error) || isServerError(error);
}

export class AppError extends Error {
    public readonly type: string;
    public readonly status?: number;

    constructor(message: string, type: string = 'APP_ERROR', status?: number) {
        super(message);
        this.name = 'AppError';
        this.type = type;
        this.status = status;
    }
}