import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError, ApiResponse } from './types';

// Base configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const TIMEOUT = 10000; // 10 seconds

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        if (process.env.NODE_ENV === 'development') {
            console.log('🚀 API Request:', {
                method: config.method?.toUpperCase(),
                url: config.url,
                data: config.data,
            });
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
            console.log('✅ API Response:', {
                status: response.status,
                url: response.config.url,
                data: response.data,
            });
        }

        return response;
    },
    (error: AxiosError) => {
        // Handle different types of errors
        const apiError = handleApiError(error);

        // Log error in development
        if (process.env.NODE_ENV === 'development') {
            console.error('❌ API Error:', apiError);
        }

        return Promise.reject(apiError);
    }
);

// Error handler function
function handleApiError(error: AxiosError): ApiError {
    if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        return {
            type: 'API_ERROR',
            message: (data as any)?.message || `Request failed with status ${status}`,
            status,
            data: data as any,
        };
    } else if (error.request) {
        // Request was made but no response received
        return {
            type: 'NETWORK_ERROR',
            message: 'Network error - please check your connection',
            status: 0,
        };
    } else {
        // Something else happened
        return {
            type: 'REQUEST_ERROR',
            message: error.message || 'An unexpected error occurred',
            status: 0,
        };
    }
}

// Generic API request wrapper
export async function apiRequest<T = any>(
    config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const response = await apiClient(config);
        return {
            success: true,
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        return {
            success: false,
            error: error as ApiError,
        };
    }
}

// HTTP method helpers
export const api = {
    get: <T = any>(url: string, config?: AxiosRequestConfig) =>
        apiRequest<T>({ method: 'GET', url, ...config }),

    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiRequest<T>({ method: 'POST', url, data, ...config }),

    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiRequest<T>({ method: 'PUT', url, data, ...config }),

    patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiRequest<T>({ method: 'PATCH', url, data, ...config }),

    delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
        apiRequest<T>({ method: 'DELETE', url, ...config }),
};

export default apiClient;