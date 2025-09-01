import { api } from './client';
import {
    ApiResponse,
    PaginatedResponse,
    PaginationParams,
    CreateRequest,
    UpdateRequest,
    DeleteRequest
} from './types';
import { User } from '@/types/user';

// Users API
export const usersApi = {
    // Get all users with pagination
    getUsers: (params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<User>>> =>
        api.get('/public/products', { params }),

    // Get user by ID
    getUserById: (id: string): Promise<ApiResponse<User>> =>
        api.get(`/users/${id}`),

    // Create new user
    createUser: (userData: Omit<User, 'id'>): Promise<ApiResponse<User>> =>
        api.post('/users', userData),

    // Update user
    updateUser: ({ id, data }: UpdateRequest<User>): Promise<ApiResponse<User>> =>
        api.put(`/users/${id}`, data),

    // Delete user
    deleteUser: ({ id }: DeleteRequest): Promise<ApiResponse<void>> =>
        api.delete(`/users/${id}`),
};

// Products API (example)
export const productsApi = {
    getProducts: (params?: PaginationParams) =>
        api.get('/products', { params }),

    getProductById: (id: string) =>
        api.get(`/products/${id}`),

    createProduct: (productData: any) =>
        api.post('/products', productData),

    updateProduct: ({ id, data }: UpdateRequest<any>) =>
        api.put(`/products/${id}`, data),

    deleteProduct: ({ id }: DeleteRequest) =>
        api.delete(`/products/${id}`),
};

// Auth API
export const authApi = {
    login: (credentials: { email: string; password: string }) =>
        api.post('/auth/login', credentials),

    register: (userData: { name: string; email: string; password: string }) =>
        api.post('/auth/register', userData),

    logout: () =>
        api.post('/auth/logout'),

    refreshToken: () =>
        api.post('/auth/refresh'),

    getProfile: () =>
        api.get('/auth/profile'),
};

// Export all APIs
export const apiEndpoints = {
    users: usersApi,
    products: productsApi,
    auth: authApi,
};