import { useApi } from './useApi';
import { usersApi } from '@/lib/api/endpoints';
import { User } from '@/types/user';
import { PaginatedResponse, PaginationParams } from '@/lib/api/types';

export function useUsers(params?: PaginationParams) {
    return useApi<PaginatedResponse<User>>(
        () => usersApi.getUsers(params),
        { immediate: true }
    );
}

export function useUser(id: string) {
    return useApi<User>(
        () => usersApi.getUserById(id),
        { immediate: !!id }
    );
}

export function useCreateUser() {
    return useApi<User>(
        () => Promise.resolve({ success: false, error: { type: 'REQUEST_ERROR', message: 'No data provided', status: 0 } }),
        {
            onSuccess: (data) => {
                console.log('User created successfully:', data);
            },
            onError: (error) => {
                console.error('Failed to create user:', error);
            },
        }
    );
}

export function useUpdateUser() {
    return useApi<User>(
        () => Promise.resolve({ success: false, error: { type: 'REQUEST_ERROR', message: 'No data provided', status: 0 } }),
        {
            onSuccess: (data) => {
                console.log('User updated successfully:', data);
            },
            onError: (error) => {
                console.error('Failed to update user:', error);
            },
        }
    );
}

export function useDeleteUser() {
    return useApi<void>(
        () => Promise.resolve({ success: false, error: { type: 'REQUEST_ERROR', message: 'No data provided', status: 0 } }),
        {
            onSuccess: () => {
                console.log('User deleted successfully');
            },
            onError: (error) => {
                console.error('Failed to delete user:', error);
            },
        }
    );
}