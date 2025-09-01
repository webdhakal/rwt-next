import { UserList } from '@/components/features/users/UserList';

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserList />
      </div>
    </div>
  );
}