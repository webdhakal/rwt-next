'use client';

import { useUsers } from '@/hooks/useUsers';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { UserCard } from './UserCard';

export function UserList() {
    const { data, loading, error, refetch } = useUsers({ page: 1, limit: 10 });

    if (loading) {
        return (
            <div className="py-8">
                <LoadingSpinner size="lg" text="Loading users..." />
            </div>
        );
    }

    if (error) {
        return (
            <ErrorDisplay
                error={error}
                onRetry={refetch}
                className="my-4"
            />
        );
    }

    if (!data || !data.data.length) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No users found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Users</h2>
                <p className="text-sm text-gray-500">
                    {data.pagination.total} total users
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.data.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>

            {/* Pagination info */}
            <div className="text-center text-sm text-gray-500">
                Page {data.pagination.page} of {data.pagination.totalPages}
            </div>
        </div>
    );
}