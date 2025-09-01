export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'user' | 'moderator';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'user' | 'moderator';
}

export interface UpdateUserData {
    name?: string;
    email?: string;
    avatar?: string;
    role?: 'admin' | 'user' | 'moderator';
    isActive?: boolean;
}