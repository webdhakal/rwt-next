import { User } from '@/types/user';
import Image from '@/components/common/AppImage';

interface UserCardProps {
    user: User;
}

export function UserCard({ user }: UserCardProps) {
    const getRoleColor = (role: User['role']) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'moderator':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-green-100 text-green-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    {user.avatar ? (
                        <Image
                            className="h-12 w-12 rounded-full object-cover"
                            src={user.avatar}
                            alt={user.name}
                        />
                    ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 font-medium text-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate">
                        {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                        {user.email}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                </span>

                <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${user.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    <span className="ml-2 text-xs text-gray-500">
                        {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>

            <div className="mt-4 text-xs text-gray-400">
                Created: {new Date(user.createdAt).toLocaleDateString()}
            </div>
        </div>
    );
}