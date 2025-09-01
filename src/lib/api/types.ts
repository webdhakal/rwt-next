// API Error types
export interface ApiError {
    type: 'API_ERROR' | 'NETWORK_ERROR' | 'REQUEST_ERROR';
    message: string;
    status: number;
    data?: any;
}

// API Response wrapper
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: ApiError;
    status?: number;
}

// Pagination types
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Common API request types
export interface CreateRequest<T> {
    data: T;
}

export interface UpdateRequest<T> {
    id: string | number;
    data: Partial<T>;
}

export interface DeleteRequest {
    id: string | number;
}

// Query parameters
export interface QueryParams {
    [key: string]: string | number | boolean | undefined;
}