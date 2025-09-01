import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, ApiError } from '@/lib/api/types';

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: ApiError | null;
}

interface UseApiOptions {
    immediate?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: ApiError) => void;
}

export function useApi<T = any>(
    apiFunction: () => Promise<ApiResponse<T>>,
    options: UseApiOptions = {}
) {
    const { immediate = false, onSuccess, onError } = options;

    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const response = await apiFunction();

            if (response.success && response.data) {
                setState({
                    data: response.data,
                    loading: false,
                    error: null,
                });
                onSuccess?.(response.data);
            } else {
                const error = response.error || {
                    type: 'API_ERROR' as const,
                    message: 'Unknown error occurred',
                    status: 0,
                };
                setState({
                    data: null,
                    loading: false,
                    error,
                });
                onError?.(error);
            }
        } catch (err) {
            const error: ApiError = {
                type: 'REQUEST_ERROR',
                message: err instanceof Error ? err.message : 'Unknown error occurred',
                status: 0,
            };
            setState({
                data: null,
                loading: false,
                error,
            });
            onError?.(error);
        }
    }, [apiFunction, onSuccess, onError]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    const reset = useCallback(() => {
        setState({
            data: null,
            loading: false,
            error: null,
        });
    }, []);

    return {
        ...state,
        execute,
        reset,
        refetch: execute,
    };
}