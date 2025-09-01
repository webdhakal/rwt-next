import '@/styles/globals.css';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export const metadata = {
    title: 'Next.js Axios App',
    description: 'A Next.js application with Axios and error handling',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ErrorBoundary>
                    <div className="min-h-screen bg-gray-50">
                        <nav className="bg-white shadow-sm border-b">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between h-16">
                                    <div className="flex items-center">
                                        <h1 className="text-xl font-semibold text-gray-900">
                                            My App
                                        </h1>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <a href="/" className="text-gray-600 hover:text-gray-900">
                                            Home
                                        </a>
                                        <a href="/users" className="text-gray-600 hover:text-gray-900">
                                            Users
                                        </a>
                                        <a href="/products" className="text-gray-600 hover:text-gray-900">
                                            Products
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <main>{children}</main>
                    </div>
                </ErrorBoundary>
            </body>
        </html>
    );
}